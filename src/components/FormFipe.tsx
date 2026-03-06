import { useState, useEffect } from "react"
import type { FormEvent, ChangeEvent } from "react"
import type { Automobile } from "../types/Automobile"
import { useFetch } from "../hooks/useFetch"
import { LoadingCar } from "./LoadingCar";
import { ErrorMessage } from "./ErrorMessage";

// 1. Definição do tipo para as opções
interface Option {
    anoModelo: number;
    combustivel: string;
}

// Define que setAutomobile é uma função que recebe um objeto Automobile
interface FormFipeProps {
    setAutomobile: (data: Automobile | undefined) => void;
}

const FormFipe = ({ setAutomobile }: FormFipeProps ) => {
    const [erroSubmit, setErroSubmit] = useState(false);
    const [fipe, setFipe] = useState('');
    const [selectedAno, setSelectedAno] = useState<Option>();
    const { data, error, loading, fetchData } = useFetch<Automobile[]>();
    const [anoModelo, setAnoModelo] = useState<Option[]>([]);
    const url: string = 'https://brasilapi.com.br/api/fipe/preco/v1/';
    const isDisabled: boolean = anoModelo.length === 0;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setErroSubmit(false);
        const value: any = e.target.value.split(' ');
        const mappedOptions: Option = {
            anoModelo: parseInt(value[0]),
            combustivel: value[1]
        }
        setSelectedAno(mappedOptions);
        setAutomobile(undefined);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedAno || !data) return;

        const autoSelected = data.find(auto =>
            auto.combustivel === selectedAno.combustivel &&
            auto.anoModelo === selectedAno.anoModelo
        );

        if (autoSelected) setAutomobile(autoSelected);
    }

    useEffect(() => {
        setAnoModelo([]);
        setSelectedAno(undefined);
        setAutomobile(undefined);
        const numFipe: string = fipe.replace('-', '');
        if (numFipe.length < 7) return;
        fetchData(`${url}${fipe}`);
    }, [fipe])

    useEffect(() => {
        if (data && data.length > 0) {
            const mappedOptions: Option[] = data.map((item: any) => ({
                anoModelo: item.anoModelo,
                combustivel: item.combustivel
            }));
            setAnoModelo(mappedOptions);
        }
    }, [data])

    return (
        <>
            <h1 className='font-bold text-[2em] text-gray-800'>Avalie seu veículo</h1>
            <p className='text-gray-700 text-sm'>Informe seu código FIPE e ano do modelo para buscar informações do veículo.</p>
            <div className='w-xl mt-1 py-3 rounded-lg'>
                <form className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm ml-1" htmlFor="fipe">Fipe</label>
                            <input maxLength={8} className="rounded-lg border-2 border-stone-700 py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400" type="text" name="fipe" placeholder="0010049" value={fipe} onChange={e => setFipe(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm ml-1" htmlFor="ano">Ano</label>
                            <select
                                disabled={isDisabled}
                                value={selectedAno?.anoModelo != undefined ? `${selectedAno?.anoModelo} ${selectedAno?.combustivel}` : ""}
                                onChange={handleChange}
                                className={`rounded-lg border-2 py-2 px-2 text-sm placeholder:text-sm
                                ${isDisabled
                                        ? "text-gray-400 cursor-not-allowed border-gray-200"
                                        : "border-stone-700"}
                        `}
                            >
                                <option value="" disabled>Selecione o ano modelo...</option>
                                {anoModelo.map((opcao) => (
                                    <option key={`${opcao.anoModelo} ${opcao.combustivel}`}
                                        value={`${opcao.anoModelo} ${opcao.combustivel}`}>
                                        {`${opcao.anoModelo} ${opcao.combustivel}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        disabled={isDisabled}
                        onClick={handleSubmit}
                        type="submit"
                        className={`text-white mt-2 rounded-lg font-medium text-lg py-2 px-4
                                ${isDisabled
                                ? "bg-slate-400 text-gray-400 cursor-not-allowed border-gray-200"
                                : "bg-slate-700 hover:bg-slate-900"}
                        `}
                    >Pesquisar</button>
                </form >
            </div>

            {loading && <LoadingCar message={"Buscando seu veículo..."} />}
            {error && <ErrorMessage message={"Não foi possível localizar o veículo:"} details={error.message} />}
            {erroSubmit && <ErrorMessage message={"Selecione um ano para realizar a pesquisa"} />}
        </>
    )
}

export default FormFipe