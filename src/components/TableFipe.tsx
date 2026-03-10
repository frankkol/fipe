import type { Table } from "../types/Table";
import { formatterBRL, colors } from "../utils/formatters";

const TableFipe = ({ data }: { data: Table[] }) => {
    const dataReverse = [...data].reverse();
    const tableHead: string = "px-2 py-2 md:px-8 py-3 text-left text-left font-bold text-gray-900 bg-gray-50";

    return (
        <div className="w-full relative overflow-y-auto overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-h-75 scrollbar-thin scrollbar-thumb-gray-300 transition-all">
            <table className="w-full min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th className={tableHead}>Mês/Referência</th>
                        <th className={tableHead}>Valor</th>
                        <th className={tableHead}>Variação</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {dataReverse.map((item, index) => {
                        const variation = item.variation ?? 0;
                        const value = item.value ?? 0;
                        const color = colors.getColorByValue(variation);

                        return (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap px-2 md:px-8 py-2 text-gray-700 capitalize">
                                    {item.mesComplete}
                                </td>
                                <td className="whitespace-nowrap px-2 md:px-8 py-2 font-medium text-gray-900">
                                    {formatterBRL.format(value)}
                                </td>
                                <td className="whitespace-nowrap px-2 md:px-8 py-2">
                                    <div className={`flex items-center gap-1 font-bold ${color.class}`}>
                                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d={color.icon} clipRule="evenodd" />
                                        </svg>
                                        <span>{variation.toFixed(2)}%</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableFipe;