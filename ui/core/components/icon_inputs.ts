import { ActionId } from '/wotlk/core/proto_utils/action_id.js';
import { BattleElixir } from '/wotlk/core/proto/common.js';
import { Explosive } from '/wotlk/core/proto/common.js';
import { Flask } from '/wotlk/core/proto/common.js';
import { Food } from '/wotlk/core/proto/common.js';
import { GuardianElixir } from '/wotlk/core/proto/common.js';
import { RaidBuffs } from '/wotlk/core/proto/common.js';
import { PartyBuffs } from '/wotlk/core/proto/common.js';
import { IndividualBuffs } from '/wotlk/core/proto/common.js';
import { Conjured } from '/wotlk/core/proto/common.js';
import { Consumes } from '/wotlk/core/proto/common.js';
import { Debuffs } from '/wotlk/core/proto/common.js';

import { PetFood } from '/wotlk/core/proto/common.js';
import { Potions } from '/wotlk/core/proto/common.js';
import { Spec } from '/wotlk/core/proto/common.js';
import { TristateEffect } from '/wotlk/core/proto/common.js';
import { WeaponImbue } from '/wotlk/core/proto/common.js';
import { IndividualSimIconPickerConfig } from '/wotlk/core/individual_sim_ui.js';
import { Party } from '/wotlk/core/party.js';
import { Player } from '/wotlk/core/player.js';
import { Raid } from '/wotlk/core/raid.js';
import { Sim } from '/wotlk/core/sim.js';
import { Target } from '/wotlk/core/target.js';
import { Encounter } from '/wotlk/core/encounter.js';
import { EventID, TypedEvent } from '/wotlk/core/typed_event.js';

import { ExclusivityTag } from '/wotlk/core/individual_sim_ui.js';
import { IconPickerConfig } from './icon_picker.js';
import { IconEnumPicker, IconEnumPickerConfig, IconEnumValueConfig } from './icon_enum_picker.js';
import { MultiIconPickerConfig } from './multi_icon_picker.js';

// Raid Buffs

export const AllStatsBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(48470), ActionId.fromSpellId(17051), 'giftOfTheWild'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(49634), 'drumsOfTheWild'),
], 'Stats');

export const AllStatsPercentBuff = makeMultiIconInput([
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(25898), 'blessingOfKings'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(49633), 'drumsOfForgottenKings'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(25899), 'blessingOfSanctuary'),
], 'Stats %');

export const ArmorBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(48942), ActionId.fromSpellId(20140), 'devotionAura'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(43468), 'scrollOfProtection'),
	// stoneskin?
], 'Armor');

export const StaminaBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(48161), ActionId.fromSpellId(14767), 'powerWordFortitude'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(37094), 'scrollOfStamina'),
], 'Stam');

export const StrengthAndAgilityBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(58643), ActionId.fromSpellId(52456), 'strengthOfEarthTotem'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(57623), 'hornOfWinter'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(43464), 'scrollOfAgility'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(43466), 'scrollOfStrength'),
], 'Str/Agi');

export const IntellectBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(43002), 'arcaneBrilliance'),
	makeTristateRaidBuffInput(ActionId.fromSpellId(57567), ActionId.fromSpellId(54038), 'felIntelligence'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(37092), 'scrollOfIntellect'),
], 'Int');

export const SpiritBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(48073), 'divineSpirit'),
	makeTristateRaidBuffInput(ActionId.fromSpellId(57567), ActionId.fromSpellId(54038), 'felIntelligence'),
	makeBooleanRaidBuffInput(ActionId.fromItemId(37098), 'scrollOfSpirit'),
], 'Spi');

export const AttackPowerBuff = makeMultiIconInput([
	makeTristateIndividualBuffInput(ActionId.fromSpellId(48934), ActionId.fromSpellId(20045), 'blessingOfMight'),
	makeTristateRaidBuffInput(ActionId.fromSpellId(47436), ActionId.fromSpellId(12861), 'battleShout'),
], 'AP');

export const AttackPowerPercentBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(53138), 'abominationsMight'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(30809), 'unleashedRage'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(19506), 'trueshotAura'),
], 'AP %');

export const DamagePercentBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(31869), 'sanctifiedRetribution'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(31583), 'arcaneEmpowerment'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(34460), 'ferociousInspiration'),
], 'Dmg %');

export const DamageReductionPercentBuff = makeMultiIconInput([
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(57472), 'renewedHope'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(25899), 'blessingOfSanctuary'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(50720), 'vigilance'),
], 'Mit %');

export const HastePercentBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(53648), 'swiftRetribution'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(48396), 'moonkinAura', TristateEffect.TristateEffectImproved),
], 'Haste %');

export const HealthBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(47440), ActionId.fromSpellId(12861), 'commandingShout'),
	makeTristateRaidBuffInput(ActionId.fromSpellId(47982), ActionId.fromSpellId(18696), 'bloodPact'),
], 'Health');

