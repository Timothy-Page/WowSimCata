package feral

import (
	"time"

	"github.com/wowsims/cata/sim/core"
)

func (cat *FeralDruid) doTranzSpecialRotation(sim *core.Simulation) (bool, time.Duration) {
	rotation := &cat.Rotation

	isClearcast := cat.ClearcastingAura.IsActive()
	curEnergy := cat.CurrentEnergy()
	//curCp := cat.ComboPoints()

	ffNow := false
	ffSoon := false
	mangleNow := false
	mangleSoon := false
	useBuilder := false

	//maintain debuffs
	ffNow = rotation.MaintainFaerieFire && cat.MustFaerieFire(sim, cat.CurrentTarget)
	mangleNow = cat.MustMangle(sim, cat.CurrentTarget)

	ffSoon = rotation.MaintainFaerieFire && cat.ShouldFaerieFire(sim, cat.CurrentTarget)
	mangleSoon = cat.ShouldMangle(sim, cat.CurrentTarget)

	if curEnergy >= 80 {
		useBuilder = true
	}

	timeToNextAction := time.Duration(0)

	if ffNow { //prio FF uptime
		cat.FaerieFire.Cast(sim, cat.CurrentTarget)
		return false, 0
	} else if mangleNow { //prio Mangle uptime
		if cat.MangleCat.CanCast(sim, cat.CurrentTarget) {
			cat.MangleCat.Cast(sim, cat.CurrentTarget)
			return false, 0
		}
		timeToNextAction = time.Duration((cat.CurrentMangleCatCost() - curEnergy) * float64(cat.EnergyTickDuration))
	} else if isClearcast {
		return cat.doBuildRotation(sim)
	} else if cat.Rip.CurDot().RemainingDuration(sim) < 3 {
		return cat.doRipRotation(sim)
	} else if cat.SavageRoarAura.RemainingDuration(sim) < 3 {
		return cat.doSaveRoarRotation(sim)
	} else if cat.Rip.CurDot().RemainingDuration(sim) > 9 && cat.SavageRoarAura.RemainingDuration(sim) > 4 {
		return cat.doFerociousBiteRotation(sim)
	} else if cat.Rake.CurDot().RemainingDuration(sim) < 3 {
		return cat.doRakeRotation(sim)
	} else if mangleSoon && useBuilder {
		if cat.MangleCat.CanCast(sim, cat.CurrentTarget) {
			cat.MangleCat.Cast(sim, cat.CurrentTarget)
			return false, 0
		}
		timeToNextAction = time.Duration((cat.CurrentMangleCatCost() - curEnergy) * float64(cat.EnergyTickDuration))
	} else if ffSoon {
		cat.FaerieFire.Cast(sim, cat.CurrentTarget)
		return false, 0
	} else if useBuilder {
		return cat.doBuildRotation(sim)
	}

	nextAction := sim.CurrentTime + timeToNextAction
	return true, nextAction
}


func waitForNextAction(sim *core.Simulation, timeToNextAction time.Duration) (time.Duration){
	timeToNextAction = max(timeToNextAction, 0)
	nextAction := sim.CurrentTime + timeToNextAction
	return nextAction
}

func (cat *FeralDruid) doBuildRotation(sim *core.Simulation) (bool, time.Duration) {
	timeToNextAction := time.Duration(0)
	curEnergy := cat.CurrentEnergy()
	isClearcast := cat.ClearcastingAura.IsActive()

	if cat.Rake.CurDot().RemainingDuration(sim) < 1 && !isClearcast{
		return cat.doRakeRotation(sim)
	} else if cat.Shred.CanCast(sim, cat.CurrentTarget) {
		cat.Shred.Cast(sim, cat.CurrentTarget)
		return false, 0
	}

	timeToNextAction = time.Duration((cat.CurrentMangleCatCost() - curEnergy) * float64(cat.EnergyTickDuration))

	nextAction := waitForNextAction(sim, timeToNextAction)
	return true, nextAction
}

