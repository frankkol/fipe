import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, VisualMapComponent, ToolboxComponent, MarkLineComponent, MarkPointComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useRef, useEffect } from 'react';
import type { Table } from '../types/Table';
import { formatterBRL, formatterMonthYear, formatterCompact, colors } from "../utils/formatters";

echarts.use([TitleComponent, TooltipComponent, GridComponent, VisualMapComponent, ToolboxComponent, MarkLineComponent, MarkPointComponent, LineChart, CanvasRenderer]);

const Graphy = ({ data }: { data: Table[] }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartData = [...data].reverse();

    const generateVisualMapPieces = (data: Table[]) => {
        const pieces = data.map((item, index) => {
            const variation = item.variation ?? 0;
            const color = colors.getColorByValue(variation).hex;
            if (index === 0) return { lte: 0, color: color };
            return { gt: index - 1, lte: index, color: color };
        });
        return pieces;
    };

    useEffect(() => {
        if (!chartRef.current || data.length === 0) return;

        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
        }

        const labels = data.map(item => item.mesComplete).reverse();
        const values = data.map(item => item.value ?? 0).reverse();
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: labels,
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    fontSize: 10,
                    formatter: (v: string) => formatterMonthYear(v)
                }
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: generateVisualMapPieces(chartData)
            },
            yAxis: {
                type: 'value',
                min: Math.floor(minVal * 0.99),
                max: Math.ceil(maxVal * 1.01),
                axisLabel: {
                    formatter: (v: number) => formatterBRL.format(v)
                }
            },
            series: [{
                name: 'Valor',
                type: 'line',
                smooth: true,
                data: values,
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: 'Máximo',
                            itemStyle: { color: colors.getColorByValue(1).hex },
                            label: {
                                formatter: (params: any) => formatterCompact(params.value)
                            }
                        },
                        {
                            type: 'min',
                            name: 'Mínimo',
                            itemStyle: { color: colors.getColorByValue(-1).hex },
                            label: {
                                formatter: (params: any) => formatterCompact(params.value)
                            }
                        }
                    ]
                },
                markLine: {
                    lineStyle: {
                        color: '#f97316',
                        type: 'dashed'
                    },
                    label: {
                        position: 'end',
                        formatter: (params: any) => formatterCompact(params.value)
                    },
                    data: [
                        { type: 'average', name: 'Média' }
                    ]
                }
            }],
            grid: {
                top: 30,
                bottom: 60,
                left: 100,
                right: 30,
            },
        };

        myChart.setOption(option);
        const handleResize = () => myChart?.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    return (
        <div
            ref={chartRef}
            className="w-full h-80 md:h-100 lg:aspect-video bg-white rounded-lg shadow-lg transition-all"
            style={{ minHeight: '300px' }}
        />
    );
};

export default Graphy;