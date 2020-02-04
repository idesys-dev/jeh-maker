import { PhaseObject, TauxObject } from '../types'
import { round } from '../utils'

const maxJeh: number = 400

function optimize (phase:PhaseObject, contributionRates:TauxObject) {
  // optimize : maximize the jeh to 400 €
  if (phase.price > maxJeh) {
    phase.jeh = maxJeh
  } else {
    phase.jeh = phase.price / phase.nbConsultant
  }

  phase.nbJeh = phase.price / phase.jeh

  // optimize : if the number of JEH is not integer,
  // then we need to increase the number of JEH and drecrease the amount of each JEH.
  if (!Number.isInteger(phase.nbJeh)) {
    phase.nbJeh = Math.floor(phase.nbJeh) + 1
    phase.jeh = round(phase.price / phase.nbJeh)
  }

  // compute data
  phase = contributionRates.computePhase(phase)

  return phase
}

export function optimizeByPrice (phase: PhaseObject, contributionRates:TauxObject) {
  phase.pay = round(phase.price * (1 - phase.margin / 100))
  return optimize(phase, contributionRates)
}

export function optimizeByPay (phase: PhaseObject, contributionRates:TauxObject) {
  phase.price = round(phase.pay / (1 - phase.margin / 100))
  return optimize(phase, contributionRates)
}
