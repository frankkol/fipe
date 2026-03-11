import { useEffect, useState } from "react"
import type { Automobile } from "../types/Automobile"
import type { Table } from "../types/Table";

import FormFipe from "./FormFipe"
import ResumeFipe from './ResumeFipe'
import Graphy from "./Graphy";
import TableFipe from "./TableFipe";
import { FormBrandModel } from "./FormBrandModel";

const Fipe = () => {
    const [automobile, setAutomobile] = useState<Automobile>();
    const [table, setTable] = useState<Table[]>([]);
    const [activeTab, setActiveTab] = useState<'fipe' | 'brandmodel'>('brandmodel');
    const headStyle: string = "flex-1 py-4 text-sm font-medium transition-colors";
    const headStyleActive: string = "bg-white border-b-2 border-blue-500 text-blue-600";
    const headStyleDisable: string = "text-stone-500 hover:text-stone-700 hover:bg-stone-100";

    useEffect(() => {
        if (automobile === undefined) setTable([]);
    }, [automobile])

    return (
        <div className='bg-stone-100 min-h-screen w-full flex flex-col items-center p-4 sm:justify-center'>
            <div className="w-full lg:max-w-[40%] bg-white rounded-xl shadow-lg overflow-hidden transition-all">
                <div className="flex border-b border-stone-200 bg-stone-50">
                    <button
                        onClick={() => setActiveTab('brandmodel')}
                        className={`${headStyle} ${activeTab === 'brandmodel' ? headStyleActive : headStyleDisable}`}
                    >Marca e Modelo</button>
                    <button
                        onClick={() => setActiveTab('fipe')}
                        className={`${headStyle} ${activeTab === 'fipe' ? headStyleActive : headStyleDisable}`}
                    >Código FIPE</button>
                </div>

                <div className="py-4 px-5 md:py-6 md:px-8">
                    {activeTab === 'fipe' ? (
                        <FormFipe setAutomobile={setAutomobile} />
                    ) : (
                        <FormBrandModel setAutomobile={setAutomobile} />
                    )}
                    {automobile && <ResumeFipe automobile={automobile} setTable={setTable} />}
                    {table && table.length > 0 && (
                        <div className="mt-6 space-y-6">
                            <Graphy data={table} />
                            <TableFipe data={table} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Fipe