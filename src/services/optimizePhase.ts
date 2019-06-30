import PhaseObject from '../types'
import round from '../utils'
import contributionRates from '../data'

export function optimizeByPrice (phase: PhaseObject) {
  // optimize : maximize the jeh to 400 €
  if (phase.jeh < phase.price) {
    if (phase.price >= 400) {
      phase.jeh = 400
    } else {
      phase.jeh = phase.price
    }
  }

  // compute data
  phase.nbJeh = phase.price / phase.jeh
  phase.pay = round(phase.price - (phase.price * phase.margin / 100))
  phase.urssafJE = round(phase.nbJeh * contributionRates.urssafBase * contributionRates.jeContrib +
    phase.pay * contributionRates.jepay)
  phase.marginJE = round((phase.price - phase.pay - phase.urssafJE) / phase.price * 100)
  phase.urssafConsultant = round(phase.nbJeh * contributionRates.urssafBase * contributionRates.ConsultantContrib +
    phase.pay * contributionRates.ConsultantPay)
  phase.netConsultant = round(phase.pay - phase.urssafConsultant)
  phase.netByConsultant = round(phase.netConsultant / phase.nbConsultant)
  phase.pcConsultant = round(phase.netByConsultant / phase.price * 100)

  // optimize : if the number of JEH is not integer,
  // then we need to increase the number of JEH and drecrease the amount of each JEH.
  if (!Number.isInteger(phase.nbJeh)) {
    phase.nbJeh = Math.floor(phase.nbJeh) + 1
    phase.jeh = round(phase.price / phase.nbJeh)
  }

  return phase
}

export function optimizeByPay (phase: PhaseObject) {
  return phase
}
