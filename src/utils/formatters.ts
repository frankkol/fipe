import type { Automobile } from "../types/Automobile";

interface ColorScheme {
  hex: string;
  class: string;
  icon: string;
}

const normalizarVeiculo = (dados: Automobile) => {
  return {
    valor: dados.valor || dados.price,
    marca: dados.marca || dados.brand,
    modelo: dados.modelo || dados.model,
    combustivel: dados.combustivel || dados.fuel,
    anoModelo: dados.anoModelo || dados.modelYear,
    codigoFipe: dados.codigoFipe || dados.codeFipe,
    mesReferencia: dados.mesReferencia || dados.referenceMonth,
  };
};

const formatterBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatterCompact = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value).toLowerCase();
};

const formatterMonthYear = (value: string) => {
  if (!value || !value.includes('/')) return value;
  const [mes, anoFull] = value.split('/');
  if (!mes || !anoFull) return value;

  const mesCurto = mes.substring(0, 3).toLowerCase();
  const anoCurto = anoFull.slice(-2);
  return `${mesCurto}/${anoCurto}`;
}

const colors = {
  color: [
    { "hex": "#dc2626", "class": "text-red-600", "icon": "M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 12.586 3.707 8.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 12.414 14.586 16H12z" },
    { "hex": "#008236", "class": "text-green-700", "icon": "M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" },

    { "hex": "#cacaca", "class": "text-gray-500", "icon": "M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" },

    { "hex": "#dc2626", "class": "text-red-600", "icon": "M3.97 3.97a.75.75 0 0 1 1.06 0l13.72 13.72V8.25a.75.75 0 0 1 1.5 0V19.5a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1 0-1.5h9.44L3.97 5.03a.75.75 0 0 1 0-1.06Z" },
    { "hex": "#1447e6", "class": "text-blue-700", "icon": "M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" },
  ],
  getColorByValue(v: number): ColorScheme {
    if (v < 0) return this.color[0]
    if (v > 0) return this.color[1]
    return this.color[2]
  }
}

export { normalizarVeiculo, formatterBRL, formatterMonthYear, formatterCompact, colors };