import { PhaseObject, TauxObject } from '../types'
import { round } from '../utils'

const maxJeh: number = 400

function optimize (phase:PhaseObject, contributionRates:TauxObject) {
  // optimize : maximize the jeh to 400 €
  // if (phase.jeh < phase.price || true) {
  if (phase.price > 400) {
    phase.jeh = 400
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
  phase.urssafJE = round(phase.nbJeh * contributionRates.urssafBase *
    contributionRates.jeContrib + phase.pay * contributionRates.jepay)
  phase.marginJE = round((phase.price - phase.pay - phase.urssafJE) / phase.price * 100)
  phase.urssafConsultant = round(phase.nbJeh * contributionRates.urssafBase *
    contributionRates.consultantContrib + phase.pay * contributionRates.consultantPay)
  phase.netConsultant = round(phase.pay - phase.urssafConsultant)
  phase.netByConsultant = round(phase.netConsultant / phase.nbConsultant)
  phase.pcConsultant = round(phase.netByConsultant / phase.price * 100)

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
