import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, VisualMapComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useRef, useEffect } from 'react';
import type { Table } from '../types/Table';
import { formatterBRL, formatterMonthYear, colors } from "../utils/formatters";

echarts.use([TitleComponent, TooltipComponent, GridComponent, VisualMapComponent, ToolboxComponent, LineChart, CanvasRenderer]);

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
                data: values
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
            className="w-xl h-80 bg-white rounded-lg shadow-lg overflow-hidden my-2"
            style={{ minHeight: '320px' }}
        />
    );
};

export default Graphy;