export const MaskInPhone = (numero: string) => {
  const noMask = numero.replace(/\D/g, '');
  const { length } = noMask;

  if (length <= 11) {
    return noMask
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(length === 11 ? /(\d{5})(\d{4})/ : /(\d{4})(\d{4})/, '$1-$2');
  }

  return numero;
}