export const MP5Buff = makeMultiIconInput([
	makeTristateIndividualBuffInput(ActionId.fromSpellId(48938), ActionId.fromSpellId(20245), 'blessingOfWisdom'),
	makeTristateRaidBuffInput(ActionId.fromSpellId(58774), ActionId.fromSpellId(16206), 'manaSpringTotem'),
], 'MP5');

export const MeleeCritBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(17007), ActionId.fromSpellId(34300), 'leaderOfThePack'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(29801), 'rampage'),
], 'Melee Crit');

export const MeleeHasteBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(55610), 'icyTalons'),
	makeTristateRaidBuffInput(ActionId.fromSpellId(65990), ActionId.fromSpellId(29193), 'windfuryTotem'),
], 'Melee Haste');

export const ReplenishmentBuff = makeMultiIconInput([
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(48160), 'vampiricTouch'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(31878), 'judgementsOfTheWise'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(53292), 'huntingParty'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(54118), 'improvedSoulLeech'),
	makeBooleanIndividualBuffInput(ActionId.fromSpellId(44561), 'enduringWinter'),
], 'Repl');

export const SpellCritBuff = makeMultiIconInput([
	makeTristateRaidBuffInput(ActionId.fromSpellId(24907), ActionId.fromSpellId(48396), 'moonkinAura'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(51470), 'elementalOath'),
], 'Spell Crit');

export const SpellHasteBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(3738), 'wrathOfAirTotem'),
], 'Spell Haste');

export const SpellPowerBuff = makeMultiIconInput([
	makeBooleanRaidBuffInput(ActionId.fromSpellId(57722), 'totemOfWrath'),
	makeBooleanRaidBuffInput(ActionId.fromSpellId(58656), 'flametongueTotem'),
	// Not a boolean
	//makeBooleanRaidBuffInput(ActionId.fromSpellId(47240), 'demonicPact'),
], 'SP');

export const Bloodlust = withLabel(makeBooleanRaidBuffInput(ActionId.fromSpellId(2825), 'bloodlust'), 'Lust');

// Misc Buffs
export const RetributionAura = makeBooleanRaidBuffInput(ActionId.fromSpellId(54043), 'retributionAura');
export const ShadowProtection = makeBooleanRaidBuffInput(ActionId.fromSpellId(48170), 'shadowProtection');
export const BraidedEterniumChain = makeBooleanPartyBuffInput(ActionId.fromSpellId(31025), 'braidedEterniumChain');
export const ChainOfTheTwilightOwl = makeBooleanPartyBuffInput(ActionId.fromSpellId(31035), 'chainOfTheTwilightOwl');
export const HeroicPresence = makeBooleanPartyBuffInput(ActionId.fromSpellId(6562), 'heroicPresence');
export const EyeOfTheNight = makeBooleanPartyBuffInput(ActionId.fromSpellId(31033), 'eyeOfTheNight');
export const Thorns = makeTristateRaidBuffInput(ActionId.fromSpellId(53307), ActionId.fromSpellId(16840), 'thorns');
export const ManaTideTotem = makeMultistatePartyBuffInput(ActionId.fromSpellId(16190), 5, 'manaTideTotems');
export const Innervate = makeMultistateIndividualBuffInput(ActionId.fromSpellId(29166), 11, 'innervates');
export const PowerInfusion = makeMultistateIndividualBuffInput(ActionId.fromSpellId(10060), 11, 'powerInfusions');

// Debuffs

export const MajorArmorDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(7386), 'sunderArmor'),
	makeBooleanDebuffInput(ActionId.fromSpellId(8647), 'exposeArmor'),
	makeBooleanDebuffInput(ActionId.fromSpellId(55754), 'acidSpit'),
], 'Major Ar');

export const MinorArmorDebuff = makeMultiIconInput([
	makeTristateDebuffInput(ActionId.fromSpellId(770), ActionId.fromSpellId(33602), 'faerieFire'),
	makeTristateDebuffInput(ActionId.fromSpellId(50511), ActionId.fromSpellId(18180), 'curseOfWeakness'),
	makeBooleanDebuffInput(ActionId.fromSpellId(56631), 'sting'),
], 'Minor Ar');

export const AttackPowerDebuff = makeMultiIconInput([
	makeTristateDebuffInput(ActionId.fromSpellId(47437), ActionId.fromSpellId(12879), 'demoralizingShout'),
	makeTristateDebuffInput(ActionId.fromSpellId(48560), ActionId.fromSpellId(16862), 'demoralizingRoar'),
	makeTristateDebuffInput(ActionId.fromSpellId(50511), ActionId.fromSpellId(18180), 'curseOfWeakness'),
], 'AP');

