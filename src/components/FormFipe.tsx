import { useState, useEffect } from "react"
import type { FormEvent, ChangeEvent } from "react"
import type { Automobile } from "../types/Automobile"
import { normalizarVeiculo } from '../utils/formatters';
import { useFetch } from "../hooks/useFetch"
import { LoadingCar } from "./LoadingCar";
import { ErrorMessage } from "./ErrorMessage";
import Select from "react-select";

interface Option {
    anoModelo: number;
    combustivel: string;
}

interface FormFipeProps {
    setAutomobile: (data: Automobile | undefined) => void;
}

const FormFipe = ({ setAutomobile }: FormFipeProps) => {
    const [erroSubmit, setErroSubmit] = useState(false);
    const [fipe, setFipe] = useState('');
    const [selectedAno, setSelectedAno] = useState<Option>();
    const { data, error, loading, fetchData } = useFetch<Automobile[]>();
    const [anoModelo, setAnoModelo] = useState<Option[]>([]);
    const url: string = 'https://brasilapi.com.br/api/fipe/preco/v1/';
    const isDisabled: boolean = anoModelo.length === 0;

    const optionsAno = anoModelo.map((opcao) => ({
        value: `${opcao.anoModelo} ${opcao.combustivel}`,
        label: `${opcao.anoModelo} ${opcao.combustivel}`
    }));

    const selectedOption = selectedAno
        ? { value: `${selectedAno.anoModelo} ${selectedAno.combustivel}`, label: `${selectedAno.anoModelo} ${selectedAno.combustivel}` }
        : null;

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
        const dadosNormalizados = data.map(normalizarVeiculo);

        const autoSelected = dadosNormalizados.find(auto =>
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
            <div className='w-full flex flex-col sm:justify-center py-4'>
                <form className="flex flex-col md:flex-row md:items-end gap-4 w-full">
                    <div className="flex flex-col md:flex-row flex-1 gap-4">
                        <div className="flex flex-col flex-1 w-full">
                            <label className="text-xs font-semibold ml-1 mb-1 text-stone-600" htmlFor="fipe">Fipe</label>
                            <input
                                maxLength={8}
                                className="w-full rounded-lg border-2 border-stone-700 py-2 px-3 text-sm placeholder:text-stone-400 focus:ring-2 focus:ring-slate-500 outline-none"
                                type="text"
                                name="fipe"
                                placeholder="001004-9"
                                value={fipe}
                                onChange={e => setFipe(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col flex-1 w-full">
                            <label className="text-xs font-semibold ml-1 mb-1 text-stone-600" htmlFor="ano">Ano</label>
                            <Select value={selectedOption}
                                isDisabled={isDisabled}
                                options={optionsAno}
                                onChange={(option) => { handleChange({ target: { value: option ? option.value : "" } } as any) }}
                                placeholder="Selecione o ano modelo..."
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        zIndex: 9999,
                                        borderRadius: '8px',
                                        borderWidth: '2px',
                                        borderColor: state.isDisabled ? '#e5e7eb' : '#44403c',
                                        boxShadow: state.isFocused ? '0 0 0 2px #64748b' : 'none',
                                        '&:hover': { borderColor: '#44403c' },
                                        minHeight: '42px',
                                        fontSize: '0.875rem'
                                    }),
                                    placeholder: (base) => ({
                                        ...base, color: '#a8a29e'
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <button
                        disabled={isDisabled}
                        onClick={handleSubmit}
                        type="submit"
                        className={`w-full md:w-auto h-10.5 text-white rounded-lg font-medium text-sm px-8 transition-colors ${isDisabled
                            ? "bg-slate-300 cursor-not-allowed"
                            : "bg-slate-700 hover:bg-slate-900 cursor-pointer"}
                            `}
                    >Pesquisar</button>
                </form>
            </div>

            {loading && <LoadingCar message={"Buscando seu veículo..."} />}
            {error && <ErrorMessage message={"Não foi possível localizar o veículo:"} details={error.message} />}
            {erroSubmit && <ErrorMessage message={"Selecione um ano para realizar a pesquisa"} />}
        </>
    )
}

export default FormFipe