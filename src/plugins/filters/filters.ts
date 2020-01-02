export function euro (val: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val)
}

export function percentage (val: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'percent', minimumFractionDigits: 2 }).format(val / 100)
}