export const BleedDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(33876), 'mangle'),
	makeBooleanDebuffInput(ActionId.fromSpellId(46855), 'trauma'),
	makeBooleanDebuffInput(ActionId.fromSpellId(57393), 'stampede'),
], 'Bleed');

export const CritDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(30706), 'totemOfWrath'),
	makeBooleanDebuffInput(ActionId.fromSpellId(20337), 'heartOfTheCrusader'),
	makeBooleanDebuffInput(ActionId.fromSpellId(58410), 'masterPoisoner'),
], 'Crit');

export const MeleeAttackSpeedDebuff = makeMultiIconInput([
	makeTristateDebuffInput(ActionId.fromSpellId(47502), ActionId.fromSpellId(12666), 'thunderClap'),
	makeTristateDebuffInput(ActionId.fromSpellId(55095), ActionId.fromSpellId(51456), 'icyTouch'),
	makeBooleanDebuffInput(ActionId.fromSpellId(53696), 'judgementsOfTheJust'),
	makeBooleanDebuffInput(ActionId.fromSpellId(48485), 'infectedWounds'),
], 'Atk Spd');

export const MeleeHitDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(48460), 'insectSwarm'),
	makeBooleanDebuffInput(ActionId.fromSpellId(3043), 'scorpidSting'),
], 'Miss');

export const PhysicalDamageDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(29859), 'bloodFrenzy'),
	makeBooleanDebuffInput(ActionId.fromSpellId(58413), 'savageCombat'),
], 'Phys Vuln');

export const SpellCritDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(17800), 'shadowMastery'),
	makeBooleanDebuffInput(ActionId.fromSpellId(12873), 'improvedScorch'),
	makeBooleanDebuffInput(ActionId.fromSpellId(28593), 'wintersChill'),
], 'Spell Crit');

export const SpellHitDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(33198), 'misery'),
	makeBooleanDebuffInput(ActionId.fromSpellId(33602), 'faerieFire', TristateEffect.TristateEffectImproved),
], 'Spell Hit');

export const SpellDamageDebuff = makeMultiIconInput([
	makeBooleanDebuffInput(ActionId.fromSpellId(51161), 'ebonPlaguebringer'),
	makeBooleanDebuffInput(ActionId.fromSpellId(48511), 'earthAndMoon'),
	makeBooleanDebuffInput(ActionId.fromSpellId(47865), 'curseOfElements'),
], 'Spell Dmg');

export const JudgementOfWisdom = makeBooleanDebuffInput(ActionId.fromSpellId(53408), 'judgementOfWisdom');
export const JudgementOfLight = makeBooleanDebuffInput(ActionId.fromSpellId(20271), 'judgementOfLight');
export const GiftOfArthas = makeBooleanDebuffInput(ActionId.fromSpellId(11374), 'giftOfArthas');

// Consumes
export const SuperSapper = makeBooleanConsumeInput(ActionId.fromItemId(23827), 'superSapper');
export const GoblinSapper = makeBooleanConsumeInput(ActionId.fromItemId(10646), 'goblinSapper');

export const SpicedMammothTreats = makeBooleanConsumeInput(ActionId.fromItemId(43005), 'petFood', PetFood.PetFoodSpicedMammothTreats);
export const PetScrollOfAgilityV = makeBooleanConsumeInput(ActionId.fromItemId(27498), 'petScrollOfAgility', 5);
export const PetScrollOfStrengthV = makeBooleanConsumeInput(ActionId.fromItemId(27503), 'petScrollOfStrength', 5);

function withLabel<ModObject, T>(config: IconPickerConfig<ModObject, T>, label: string): IconPickerConfig<ModObject, T> {
	config.label = label;
	return config;
}

