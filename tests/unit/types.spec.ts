import { TauxObject } from '@/types.ts'

/* See BV and JEH-Maker of IdéSYS to check the values */
const testSetMethods = [
  {
    phase: {
      id: 1,
      title: 'Developpement',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 2,
      pay: 360,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 1,
      title: 'Developpement',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 2,
      pay: 360,
      urssafJE: 38.63,
      marginJE: 50.17,
      urssafConsultant: 12.53,
      netConsultant: 347.47,
      netByConsultant: 347.47,
      pcConsultant: 43.43
    },
    taux: new TauxObject(39.04, 0.30116, 0.042, 0.1605, 0)
  }
]

describe('TauxObject', () => {
  it('create TauxObject', () => {
    const t = new TauxObject()
    expect(t.urssafBase).toEqual(41.0)
  })

  describe('TauxObject Methods', () => {
    it('computePhase', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computePhase(test.phase))
            .toEqual(test.result)
      )
    })

    it('computeUrssafJe', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computeUrssafJe(test.phase.nbJeh, test.phase.pay))
            .toBeCloseTo(test.result.urssafJE, 4)
      )
    })
    it('computeMarginJe', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computeMarginJe(test.phase.price, test.phase.pay, test.phase.nbJeh))
            .toBeCloseTo(test.result.marginJE, 4)
      )
    })
    it('computeUrssafConsultant', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computeUrssafConsultant(test.phase.nbJeh, test.phase.pay))
            .toBeCloseTo(test.result.urssafConsultant, 4)
      )
    })
    it('computeNetConsultant', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computeNetConsultant(test.phase.nbJeh, test.phase.pay))
            .toBeCloseTo(test.result.netConsultant, 4)
      )
    })
    it('computeNetByConsultant', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computeNetByConsultant(test.phase.nbConsultant, test.phase.nbJeh, test.phase.pay))
            .toBeCloseTo(test.result.netByConsultant, 4)
      )
    })
    it('computePcConsultant', () => {
      testSetMethods.forEach(
        test =>
          expect(test.taux.computePcConsultant(test.phase.nbConsultant, test.phase.nbJeh, test.phase.pay, test.phase.price))
            .toBeCloseTo(test.result.pcConsultant, 4)
      )
    })
  })
})
