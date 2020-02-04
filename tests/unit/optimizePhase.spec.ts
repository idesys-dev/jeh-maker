import { TauxObject } from '@/types.ts'
import { round } from '@/utils.ts'
import { optimizeByPrice } from '@/services/optimizePhase.ts'

const taux = new TauxObject()

const testSetByPrice = [
  {
    phase: {
      id: 1,
      title: '',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 1,
      title: '',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 2,
      pay: 360,
      urssafJE: taux.computeUrssafJe(2, 360),
      marginJE: taux.computeMarginJe(800, 360, 2),
      urssafConsultant: taux.computeUrssafConsultant(2, 360),
      netConsultant: taux.computeNetConsultant(2, 360),
      netByConsultant: taux.computeNetByConsultant(1, 2, 360),
      pcConsultant: taux.computePcConsultant(1, 2, 360, 800)
    }
  },
  {
    phase: {
      id: 2,
      title: '',
      price: 400,
      jeh: 400,
      nbConsultant: 2,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 2,
      title: '',
      price: 400,
      jeh: 200,
      nbConsultant: 2,
      margin: 55,
      nbJeh: 2,
      pay: 180,
      urssafJE: taux.computeUrssafJe(2, 180),
      marginJE: taux.computeMarginJe(400, 180, 2),
      urssafConsultant: taux.computeUrssafConsultant(2, 180),
      netConsultant: taux.computeNetConsultant(2, 180),
      netByConsultant: taux.computeNetByConsultant(2, 2, 180),
      pcConsultant: taux.computePcConsultant(2, 2, 180, 400)
    }
  },
  {
    phase: {
      id: 3,
      title: '',
      price: 240,
      jeh: 400,
      nbConsultant: 3,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 3,
      title: '',
      price: 240,
      jeh: 80,
      nbConsultant: 3,
      margin: 55,
      nbJeh: 3,
      pay: 108,
      urssafJE: taux.computeUrssafJe(3, 108),
      marginJE: taux.computeMarginJe(240, 108, 3),
      urssafConsultant: taux.computeUrssafConsultant(3, 108),
      netConsultant: taux.computeNetConsultant(3, 108),
      netByConsultant: taux.computeNetByConsultant(3, 3, 108),
      pcConsultant: taux.computePcConsultant(3, 3, 108, 240)
    }
  }
]

describe('optimizePhase', () => {
  it('optimise by price (no urssaf testing)', () => {
    testSetByPrice.forEach(testObj => {
      expect(optimizeByPrice(testObj.phase, taux)).toEqual(testObj.result)
    })
  })
})
