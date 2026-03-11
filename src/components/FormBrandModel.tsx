import { useEffect, useState, type FormEvent } from 'react';
import { SelectBrand } from './SelectBrand';
import { SelectModel } from './SelectModel';
import { SelectYear } from './SelectYear';
import type { Automobile } from '../types/Automobile';
import { useFetch } from '../hooks/useFetch';
import { normalizarVeiculo } from '../utils/formatters';
import { LoadingCar } from './LoadingCar';

// Define que setAutomobile é uma função que recebe um objeto Automobile
interface FormFipeProps {
  setAutomobile: (data: Automobile | undefined) => void;
}

export function FormBrandModel({ setAutomobile }: FormFipeProps) {
  const [selectedCodeBrand, setSelectedCodeBrand] = useState<number | undefined>();
  const [selectedCodeModel, setSelectedCodeModel] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const { data, loading, fetchData } = useFetch<Automobile>();
  const url: string = 'https://parallelum.com.br/fipe/api/v2/cars/brands/';
  const isDisabled = selectedYear === undefined;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCodeBrand && !selectedCodeModel && !selectedYear) return;
    fetchData(`${url}${selectedCodeBrand}/models/${selectedCodeModel}/years/${selectedYear}`)
  }

  useEffect(() => {
    if (data) {
      const dadosNormalizados = normalizarVeiculo(data);
      setAutomobile(dadosNormalizados);
    }
  }, [data])

  useEffect(() => {
    setSelectedCodeModel(undefined);
    setSelectedYear(undefined);
    setAutomobile(undefined);
  }, [selectedCodeBrand])

  useEffect(() => { console.log(selectedCodeBrand) }, [selectedCodeBrand])
  useEffect(() => { console.log(selectedCodeModel) }, [selectedCodeModel])
  useEffect(() => { console.log(selectedYear) }, [selectedYear])

  return (
    <>
      <h1 className='font-bold text-[2em] text-gray-800'>Avalie seu veículo</h1>
      <p className='text-gray-700 text-sm'>Informe marca, modelo e ano do modelo para buscar informações do veículo.</p>
      <div className='w-full flex flex-col sm:justify-center py-4'>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:items-end">

          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold ml-1 mb-1 text-stone-600" htmlFor="marca">Marca</label>
            <SelectBrand onChange={setSelectedCodeBrand} />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold ml-1 mb-1 text-stone-600" htmlFor="marca">Marca</label>
            <SelectModel id={selectedCodeBrand} onChangeModel={setSelectedCodeModel} />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold ml-1 mb-1 text-stone-600" htmlFor="marca">Ano</label>
            <SelectYear idBrand={selectedCodeBrand} idModel={selectedCodeModel} onChangeYear={setSelectedYear} />
          </div>

          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            type="submit"
            className={`w-full h-10.5 text-white rounded-lg font-medium text-sm transition-colors ${isDisabled
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-slate-700 hover:bg-slate-900 cursor-pointer"
              }`}
          >Pesquisar</button>
        </form>
      </div>
      {loading && <LoadingCar message={"Buscando seu veículo..."} />}
    </>
  );
}