import * as InputHelpers from '../core/components/input_helpers';
import { Player } from '../core/player';
import { PaladinAura, PaladinJudgement, PaladinSeal } from '../core/proto/paladin';
import { ActionId } from '../core/proto_utils/action_id';
import { PaladinSpecs } from '../core/proto_utils/utils';

// Configuration for spec-specific UI elements on the settings tab.
// These don't need to be in a separate file but it keeps things cleaner.

export const AuraSelection = <SpecType extends PaladinSpecs>() =>
	InputHelpers.makeClassOptionsEnumIconInput<SpecType, PaladinAura>({
		fieldName: 'aura',
		values: [
			{ value: PaladinAura.NoPaladinAura, tooltip: 'No Aura' },
			{ actionId: ActionId.fromSpellId(54043), value: PaladinAura.RetributionAura },
		],
	});

// export const StartingSealSelection = <SpecType extends PaladinSpecs>() =>
// 	InputHelpers.makeClassOptionsEnumIconInput<SpecType, PaladinSeal>({
// 		fieldName: 'seal',
// 		values: [
// 			{ actionId: ActionId.fromSpellId(42463), value: PaladinSeal.Vengeance },
// 			{ actionId: ActionId.fromSpellId(20154), value: PaladinSeal.Righteousness },
// 			{
// 				actionId: ActionId.fromSpellId(20424),
// 				value: PaladinSeal.Command,
// 				showWhen: (player: Player<SpecType>) => player.getTalents().sealOfCommand,
// 			},
// 		],
// 		changeEmitter: (player: Player<SpecType>) => player.changeEmitter,
// 	});

export const JudgementSelection = <SpecType extends PaladinSpecs>() =>
	InputHelpers.makeClassOptionsEnumIconInput<SpecType, PaladinJudgement>({
		fieldName: 'judgement',
		values: [
			{ actionId: ActionId.fromSpellId(53408), value: PaladinJudgement.JudgementOfWisdom },
			{ actionId: ActionId.fromSpellId(20271), value: PaladinJudgement.JudgementOfLight },
		],
	});

export const UseAvengingWrath = <SpecType extends PaladinSpecs>() =>
	InputHelpers.makeClassOptionsBooleanInput<SpecType>({
		fieldName: 'useAvengingWrath',
		label: 'Use Avenging Wrath',
	});
