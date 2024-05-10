package warlock

import (
	"time"

	"github.com/wowsims/cata/sim/core"
)

func (warlock *Warlock) registerShadowBoltSpell() {
	shadowAndFlameProcChance := []float64{0.0, 0.33, 0.66, 1.0}[warlock.Talents.ShadowAndFlame]

	warlock.ShadowBolt = warlock.RegisterSpell(core.SpellConfig{
		ActionID:       core.ActionID{SpellID: 686},
		SpellSchool:    core.SpellSchoolShadow,
		ProcMask:       core.ProcMaskSpellDamage,
		Flags:          core.SpellFlagAPL,
		ClassSpellMask: WarlockSpellShadowBolt,
		MissileSpeed:   20,

		ManaCost: core.ManaCostOptions{
			BaseCost:   0.10,
			Multiplier: 1,
		},
		Cast: core.CastConfig{
			DefaultCast: core.Cast{
				GCD:      core.GCDDefault,
				CastTime: time.Millisecond * 3000,
			},
		},

		DamageMultiplierAdditive: 1,
		CritMultiplier:           warlock.DefaultSpellCritMultiplier(),
		ThreatMultiplier:         1,
		BonusCoefficient:         0.754,

		ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
			baseDamage := warlock.CalcAndRollDamageRange(sim, Coefficient_ShadowBolt, Variance_ShadowBolt)
			result := spell.CalcDamage(sim, target, baseDamage, spell.OutcomeMagicHitAndCrit)
			spell.WaitTravelTime(sim, func(sim *core.Simulation) {
				spell.DealDamage(sim, result)
				if result.Landed() && sim.Proc(shadowAndFlameProcChance, "S&F Proc") {
					core.ShadowAndFlameAura(target).Activate(sim)
				}
			})
		},
	})
}