func (cat *FeralDruid) doPoolRotation(sim *core.Simulation) (bool, time.Duration) {
	timeToNextAction := time.Duration(0)
	curEnergy := cat.CurrentEnergy()

	if curEnergy >= 85{
		return cat.doBuildRotation(sim)
	}

	nextAction := waitForNextAction(sim, timeToNextAction)
	return true, nextAction
}

func (cat *FeralDruid) doRipRotation(sim *core.Simulation) (bool, time.Duration) {
	curCp := cat.ComboPoints()
	timeToNextAction := time.Duration(0)
	curEnergy := cat.CurrentEnergy()

	if curCp < 5{
		return cat.doBuildRotation(sim)
	} else if cat.Rip.CurDot().RemainingDuration(sim) > 0 && cat.BerserkAura.Duration <= 0 {
		return cat.doPoolRotation(sim)
	} else {
		if cat.Rip.CanCast(sim, cat.CurrentTarget) {
			cat.TryTigersFury(sim)
			cat.TryBerserk(sim)
			cat.Rip.Cast(sim, cat.CurrentTarget)
			return false, 0
		}

		timeToNextAction = time.Duration((cat.CurrentRipCost() - curEnergy) * float64(cat.EnergyTickDuration))

		nextAction := waitForNextAction(sim, timeToNextAction)
		return true, nextAction
	}

	return true, time.Duration(0)
}

func (cat *FeralDruid) doFerociousBiteRotation(sim *core.Simulation) (bool, time.Duration) {
	curCp := cat.ComboPoints()
	timeToNextAction := time.Duration(0)
	curEnergy := cat.CurrentEnergy()

	if curCp < 5{
		return cat.doBuildRotation(sim)
	} else {
		if cat.FerociousBite.CanCast(sim, cat.CurrentTarget) {
			cat.TryTigersFury(sim)
			cat.TryBerserk(sim)
			cat.FerociousBite.Cast(sim, cat.CurrentTarget)
			return false, 0
		}

		timeToNextAction = time.Duration((cat.CurrentFerociousBiteCost() - curEnergy) * float64(cat.EnergyTickDuration))

		nextAction := waitForNextAction(sim, timeToNextAction)
		return true, nextAction
	}

	return true, time.Duration(0)
}

func (cat *FeralDruid) doSaveRoarRotation(sim *core.Simulation) (bool, time.Duration) {
	curCp := cat.ComboPoints()
	timeToNextAction := time.Duration(0)
	curEnergy := cat.CurrentEnergy()

	if curCp < 1 || (cat.SavageRoarAura.RemainingDuration(sim) > 1 && curCp < 5) {
		return cat.doBuildRotation(sim)
	} else if cat.SavageRoarAura.RemainingDuration(sim) > 1 && cat.BerserkAura.Duration <= 0{
		return cat.doPoolRotation(sim)
	} else {
		if cat.SavageRoar.CanCast(sim, cat.CurrentTarget) {
			cat.SavageRoar.Cast(sim, cat.CurrentTarget)
			return false, 0
		}

		timeToNextAction = time.Duration((cat.CurrentSavageRoarCost() - curEnergy) * float64(cat.EnergyTickDuration))

		nextAction := waitForNextAction(sim, timeToNextAction)
		return true, nextAction
	}

	return true, time.Duration(0)
}

func (cat *FeralDruid) doRakeRotation(sim *core.Simulation) (bool, time.Duration) {
	timeToNextAction := time.Duration(0)
	curEnergy := cat.CurrentEnergy()

	if cat.Rake.CurDot().RemainingDuration(sim) > 1 && cat.BerserkAura.Duration <= 0 {
		return cat.doPoolRotation(sim)
	} else {
		if cat.Rake.CanCast(sim, cat.CurrentTarget) {
			cat.TryTigersFury(sim)
			cat.TryBerserk(sim)
			cat.Rake.Cast(sim, cat.CurrentTarget)
			return false, 0
		}

		timeToNextAction = time.Duration((cat.CurrentRakeCost() - curEnergy) * float64(cat.EnergyTickDuration))

		nextAction := waitForNextAction(sim, timeToNextAction)
		return true, nextAction
	}

	return true, time.Duration(0)
}
