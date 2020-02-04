import { round } from './utils'

export interface PhaseObject {
  title: string;
  price: number;
  nbConsultant: number;
  margin: number;
  marginJE: number;
  netConsultant: number;
  netByConsultant: number;
  jeh: number;
  nbJeh: number;
  pay: number;
  urssafJE: number;
  urssafConsultant: number;
  pcConsultant: number;
  id: number;
}

export class TauxObject {
  urssafBase: number; // Base URSSAF
  jeContrib: number; // Part JE : Total des taux des cotisations indexées sur l'assiette de cotisation
  jepay: number; // Part JE : Total des taux des cotisations indexées sur la rémunération brute
  consultantContrib: number; // Part Etudiant : Total des taux des cotisations indexées sur l'assiette de cotisation
  consultantPay: number; // Part Etudiant : Total des taux des cotisations indexées sur la rémunération brute

  constructor (
    urssafBase: number = 39.04,
    jeContrib: number = 0.30116,
    jepay: number = 0.042,
    consultantContrib: number = 0.1605,
    consultantPay: number = 0
  ) {
    this.urssafBase = urssafBase
    this.jeContrib = jeContrib
    this.jepay = jepay
    this.consultantContrib = consultantContrib
    this.consultantPay = consultantPay
  }

  /* --- Methods for computing taxes and margin rates --- */
  computePhase (phase: PhaseObject) {
    phase.urssafJE = this.computeUrssafJe(phase.nbJeh, phase.pay)
    phase.marginJE = this.computeMarginJe(phase.price, phase.pay, phase.nbJeh)
    phase.urssafConsultant = this.computeUrssafConsultant(phase.nbJeh, phase.pay)
    phase.netConsultant = this.computeNetConsultant(phase.nbJeh, phase.pay)
    phase.netByConsultant = this.computeNetByConsultant(phase.nbConsultant, phase.nbJeh, phase.pay)
    phase.pcConsultant = this.computePcConsultant(phase.nbConsultant, phase.nbJeh, phase.pay, phase.price)
    return phase
  }

  computeUrssafJe (nbJeh:number, pay:number) {
    return round(nbJeh * this.urssafBase * this.jeContrib + pay * this.jepay)
  }
  computeMarginJe (price:number, pay:number, nbJeh:number) {
    return round((price - pay - this.computeUrssafJe(nbJeh, pay)) / price * 100)
  }
  computeUrssafConsultant (nbJeh:number, pay:number) {
    return round(nbJeh * this.urssafBase * this.consultantContrib + pay * this.consultantPay)
  }
  computeNetConsultant (nbJeh:number, pay:number) {
    return round(pay - this.computeUrssafConsultant(nbJeh, pay))
  }
  computeNetByConsultant (nbConsultant: number, nbJeh:number, pay:number) {
    return round(this.computeNetConsultant(nbJeh, pay) / nbConsultant)
  }
  computePcConsultant (nbConsultant: number, nbJeh:number, pay:number, price:number) {
    return round(this.computeNetByConsultant(nbConsultant, nbJeh, pay) / price * 100)
  }
}
