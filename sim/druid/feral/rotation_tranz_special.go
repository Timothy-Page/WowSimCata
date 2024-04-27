package feral

import (
	"time"

	"github.com/wowsims/cata/sim/core"
)

func (cat *FeralDruid) doTranzSpecialRotation(sim *core.Simulation) (bool, time.Duration) {
	rotation := &cat.Rotation

	curEnergy := cat.CurrentEnergy()
	curCp := cat.ComboPoints()
	//isClearcast := cat.ClearcastingAura.IsActive()
	//simTimeRemain := sim.GetRemainingDuration()

	//waitForTf := false
	berserkNow := false

	//useBuilder := true

	mangleNow := true
	//rakeNow := true
	ffNow := false
	roarNow := false

	// Pooling calcs
	pendingPool := PoolingActions{}

	if cat.SavageRoarAura.IsActive() {
		roarCost := core.Ternary(cat.berserkExpectedAt(sim, cat.SavageRoarAura.ExpiresAt()), cat.SavageRoar.DefaultCast.Cost*0.5, cat.SavageRoar.DefaultCast.Cost)
		pendingPool.addAction(cat.SavageRoarAura.ExpiresAt(), roarCost)

		if curCp == 0 && cat.SavageRoarAura.RemainingDuration(sim) > time.Second {
			expireTime := cat.SavageRoarAura.ExpiresAt() - time.Second
			builderCost := core.Ternary(rotation.AoeMangleBuilder, cat.MangleCat.DefaultCast.Cost, cat.Rake.DefaultCast.Cost)
			builderCost = core.Ternary(cat.berserkExpectedAt(sim, expireTime), builderCost*0.5, builderCost)
			pendingPool.addAction(expireTime, builderCost)
		}
	}

	pendingPool.sort()

	//floatingEnergy := pendingPool.calcFloatingEnergy(cat, sim)
	//excessE := curEnergy - floatingEnergy

	timeToNextAction := time.Duration(0)

	if ffNow {
		cat.FaerieFire.Cast(sim, cat.CurrentTarget)
		return false, 0
	} else if berserkNow {
		cat.Berserk.Cast(sim, nil)
		cat.UpdateMajorCooldowns()
		return false, 0
	} else if roarNow {
		if cat.SavageRoar.CanCast(sim, cat.CurrentTarget) {
			cat.SavageRoar.Cast(sim, nil)
			return false, 0
		}
		timeToNextAction = time.Duration((cat.CurrentSavageRoarCost() - curEnergy) * float64(cat.EnergyTickDuration))
	} else if mangleNow {
		if cat.MangleCat.CanCast(sim, cat.CurrentTarget) {
			cat.MangleCat.Cast(sim, cat.CurrentTarget)
			return false, 0
		}
		timeToNextAction = time.Duration((cat.CurrentMangleCatCost() - curEnergy) * float64(cat.EnergyTickDuration))
	} else {
		if cat.Rake.CanCast(sim, cat.CurrentTarget) {
			cat.Rake.Cast(sim, cat.CurrentTarget)
			return false, 0
		}
		timeToNextAction = time.Duration((cat.CurrentRakeCost() - curEnergy) * float64(cat.EnergyTickDuration))
	}

	// Model in latency when waiting on Energy for our next action
	nextAction := sim.CurrentTime + timeToNextAction
	paValid, rt := pendingPool.nextRefreshTime()
	if paValid {
		nextAction = min(nextAction, rt)
	}

	return true, nextAction
}
