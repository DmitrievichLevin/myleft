export const formatCurrencyNumber = (value: number, sym = '$') => {
  return value
    .toFixed(2)
    .toString()
    .split(/[-.]/)
    .reverse()
    .reduceRight(function (t, c, i) {
      return i == 2
        ? '-' + t
        : i == 1
          ? t + c.replace(/(\d)(?=(\d{3})+$)/g, '$1' + ',')
          : t + '.' + c;
    }, sym);
};

export const formatCurrency = (value: string) => {
  console.log('track format currency', value);
  return `${value}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