export function makeMultiIconInput<ModObject>(inputs: Array<IconPickerConfig<ModObject, any>>, label: string): MultiIconPickerConfig<ModObject> {
	return {
		inputs: inputs,
		numColumns: 1,
		emptyColor: 'grey',
		label: label,
	};
}
function makeBooleanRaidBuffInput(id: ActionId, fieldName: keyof RaidBuffs, value?: number): IconPickerConfig<Player<any>, boolean> {
	return makeBooleanInput<RaidBuffs, Raid>({
		getModObject: (player: Player<any>) => player.getRaid()!,
		getValue: (raid: Raid) => raid.getBuffs(),
		setValue: (eventID: EventID, raid: Raid, newVal: RaidBuffs) => raid.setBuffs(eventID, newVal),
		changeEmitter: (raid: Raid) => raid.buffsChangeEmitter,
	}, id, fieldName, value);
}
function makeBooleanPartyBuffInput(id: ActionId, fieldName: keyof PartyBuffs, value?: number): IconPickerConfig<Player<any>, boolean> {
	return makeBooleanInput<PartyBuffs, Party>({
		getModObject: (player: Player<any>) => player.getParty()!,
		getValue: (party: Party) => party.getBuffs(),
		setValue: (eventID: EventID, party: Party, newVal: PartyBuffs) => party.setBuffs(eventID, newVal),
		changeEmitter: (party: Party) => party.buffsChangeEmitter,
	}, id, fieldName, value);
}
function makeBooleanIndividualBuffInput(id: ActionId, fieldName: keyof IndividualBuffs, value?: number): IconPickerConfig<Player<any>, boolean> {
	return makeBooleanInput<IndividualBuffs, Player<any>>({
		getModObject: (player: Player<any>) => player,
		getValue: (player: Player<any>) => player.getBuffs(),
		setValue: (eventID: EventID, player: Player<any>, newVal: IndividualBuffs) => player.setBuffs(eventID, newVal),
		changeEmitter: (player: Player<any>) => player.buffsChangeEmitter,
	}, id, fieldName, value);
}
function makeBooleanConsumeInput(id: ActionId, fieldName: keyof Consumes, value?: number): IconPickerConfig<Player<any>, boolean> {
	return makeBooleanInput<Consumes, Player<any>>({
		getModObject: (player: Player<any>) => player,
		getValue: (player: Player<any>) => player.getConsumes(),
		setValue: (eventID: EventID, player: Player<any>, newVal: Consumes) => player.setConsumes(eventID, newVal),
		changeEmitter: (player: Player<any>) => player.consumesChangeEmitter,
	}, id, fieldName, value);
}
function makeBooleanDebuffInput(id: ActionId, fieldName: keyof Debuffs, value?: number): IconPickerConfig<Player<any>, boolean> {
	return makeBooleanInput<Debuffs, Raid>({
		getModObject: (player: Player<any>) => player.getRaid()!,
		getValue: (raid: Raid) => raid.getDebuffs(),
		setValue: (eventID: EventID, raid: Raid, newVal: Debuffs) => raid.setDebuffs(eventID, newVal),
		changeEmitter: (raid: Raid) => raid.debuffsChangeEmitter,
	}, id, fieldName, value);
}

function makeBooleanInput<Message, ModObject>(config: WrappedTypedIconPickerConfig<Message, ModObject>, id: ActionId, fieldName: keyof Message, value?: number): IconPickerConfig<Player<any>, boolean> {
	return makeWrappedIconInput<ModObject, boolean>({
		getModObject: config.getModObject,
		id: id,
		states: 2,
		changedEvent: config.changeEmitter,
		getValue: (modObj: ModObject) => value ? (config.getValue(modObj)[fieldName] as unknown as number) == value : (config.getValue(modObj)[fieldName] as unknown as boolean),
		setValue: (eventID: EventID, modObj: ModObject, newValue: boolean) => {
			const newMessage = config.getValue(modObj);
			if (value) {
				if (newValue) {
					(newMessage[fieldName] as unknown as number) = value;
				} else if ((newMessage[fieldName] as unknown as number) == value) {
					(newMessage[fieldName] as unknown as number) = 0;
				}
			} else {
				(newMessage[fieldName] as unknown as boolean) = newValue;
			}
			config.setValue(eventID, modObj, newMessage);
		},
	});
}

