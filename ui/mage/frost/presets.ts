import * as PresetUtils from '../../core/preset_utils';
import { Conjured, Consumes, Faction, Flask, Food, Glyphs, Potions, Profession, Spec } from '../../core/proto/common';
import {
	FrostMage_Options as MageOptions,
	MageMajorGlyph,
	MageMinorGlyph,
} from '../../core/proto/mage';
import { SavedTalents } from '../../core/proto/ui';
import FrostApl from './apls/frost.apl.json';
import FrostAoeApl from './apls/frost_aoe.apl.json';
import P1FrostGear from './gear_sets/p1_frost.gear.json';
import P2FrostGear from './gear_sets/p2_frost.gear.json';
import P3FrostAllianceGear from './gear_sets/p3_frost_alliance.gear.json';
import P3FrostHordeGear from './gear_sets/p3_frost_horde.gear.json';
// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

export const FROST_P1_PRESET = PresetUtils.makePresetGear('Frost P1 Preset', P1FrostGear, { talentTree: 2 });
export const FROST_P2_PRESET = PresetUtils.makePresetGear('Frost P2 Preset', P2FrostGear, { talentTree: 2 });
export const FROST_P3_PRESET_ALLIANCE = PresetUtils.makePresetGear('Frost P3 Preset [A]', P3FrostAllianceGear, { talentTree: 2, faction: Faction.Alliance });
export const FROST_P3_PRESET_HORDE = PresetUtils.makePresetGear('Frost P3 Preset [H]', P3FrostHordeGear, { talentTree: 2, faction: Faction.Horde });

export const FROST_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Frost', FrostApl, { talentTree: 2 });
export const FROST_ROTATION_PRESET_AOE = PresetUtils.makePresetAPLRotation('Frost AOE', FrostAoeApl, { talentTree: 2 });

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wowhead.com/wotlk/talent-calc and copy the numbers in the url.

export const FrostTalents = {
	name: 'Frost',
	data: SavedTalents.create({
		// talentsString: '23000503110003--0533030310233100030152231351',
		// glyphs: Glyphs.create({
		// 	major1: MageMajorGlyph.GlyphOfFrostbolt,
		// 	major2: MageMajorGlyph.GlyphOfEternalWater,
		// 	major3: MageMajorGlyph.GlyphOfMoltenArmor,
		// 	minor1: MageMinorGlyph.GlyphOfSlowFall,
		// 	minor2: MageMinorGlyph.GlyphOfFrostWard,
		// 	minor3: MageMinorGlyph.GlyphOfBlastWave,
		// }),
	}),
};

export const DefaultFrostOptions = MageOptions.create({
	classOptions: {
	},
	waterElementalDisobeyChance: 0.1,
});

export const DefaultFrostConsumes = Consumes.create({
	defaultPotion: Potions.PotionOfSpeed,
	defaultConjured: Conjured.ConjuredFlameCap,
	flask: Flask.FlaskOfTheFrostWyrm,
	food: Food.FoodFishFeast,
});

export const OtherDefaults = {
	distanceFromTarget: 20,
	profession1: Profession.Engineering,
	profession2: Profession.Tailoring,
};
