import { useEffect, useState } from 'react';
import Select from 'react-select'
import type { Model } from '../types/Model';
import { useFetch } from '../hooks/useFetch';

interface PropModel {
    id: number | undefined,
    onChangeModel: (data: number | undefined) => void;
}

export const SelectModel = ({ id, onChangeModel }: PropModel) => {
    const URL: string = 'https://parallelum.com.br/fipe/api/v2/cars/brands/';
    const { data: dataModel, loading: loadingModel, fetchData: fetchDataModel } = useFetch<Model[] | null>();
    const [selectedModel, setSelectedModel] = useState<number | null>(null);
    const [modelOptions, setModelOptions] = useState<any>([]);

    useEffect(() => {
        if (!id) return;
        fetchDataModel(`${URL}${id}/models`)
    }, [id]);

    useEffect(() => {
        if (!dataModel) return;
        const optionsM = dataModel.map((option) => ({
            value: option.code,
            label: option.name
        }));
        setModelOptions(optionsM)
    }, [dataModel]);

    const selectedOptionsModel = modelOptions.find((opt: any) => opt.value === selectedModel) || null;

    const handleModelUpdate = (e: any) => {
        setSelectedModel(e.value);
        onChangeModel(e.value);
    }

    return (
        <Select
            placeholder="Selecione o modelo..."
            options={modelOptions}
            value={selectedOptionsModel}
            isLoading={loadingModel}
            isDisabled={id === undefined}
            onChange={handleModelUpdate}
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