function makeTristateRaidBuffInput(id: ActionId, impId: ActionId, fieldName: keyof RaidBuffs): IconPickerConfig<Player<any>, number> {
	return makeTristateInput<RaidBuffs, Raid>({
		getModObject: (player: Player<any>) => player.getRaid()!,
		getValue: (raid: Raid) => raid.getBuffs(),
		setValue: (eventID: EventID, raid: Raid, newVal: RaidBuffs) => raid.setBuffs(eventID, newVal),
		changeEmitter: (raid: Raid) => raid.buffsChangeEmitter,
	}, id, impId, fieldName);
}
function makeTristateIndividualBuffInput(id: ActionId, impId: ActionId, fieldName: keyof IndividualBuffs): IconPickerConfig<Player<any>, number> {
	return makeTristateInput<IndividualBuffs, Player<any>>({
		getModObject: (player: Player<any>) => player,
		getValue: (player: Player<any>) => player.getBuffs(),
		setValue: (eventID: EventID, player: Player<any>, newVal: IndividualBuffs) => player.setBuffs(eventID, newVal),
		changeEmitter: (player: Player<any>) => player.buffsChangeEmitter,
	}, id, impId, fieldName);
}
function makeTristateDebuffInput(id: ActionId, impId: ActionId, fieldName: keyof Debuffs): IconPickerConfig<Player<any>, number> {
	return makeTristateInput<Debuffs, Raid>({
		getModObject: (player: Player<any>) => player.getRaid()!,
		getValue: (raid: Raid) => raid.getDebuffs(),
		setValue: (eventID: EventID, raid: Raid, newVal: Debuffs) => raid.setDebuffs(eventID, newVal),
		changeEmitter: (raid: Raid) => raid.debuffsChangeEmitter,
	}, id, impId, fieldName);
}
function makeMultistatePartyBuffInput(id: ActionId, numStates: number, fieldName: keyof PartyBuffs): IconPickerConfig<Player<any>, number> {
	return makeMultistateInput<PartyBuffs, Party>({
		getModObject: (player: Player<any>) => player.getParty()!,
		getValue: (party: Party) => party.getBuffs(),
		setValue: (eventID: EventID, party: Party, newVal: PartyBuffs) => party.setBuffs(eventID, newVal),
		changeEmitter: (party: Party) => party.buffsChangeEmitter,
	}, id, numStates, fieldName);
}
function makeMultistateIndividualBuffInput(id: ActionId, numStates: number, fieldName: keyof IndividualBuffs): IconPickerConfig<Player<any>, number> {
	return makeMultistateInput<IndividualBuffs, Player<any>>({
		getModObject: (player: Player<any>) => player,
		getValue: (player: Player<any>) => player.getBuffs(),
		setValue: (eventID: EventID, player: Player<any>, newVal: IndividualBuffs) => player.setBuffs(eventID, newVal),
		changeEmitter: (player: Player<any>) => player.buffsChangeEmitter,
	}, id, numStates, fieldName);
}
function makeTristateInput<Message, ModObject>(config: WrappedTypedIconPickerConfig<Message, ModObject>, id: ActionId, impId: ActionId, fieldName: keyof Message): IconPickerConfig<Player<any>, number> {
	const input = makeNumberInput(config, id, fieldName);
	input.states = 3;
	input.improvedId = impId;
	return input;
}
function makeMultistateInput<Message, ModObject>(config: WrappedTypedIconPickerConfig<Message, ModObject>, id: ActionId, numStates: number, fieldName: keyof Message): IconPickerConfig<Player<any>, number> {
	const input = makeNumberInput(config, id, fieldName);
	input.states = numStates;
	return input;
}
function makeNumberInput<Message, ModObject>(config: WrappedTypedIconPickerConfig<Message, ModObject>, id: ActionId, fieldName: keyof Message): IconPickerConfig<Player<any>, number> {
	return makeWrappedIconInput<ModObject, number>({
		getModObject: config.getModObject,
		id: id,
		states: 0, // Must be assigned externally.
		changedEvent: config.changeEmitter,
		getValue: (modObj: ModObject) => config.getValue(modObj)[fieldName] as unknown as number,
		setValue: (eventID: EventID, modObj: ModObject, newValue: number) => {
			const newMessage = config.getValue(modObj);
			(newMessage[fieldName] as unknown as number) = newValue;
			config.setValue(eventID, modObj, newMessage);
		},
	});
}

interface WrappedTypedIconPickerConfig<Message, ModObject> {
	getModObject: (player: Player<any>) => ModObject,
	getValue: (modObj: ModObject) => Message,
	setValue: (eventID: EventID, modObj: ModObject, messageVal: Message) => void,
	changeEmitter: (modObj: ModObject) => TypedEvent<any>,
}

interface WrappedIconPickerConfig<ModObject, T> extends IconPickerConfig<ModObject, T> {
	getModObject: (player: Player<any>) => ModObject,
}
function makeWrappedIconInput<ModObject, T>(config: WrappedIconPickerConfig<ModObject, T>): IconPickerConfig<Player<any>, T> {
	const getModObject = config.getModObject;
	return {
		id: config.id,
		states: config.states,
		changedEvent: (player: Player<any>) => config.changedEvent(getModObject(player)),
		getValue: (player: Player<any>) => config.getValue(getModObject(player)),
		setValue: (eventID: EventID, player: Player<any>, newValue: T) => config.setValue(eventID, getModObject(player), newValue),
	}
}


//////////////////////////////////////////////////////////////////////
// Custom buffs that don't fit into any of the helper functions above.
//////////////////////////////////////////////////////////////////////

export const makePotionsInput = makeConsumeInputFactory('defaultPotion', [
	{ actionId: ActionId.fromItemId(33447), value: Potions.RunicHealingPotion },
	{ actionId: ActionId.fromItemId(33448), value: Potions.RunicManaPotion },
	{ actionId: ActionId.fromItemId(40093), value: Potions.IndestructiblePotion },
	{ actionId: ActionId.fromItemId(40211), value: Potions.PotionOfSpeed },
	{ actionId: ActionId.fromItemId(40212), value: Potions.PotionOfWildMagic },

	{ actionId: ActionId.fromItemId(22839), value: Potions.DestructionPotion },
	{ actionId: ActionId.fromItemId(22838), value: Potions.HastePotion },
	{ actionId: ActionId.fromItemId(13442), value: Potions.MightyRagePotion },
	{ actionId: ActionId.fromItemId(22832), value: Potions.SuperManaPotion },
	{ actionId: ActionId.fromItemId(31677), value: Potions.FelManaPotion },
	{ actionId: ActionId.fromItemId(22828), value: Potions.InsaneStrengthPotion },
	{ actionId: ActionId.fromItemId(22849), value: Potions.IronshieldPotion },
	{ actionId: ActionId.fromItemId(22837), value: Potions.HeroicPotion },
] as Array<IconEnumValueConfig<Player<any>, Potions>>);

