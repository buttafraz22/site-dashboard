import { Chart } from "react-google-charts";

/**
 * 
 * @param {*} type The type of the Chart to be displayed. Examples are
 * LineChart, AreaChart etc.
 * @param {*} data The data to be displayed. Validation and formatting of
 * data is at own risk.
 * @param {*} title The title of the Chart.
 * @param {*} hAxisTitle The text at the horizontal Axis of the Chart.
 * @param {*} vAxisTitle The title at the vertical axis of the Chart.
 * @returns 
 */


const ChartElement = ({ 
    type,
    data,
    loader,
    title='',
    hAxisTitle='',
    vAxisTitle='',
    chartOptions={}
 }) => {

    const defaultOptions = {
        title: title,
        vAxis: { minValue: 0, title: {vAxisTitle} },
        hAxis: { title: hAxisTitle },
        legend: { position: "top" },
        backgroundColor: { fill:'transparent' }
    };
    const mergedOptions = { ...defaultOptions, ...chartOptions };

    return(
        <Chart
            chartType={type}
            data={data}
            options={mergedOptions}
            loader={loader}
        />
    );
}

export default ChartElement;