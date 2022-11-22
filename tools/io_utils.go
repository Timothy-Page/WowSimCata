// Helper functions for reading/writing data.
package tools

import (
	"bufio"
	"bytes"
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"reflect"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/wowsims/wotlk/sim/core"
	protojson "google.golang.org/protobuf/encoding/protojson"
	googleProto "google.golang.org/protobuf/proto"
)

var readWebThreads = flag.Int("readWebThreads", 8, "number of parallel workers to fetch web pages")

func ReadFileLines(filePath string) []string {
	return readFileLinesInternal(filePath, true)
}
func ReadFileLinesOrNil(filePath string) []string {
	return readFileLinesInternal(filePath, false)
}
func readFileLinesInternal(filePath string, throwIfMissing bool) []string {
	file, err := os.Open(filePath)
	if err != nil {
		if throwIfMissing {
			log.Fatalf("Failed to open %s: %s", filePath, err)
		} else {
			return nil
		}
	}
	defer file.Close()

	lines := []string{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines
}

func ReadMap(filePath string) map[string]string {
	return readMapInternal(filePath, true)
}
func ReadMapOrNil(filePath string) map[string]string {
	return readMapInternal(filePath, false)
}
func readMapInternal(filePath string, throwIfMissing bool) map[string]string {
	res := make(map[string]string)
	if lines := readFileLinesInternal(filePath, throwIfMissing); lines != nil {
		for _, line := range lines {
			splitIndex := strings.Index(line, ",")
			keyStr := line[:splitIndex]
			valStr := line[splitIndex+1:]
			res[keyStr] = valStr
		}
	}
	return res
}

func WriteFileLines(filePath string, lines []string) {
	file, err := os.Create(filePath)
	if err != nil {
		log.Fatalf("Failed to open %s for write: %s", filePath, err)
	}

	for _, line := range lines {
		file.WriteString(line)
	}
}

func WriteMap(filePath string, contents map[string]string) {
	lines := make([]string, len(contents))
	i := 0
	for k, v := range contents {
		lines[i] = fmt.Sprintf("%s,%s", k, v)
		i++
	}

	// Sort so the output is stable.
	sort.Strings(lines)

	WriteFileLines(filePath, lines)
}

func ReadCsvFile(filePath string) [][]string {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file "+filePath, err)
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
	}

	return records
}

func WriteProtoArrayToBuilder(arrInterface interface{}, builder *strings.Builder, name string) {
	arr := InterfaceSlice(arrInterface)
	builder.WriteString("\"")
	builder.WriteString(name)
	builder.WriteString("\":[\n")

	for i, elem := range arr {
		jsonBytes, err := protojson.MarshalOptions{}.Marshal(elem.(googleProto.Message))
		if err != nil {
			log.Printf("[ERROR] Failed to marshal: %s", err.Error())
		}

		// Format using Compact() so we get a stable output (no random diffs for version control).
		var formatted bytes.Buffer
		json.Compact(&formatted, jsonBytes)
		builder.WriteString(string(formatted.Bytes()))

		if i != len(arr)-1 {
			builder.WriteString(",")
		}
		builder.WriteString("\n")
	}
	builder.WriteString("]")
}

// Needed because Go won't let us cast from []FooProto --> []googleProto.Message
// https://stackoverflow.com/questions/12753805/type-converting-slices-of-interfaces
func InterfaceSlice(slice interface{}) []interface{} {
	s := reflect.ValueOf(slice)
	if s.Kind() != reflect.Slice {
		panic("InterfaceSlice() given a non-slice type")
	}

	// Keep the distinction between nil and empty slice input
	if s.IsNil() {
		return nil
	}

	ret := make([]interface{}, s.Len())

	for i := 0; i < s.Len(); i++ {
		ret[i] = s.Index(i).Interface()
	}

	return ret
}

// Fetches web results from all the given urls, and returns a parallel array of page contents.
func ReadWebMulti(urls []string) []string {
	threads := *readWebThreads
	if threads > len(urls) {
		threads = len(urls)
	}

	type WebResult struct {
		urlIdx int
		body   string
	}
	webResults := make(chan WebResult, 10)
	wg := &sync.WaitGroup{}

	for thread := 0; thread < threads; thread++ {
		startIdx := len(urls) * thread / threads
		endIdx := len(urls) * (thread + 1) / threads
		wg.Add(1)
		go func(min, max int) {
			fmt.Printf("ReadWebMulti Starting worker for URL block %d to %d\n", min, max-1)
			client := http.Client{}
			for i := min; i < max; i++ {
				url := urls[i]
				resp, err := client.Get(url)
				if err != nil {
					fmt.Printf("ReadWebMulti Error fetching %s: %s\n", url, err)
					continue
				}
				body, _ := io.ReadAll(resp.Body)
				bstr := string(body)
				webResults <- WebResult{urlIdx: i, body: bstr}
			}
			wg.Done()
		}(startIdx, endIdx)
	}

	go func() {
		wg.Wait()
		close(webResults)
	}()

	results := make([]string, len(urls))

	totalComplete := 0
	var lastUpdate time.Time
	for res := range webResults {
		totalComplete++

		if time.Since(lastUpdate).Seconds() > 2 {
			lastUpdate = time.Now()
			fmt.Printf("ReadWebMulti %d/%d complete\n", totalComplete, len(urls))
		}

		results[res.urlIdx] = res.body
	}
	fmt.Printf("ReadWebMulti %d/%d complete\n", totalComplete, len(urls))

	return results
}

// Like ReadWebMulti, but uses a lambda function for converting keys --> urls
// and returns a map of keys to web contents.
func ReadWebMultiMap[K comparable](keys []K, keyToUrl func(K) string) map[K]string {
	urls := core.MapSlice(keys, keyToUrl)
	results := ReadWebMulti(urls)

	mapResults := make(map[K]string)
	for i := 0; i < len(urls); i++ {
		mapResults[keys[i]] = results[i]
	}
	return mapResults
}