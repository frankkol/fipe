import { useEffect, useState } from "react"
import type { Automobile } from "../types/Automobile"
import type { Table } from "../types/Table";

import FormFipe from "./FormFipe"
import ResumeFipe from './ResumeFipe'
import Graphy from "./Graphy";
import TableFipe from "./TableFipe";

const Fipe = () => {
    const [automobile, setAutomobile] = useState<Automobile>();
    const [table, setTable] = useState<Table[]>([]);
    
    useEffect(() => {
        if(automobile === undefined) setTable([]);
    }, [automobile])

    return (
        <>
            <div className='bg-stone-100 min-h-screen w-full flex flex-col items-center justify-center'>
                <FormFipe setAutomobile={setAutomobile} />
                {automobile && <ResumeFipe automobile={automobile} setTable={setTable} />}
                {table && table.length > 0 &&
                    <>
                        <Graphy data={table} />
                        <TableFipe data={table} />
                    </>
                }
            </div >
        </>
    )
}

export default Fipe