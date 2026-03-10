import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import type { FormEvent } from "react"
import type { Automobile } from "../types/Automobile";
import type { Table } from "../types/Table";
import { LoadingCar } from "./LoadingCar";
import { ErrorMessage } from "./ErrorMessage";

const ResumeFipe = (props: any) => {
    const { automobile, setTable } = props;
    const [history, setHistory] = useState<Automobile[]>([]);
    const [finalFetch, setFinalFetch] = useState(false);
    const { data, error, fetchData } = useFetch<any>();
    const baseURL = 'https://brasilapi.com.br/api/fipe';
    const labelStyle: string = "text-[12px] text-gray-400 uppercase font-bold tracking-wider";
    const valueStyle: string = "text-gray-700 font-semibold text-sm md:text-base";

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFinalFetch(true);
        fetchData(`${baseURL}/tabelas/v1`);
    }

    const buscarDetalhes = async (resumo: any[], fipe: string) => {
        try {
            const promessas = resumo.map(item =>
                fetch(`${baseURL}/preco/v1/${fipe}?tabela_referencia=${item.codigo}`)
                    .then(res => {
                        if (!res.ok) throw new Error('Erro no item');
                        return res.json();
                    })
            );
            const resultados: Automobile[] = await Promise.all(promessas);
            setHistory(resultados);
        } catch (error) {
            console.error("Erro ao buscar detalhes em massa", error);
            setFinalFetch(false);
        }
    };

    useEffect(() => {
        if (data && data.length > 0) {
            const numFipe: string = automobile.codigoFipe.replace('-', '');
            const lastYear = data.slice(0, 13);
            buscarDetalhes(lastYear, numFipe);
        }
    }, [data])

    useEffect(() => {
        if (!automobile.anoModelo || !automobile.combustivel) return;
        if (history && history.length > 0) {
            const mappedTable: Table[] = history
                .flatMap(item => Array.isArray(item) ? item : [item])
                .filter(subItem =>
                    subItem.anoModelo === automobile.anoModelo &&
                    subItem.combustivel === automobile.combustivel
                ).map((subItem: any, index, array) => {
                    const value: number = parseFloat(
                        subItem.valor.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
                    );
                    const mesComplete: string = subItem.mesReferencia.replace(/(\S+)\s+de\s+(\d+)/, "$1/$2");
                    let variation = 0;

                    if (index < array.length - 1) {
                        const nextItem = array[index + 1];
                        const nextValue = parseFloat(
                            nextItem.valor.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
                        );
                        variation = Number((((value - nextValue) / nextValue) * 100).toFixed(2));
                    }
                    return {
                        mesComplete,
                        value,
                        variation
                    };
                }).slice(0, -1);
            setTable(mappedTable);
            setTimeout(() => setFinalFetch(false), 0);
        }
    }, [history])

    return (
        <>
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden mt-1 transition-all">
                <div className="bg-slate-700 p-2 text-center">
                    <span className="text-white text-[12px] uppercase tracking-widest font-semibold opacity-80">
                        Valor de Mercado
                    </span>
                    <h2 className="text-3xl font-extrabold text-white leading-tight">
                        {automobile.valor}
                    </h2>
                    <p className="text-[12px] text-slate-300 font-medium">
                        Ref.: {automobile.mesReferencia}
                    </p>
                </div>

                <div className="p-3 md:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <p className={labelStyle}>Fabricante</p>
                            <p className={valueStyle}>{automobile.marca}</p>
                        </div>
                        <div>
                            <p className={labelStyle}>Modelo</p>
                            <p className={valueStyle}>{automobile.modelo}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-gray-100 pt-2 md:pt-4">
                        <div>
                            <p className={labelStyle}>Ano Modelo</p>
                            <p className={valueStyle}>{automobile.anoModelo}</p>
                        </div>
                        <div>
                            <p className={labelStyle}>Combustível</p>
                            <p className={valueStyle}>{automobile.combustivel}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center border-t border-gray-100 pt-2 md:pt-4">
                        <div className="flex flex-col md:flex-row md:gap-2">
                            <p className={labelStyle}>Código Fipe:</p>
                            <p className="text-gray-700 font-bold text-sm">{automobile.codigoFipe}</p>
                        </div>
                        <button onClick={handleSubmit} type="submit"
                            className="w-full bg-slate-700 cursor-pointer text-white rounded-lg hover:bg-slate-900 font-medium py-2.5 text-sm transition-colors"
                        >Ver histórico</button>
                    </div>
                </div>
            </div>

            {finalFetch && <LoadingCar message={"Buscando histórico..."} />}
            {error && <ErrorMessage message={"Não foi localizar histórico:"} details={error.message} />}
        </>
    )
}

export default ResumeFipe;