export const makeConjuredInput = makeConsumeInputFactory('defaultConjured', [
	{ actionId: ActionId.fromItemId(12662), value: Conjured.ConjuredDarkRune },
	{ actionId: ActionId.fromItemId(22788), value: Conjured.ConjuredFlameCap },
	{ actionId: ActionId.fromItemId(22105), value: Conjured.ConjuredHealthstone },
	{ actionId: ActionId.fromItemId(22044), value: Conjured.ConjuredMageManaEmerald },
	{ actionId: ActionId.fromItemId(7676), value: Conjured.ConjuredRogueThistleTea },
] as Array<IconEnumValueConfig<Player<any>, Conjured>>);

export const makeFlasksInput = makeConsumeInputFactory('flask', [
	{ actionId: ActionId.fromItemId(46376), value: Flask.FlaskOfTheFrostWyrm },
	{ actionId: ActionId.fromItemId(46377), value: Flask.FlaskOfEndlessRage },
	{ actionId: ActionId.fromItemId(46378), value: Flask.FlaskOfPureMojo },
	{ actionId: ActionId.fromItemId(46379), value: Flask.FlaskOfStoneblood },
	{ actionId: ActionId.fromItemId(40079), value: Flask.LesserFlaskOfToughness },
	{ actionId: ActionId.fromItemId(44939), value: Flask.LesserFlaskOfResistance },
	{ actionId: ActionId.fromItemId(22861), value: Flask.FlaskOfBlindingLight },
	{ actionId: ActionId.fromItemId(22853), value: Flask.FlaskOfMightyRestoration },
	{ actionId: ActionId.fromItemId(22866), value: Flask.FlaskOfPureDeath },
	{ actionId: ActionId.fromItemId(22854), value: Flask.FlaskOfRelentlessAssault },
	{ actionId: ActionId.fromItemId(13512), value: Flask.FlaskOfSupremePower },
	{ actionId: ActionId.fromItemId(22851), value: Flask.FlaskOfFortification },
	{ actionId: ActionId.fromItemId(33208), value: Flask.FlaskOfChromaticWonder },
] as Array<IconEnumValueConfig<Player<any>, Flask>>, (eventID: EventID, player: Player<any>, newValue: Flask) => {
	if (newValue) {
		const newConsumes = player.getConsumes();
		newConsumes.battleElixir = BattleElixir.BattleElixirUnknown;
		newConsumes.guardianElixir = GuardianElixir.GuardianElixirUnknown;
		player.setConsumes(eventID, newConsumes);
	}
});

export const makeBattleElixirsInput = makeConsumeInputFactory('battleElixir', [
	{ actionId: ActionId.fromItemId(44325), value: BattleElixir.ElixirOfAccuracy },
	{ actionId: ActionId.fromItemId(44330), value: BattleElixir.ElixirOfArmorPiercing },
	{ actionId: ActionId.fromItemId(44327), value: BattleElixir.ElixirOfDeadlyStrikes },
	{ actionId: ActionId.fromItemId(44329), value: BattleElixir.ElixirOfExpertise },
	{ actionId: ActionId.fromItemId(44331), value: BattleElixir.ElixirOfLightningSpeed },
	{ actionId: ActionId.fromItemId(39666), value: BattleElixir.ElixirOfMightyAgility },
	{ actionId: ActionId.fromItemId(40073), value: BattleElixir.ElixirOfMightyStrength },
	{ actionId: ActionId.fromItemId(40076), value: BattleElixir.GurusElixir },
	{ actionId: ActionId.fromItemId(40070), value: BattleElixir.SpellpowerElixir },
	{ actionId: ActionId.fromItemId(40068), value: BattleElixir.WrathElixir },
	{ actionId: ActionId.fromItemId(28103), value: BattleElixir.AdeptsElixir },
	{ actionId: ActionId.fromItemId(9224), value: BattleElixir.ElixirOfDemonslaying },
	{ actionId: ActionId.fromItemId(22831), value: BattleElixir.ElixirOfMajorAgility },
	{ actionId: ActionId.fromItemId(22833), value: BattleElixir.ElixirOfMajorFirePower },
	{ actionId: ActionId.fromItemId(22827), value: BattleElixir.ElixirOfMajorFrostPower },
	{ actionId: ActionId.fromItemId(22835), value: BattleElixir.ElixirOfMajorShadowPower },
	{ actionId: ActionId.fromItemId(22824), value: BattleElixir.ElixirOfMajorStrength },
	{ actionId: ActionId.fromItemId(28104), value: BattleElixir.ElixirOfMastery },
	{ actionId: ActionId.fromItemId(13452), value: BattleElixir.ElixirOfTheMongoose },
	{ actionId: ActionId.fromItemId(31679), value: BattleElixir.FelStrengthElixir },
	{ actionId: ActionId.fromItemId(27155), value: BattleElixir.GreaterArcaneElixir },
] as Array<IconEnumValueConfig<Player<any>, BattleElixir>>, (eventID: EventID, player: Player<any>, newValue: BattleElixir) => {
	if (newValue) {
		const newConsumes = player.getConsumes();
		newConsumes.flask = Flask.FlaskUnknown;
		player.setConsumes(eventID, newConsumes);
	}
});

