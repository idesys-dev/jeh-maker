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

  constructor () {
    this.urssafBase = 40.6
    this.jeContrib = 0.3042
    this.jepay = 0.042
    this.consultantContrib = 0.17
    this.consultantPay = 0
  }
}
