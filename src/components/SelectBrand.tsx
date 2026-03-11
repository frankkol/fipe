import { useEffect, useState } from 'react';
import Select from 'react-select'
import type { Brand } from '../types/Brand';
import { useFetch } from '../hooks/useFetch';

interface PropBrand {
    onChange: (data: number | undefined) => void;
}

export const SelectBrand = ({ onChange }: PropBrand) => {
    const URL: string = 'https://parallelum.com.br/fipe/api/v2/cars/brands';
    const { data: dataBrand, loading: loadingBrand, fetchData: fetchDataBrand } = useFetch<Brand[] | null>();
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [brandOptions, setBrandOptions] = useState<any>([]);

    useEffect(() => {
        fetchDataBrand(URL)
    }, []);

    useEffect(() => {
        if (!dataBrand) return;
        const options = dataBrand.map((option) => ({
            value: option.code,
            label: option.name
        }));
        setBrandOptions(options)
    }, [dataBrand]);

    const selectedOptionsBrand = brandOptions.find((opt: any) => opt.value === selectedBrand)

    const handleBrandUpdate = (e: any) => {
        setSelectedBrand(e.value);
        onChange(e.value);
    }

    return (
        <Select
            placeholder="Selecione a marca..."
            options={brandOptions}
            value={selectedOptionsBrand}
            isLoading={loadingBrand}
            onChange={handleBrandUpdate}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
                control: (base, state) => ({
                    ...base,
                    borderRadius: '8px',
                    borderWidth: '2px',
                    borderColor: state.isDisabled ? '#e5e7eb' : '#44403c',
                    boxShadow: state.isFocused ? '0 0 0 2px #64748b' : 'none',
                    '&:hover': { borderColor: '#44403c' },
                    minHeight: '42px',
                    fontSize: '0.875rem'
                }),
                menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999
                }),
                placeholder: (base) => ({
                    ...base, color: '#a8a29e'
                })
            }}
        />
    )
}