export const makeGuardianElixirsInput = makeConsumeInputFactory('guardianElixir', [
	{ actionId: ActionId.fromItemId(44328), value: GuardianElixir.ElixirOfMightyDefense },
	{ actionId: ActionId.fromItemId(40078), value: GuardianElixir.ElixirOfMightyFortitude },
	{ actionId: ActionId.fromItemId(40109), value: GuardianElixir.ElixirOfMightyMageblood },
	{ actionId: ActionId.fromItemId(44332), value: GuardianElixir.ElixirOfMightyThoughts },
	{ actionId: ActionId.fromItemId(40097), value: GuardianElixir.ElixirOfProtection },
	{ actionId: ActionId.fromItemId(40072), value: GuardianElixir.ElixirOfSpirit },
	{ actionId: ActionId.fromItemId(9088), value: GuardianElixir.GiftOfArthas },
	{ actionId: ActionId.fromItemId(32067), value: GuardianElixir.ElixirOfDraenicWisdom },
	{ actionId: ActionId.fromItemId(32068), value: GuardianElixir.ElixirOfIronskin },
	{ actionId: ActionId.fromItemId(22834), value: GuardianElixir.ElixirOfMajorDefense },
	{ actionId: ActionId.fromItemId(32062), value: GuardianElixir.ElixirOfMajorFortitude },
	{ actionId: ActionId.fromItemId(22840), value: GuardianElixir.ElixirOfMajorMageblood },
] as Array<IconEnumValueConfig<Player<any>, GuardianElixir>>, (eventID: EventID, player: Player<any>, newValue: GuardianElixir) => {
	if (newValue) {
		const newConsumes = player.getConsumes();
		newConsumes.flask = Flask.FlaskUnknown;
		player.setConsumes(eventID, newConsumes);
	}
});

export const makeFoodInput = makeConsumeInputFactory('food', [
	{ actionId: ActionId.fromItemId(43015), value: Food.FoodFishFeast },
	{ actionId: ActionId.fromItemId(34753), value: Food.FoodGreatFeast },
	{ actionId: ActionId.fromItemId(42999), value: Food.FoodBlackenedDragonfin },
	{ actionId: ActionId.fromItemId(42995), value: Food.FoodHeartyRhino },
	{ actionId: ActionId.fromItemId(34754), value: Food.FoodMegaMammothMeal },
	{ actionId: ActionId.fromItemId(34756), value: Food.FoodSpicedWormBurger },
	{ actionId: ActionId.fromItemId(42994), value: Food.FoodRhinoliciousWormsteak },
	{ actionId: ActionId.fromItemId(34769), value: Food.FoodImperialMantaSteak },
	{ actionId: ActionId.fromItemId(42996), value: Food.FoodSnapperExtreme },
	{ actionId: ActionId.fromItemId(34758), value: Food.FoodMightyRhinoDogs },
	{ actionId: ActionId.fromItemId(34767), value: Food.FoodFirecrackerSalmon },
	{ actionId: ActionId.fromItemId(42998), value: Food.FoodCuttlesteak },
	{ actionId: ActionId.fromItemId(43000), value: Food.FoodDragonfinFilet },

	{ actionId: ActionId.fromItemId(27657), value: Food.FoodBlackenedBasilisk },
	{ actionId: ActionId.fromItemId(27664), value: Food.FoodGrilledMudfish },
	{ actionId: ActionId.fromItemId(27655), value: Food.FoodRavagerDog },
	{ actionId: ActionId.fromItemId(27658), value: Food.FoodRoastedClefthoof },
	{ actionId: ActionId.fromItemId(33872), value: Food.FoodSpicyHotTalbuk },
	{ actionId: ActionId.fromItemId(33825), value: Food.FoodSkullfishSoup },
	{ actionId: ActionId.fromItemId(33052), value: Food.FoodFishermansFeast },
] as Array<IconEnumValueConfig<Player<any>, Food>>);

