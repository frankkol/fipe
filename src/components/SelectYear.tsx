import { useEffect, useState } from 'react';
import Select from 'react-select'
import type { Year } from '../types/Year';
import { useFetch } from '../hooks/useFetch';

interface PropYear {
    idBrand: number | undefined,
    idModel: number | undefined,
    onChangeYear: (data: number | undefined) => void;
}

export const SelectYear = ({ idBrand, idModel, onChangeYear }: PropYear) => {
    const URL: string = 'https://parallelum.com.br/fipe/api/v2/cars/brands/';
    const { data: dataYear, loading: loadingYear, fetchData: fetchDataYear } = useFetch<Year[] | null>();
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [yearOptions, setYearOptions] = useState<any>([]);

    useEffect(() => {
        if (!idBrand || !idModel) return;
        fetchDataYear(`${URL}${idBrand}/models/${idModel}/years`)
    }, [idBrand, idModel]);

    useEffect(() => {
        if (!dataYear) return;
        const optionsM = dataYear.map((option) => ({
            value: option.code,
            label: option.name
        }));
        setYearOptions(optionsM)
    }, [dataYear]);

    const selectedOptionsYear = yearOptions.find((opt: any) => opt.value === selectedYear) || null;

    const handleYearUpdate = (e: any) => {
        setSelectedYear(e.value);
        onChangeYear(e.value);
    }

    return (
        <Select
            placeholder="Selecione o ano do modelo..."
            options={yearOptions}
            value={selectedOptionsYear}
            isLoading={loadingYear}
            isDisabled={idModel === undefined}
            onChange={handleYearUpdate}
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
    )
}