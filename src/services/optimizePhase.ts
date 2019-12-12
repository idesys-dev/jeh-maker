import PhaseObject from '../types'
import { round } from '../utils'
import contributionRates from '../data'

const maxJeh: number = 400

function optimize (phase:PhaseObject) {
  console.log('optimize', phase.pay, phase.price)
  // optimize : maximize the jeh to 400 €
  // if (phase.jeh < phase.price || true) {
  if (phase.price >= 400) {
    phase.jeh = 400
  } else {
    phase.jeh = phase.price
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
    contributionRates.ConsultantContrib + phase.pay * contributionRates.ConsultantPay)
  phase.netConsultant = round(phase.pay - phase.urssafConsultant)
  phase.netByConsultant = round(phase.netConsultant / phase.nbConsultant)
  phase.pcConsultant = round(phase.netByConsultant / phase.price * 100)

  return phase
}

export function optimizeByPrice (phase: PhaseObject) {
  console.log('optimizeByPrice', phase.pay, phase.price)
  phase.pay = round(phase.price * (1 - phase.margin / 100))
  return optimize(phase)
}

export function optimizeByPay (phase: PhaseObject) {
  console.log('optimizeByPay', phase.pay, phase.price)
  phase.price = round(phase.pay / (1 - phase.margin / 100))
  return optimize(phase)
}
