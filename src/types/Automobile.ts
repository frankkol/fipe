export interface Automobile {
    // Propriedades https://brasilapi.com.br/api/fipe
    valor?: string;
    marca?: string;
    modelo?: string;
    anoModelo?: number;
    combustivel?: string;
    codigoFipe?: string;
    mesReferencia?: string;
    tipoVeiculo?: number;
    siglaCombustivel?: string;
    dataConsulta?: string;

    // Propriedades https://parallelum.com.br/fipe
    price?: string;
    brand?: string;
    model?: string;
    modelYear?: number;
    fuel?: string;
    codeFipe?: string;
    referenceMonth?: string;
    vehicleType?: number;
    fuelAcronym?: string;
}