function onSetExplosives(eventID: EventID, player: Player<any>, newValue: Explosive | boolean) {
	if (newValue) {
		const playerConsumes = player.getConsumes();
		player.setConsumes(eventID, playerConsumes);
	}
};

export const FillerExplosiveInput = makeConsumeInput('fillerExplosive', [
	{ actionId: ActionId.fromItemId(23736), value: Explosive.ExplosiveFelIronBomb },
	{ actionId: ActionId.fromItemId(23737), value: Explosive.ExplosiveAdamantiteGrenade },
	{ actionId: ActionId.fromItemId(23841), value: Explosive.ExplosiveGnomishFlameTurret },
	{ actionId: ActionId.fromItemId(13180), value: Explosive.ExplosiveHolyWater },
] as Array<IconEnumValueConfig<Player<any>, Explosive>>, onSetExplosives);

export function makeWeaponImbueInput(isMainHand: boolean, options: Array<WeaponImbue>): IconEnumPickerConfig<Player<any>, WeaponImbue> {
	const allOptions = [
		{ actionId: ActionId.fromItemId(18262), value: WeaponImbue.WeaponImbueElementalSharpeningStone },
		{ actionId: ActionId.fromItemId(20749), value: WeaponImbue.WeaponImbueBrilliantWizardOil },
		{ actionId: ActionId.fromItemId(22522), value: WeaponImbue.WeaponImbueSuperiorWizardOil },
		{ actionId: ActionId.fromItemId(34539), value: WeaponImbue.WeaponImbueRighteousWeaponCoating },
		{
			actionId: ActionId.fromItemId(23529), value: WeaponImbue.WeaponImbueAdamantiteSharpeningStone,
			showWhen: (player: Player<any>) => !(isMainHand ? player.getGear().hasBluntMHWeapon() : player.getGear().hasBluntOHWeapon()),
		},
		{
			actionId: ActionId.fromItemId(28421), value: WeaponImbue.WeaponImbueAdamantiteWeightstone,
			showWhen: (player: Player<any>) => (isMainHand ? player.getGear().hasBluntMHWeapon() : player.getGear().hasBluntOHWeapon()),
		},
		{ actionId: ActionId.fromSpellId(27186), value: WeaponImbue.WeaponImbueRogueDeadlyPoison },
		{ actionId: ActionId.fromSpellId(26891), value: WeaponImbue.WeaponImbueRogueInstantPoison },
		{ actionId: ActionId.fromSpellId(25505), value: WeaponImbue.WeaponImbueShamanWindfury },
		{ actionId: ActionId.fromSpellId(58790), value: WeaponImbue.WeaponImbueShamanFlametongue },
		{ actionId: ActionId.fromSpellId(25500), value: WeaponImbue.WeaponImbueShamanFrostbrand },
	];
	if (isMainHand) {
		const config = makeConsumeInputFactory('mainHandImbue', allOptions)(options);
		config.changedEvent = (player: Player<any>) => TypedEvent.onAny([player.getRaid()?.changeEmitter || player.consumesChangeEmitter]);
		return config;
	} else {
		return makeConsumeInputFactory('offHandImbue', allOptions)(options);
	}
}

function makeConsumeInputFactory<T extends number>(consumesFieldName: keyof Consumes, allOptions: Array<IconEnumValueConfig<Player<any>, T>>, onSet?: (eventID: EventID, player: Player<any>, newValue: T) => void): (options: Array<T>) => IconEnumPickerConfig<Player<any>, T> {
	return (options: Array<T>) => {
		return {
			numColumns: options.length > 5 ? 2 : 1,
			values: [
				{ color: 'grey', value: 0 } as unknown as IconEnumValueConfig<Player<any>, T>,
			].concat(options.map(option => allOptions.find(allOption => allOption.value == option)!)),
			equals: (a: T, b: T) => a == b,
			zeroValue: 0 as T,
			changedEvent: (player: Player<any>) => player.consumesChangeEmitter,
			getValue: (player: Player<any>) => player.getConsumes()[consumesFieldName] as T,
			setValue: (eventID: EventID, player: Player<any>, newValue: number) => {
				const newConsumes = player.getConsumes();
				(newConsumes[consumesFieldName] as number) = newValue;
				TypedEvent.freezeAllAndDo(() => {
					player.setConsumes(eventID, newConsumes);
					if (onSet) {
						onSet(eventID, player, newValue as T);
					}
				});
			},
		};
	};
}

function makeConsumeInput<T extends number>(consumesFieldName: keyof Consumes, allOptions: Array<IconEnumValueConfig<Player<any>, T>>, onSet?: (eventID: EventID, player: Player<any>, newValue: T) => void): IconEnumPickerConfig<Player<any>, T> {
	const factory = makeConsumeInputFactory(consumesFieldName, allOptions, onSet);
	return factory(allOptions.map(option => option.value));
}
