
import React, {useEffect, useRef} from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, registerables } from "chart.js";

Chart.register(
    ...registerables
)
const Ratios = (value) => { //importing values from dashboard
    const chartRef = useRef()
    const propData = value.props

    useEffect(() => {
        console.log(propData)
        const ctx = chartRef.current.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 200, 0) //this creates the gradient background
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'green');

        //data for the graphs
        const data = {
            datasets: [{ //sets data and gradient
                data: [propData.lowPoint, propData.highPoint],
                backgroundColor: [gradient],
                borderColor: [gradient],
                hoverBorderColor: ['#fff'],
                needleValue: propData.value
            }]
        };
        //options for the graphs
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            rotation: 270,
            circumference: 180,
            cutout: 60,
            borderRadius: 1,
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    display: false        
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                title: {
                    display: true,
                    text: propData.label,
                    position: 'top',
                    font: {
                        size: 15
                    }
                }
            }   
        };
        //chart text
        const gaugeChartText = {
            id: 'gaugeChartText',
            afterDatasetsDraw(chart, args, options) {
                const { ctx, data, chartArea: { top, bottom, left, right, width, height } } = chart;

                ctx.save();
                const xCoor = chart.getDatasetMeta(0).data[0].x;
                const yCoor = chart.getDatasetMeta(0).data[0].y;

                ctx.font = '13px sans-serif';
                ctx.fillStyle = 'black';
                ctx.textBaseLine = 'top';

                ctx.textAlign = 'left';
                ctx.fillText(propData.lowPointText, left, yCoor+10)

                ctx.textAlign = 'right';
                ctx.fillText(propData.highPointText, right, yCoor+10)

                ctx.textAlign = 'center';
                ctx.font = '17px sans-serif';
                ctx.fillText(data.datasets[0].needleValue + '%', xCoor, yCoor+15)

                ctx.textAlign = 'center';
                ctx.font = '12px sans-serif';
                ctx.fillText(propData.subtitle, xCoor, yCoor - 130)
            }
        }
        //chart needle
        const gaugeNeedle = {
            id: 'guageNeedle',
            afterDatasetDraw(chart, args, options) {
                const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

                ctx.save();
                const dataTotal = data.datasets[0].data.reduce((a,b) => a + b,0);
                const needleValue = data.datasets[0].needleValue;
                let angle = Math.PI + (1 / dataTotal * needleValue * Math.PI)

                const cx = width/2;
                const cy = chart._metasets[0].data[0].y;
                //needle
                ctx.translate(cx,cy)
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(0,-2)
                ctx.lineTo(chart.chartArea.height - chart.chartArea.top,0);
                ctx.lineTo(0,2)
                ctx.fillStyle = 'black'
                ctx.fill();
                ctx.restore()
                //needle dot
                ctx.beginPath();
                ctx.arc(cx,cy,3,0,10)
                ctx.fill()
                ctx.restore();
            }
        }
        //chart rendering
        const chart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [gaugeChartText, gaugeNeedle]
        });

        //chart.data.datasets[0].data[0] = value;
        chart.update()

        return () => {
            chart.destroy();
        }
    }, [propData]);

    
    
    return (
        <div style={{ 'backgroundColor': 'white','width': 200, 'height': 200, 'padding': 10}}>
                <canvas ref={chartRef}></canvas>
        </div>
    )

};

export default Ratios
