export function euro (val: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val)
}

export function percentage (val: number) {
  return val.toString() + ' %'
}
