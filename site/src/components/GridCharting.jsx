import React, { useEffect, useState } from 'react';
import { useDate } from '../hooks/useDate';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";
import { Chart } from "react-google-charts";
import Loader, { LoadingArrowAnimation } from './loader';
import Error from './Error';
import ChartElement from './Chart';

const GridCharting = () => {
    const { initial, range } = useDate();
    const { getRequestHeaders } = useAuth();
    const [fromData, setFromData] = useState([]);
    const [toData, setToData] = useState([]);

    const fetchData = async (date, setterFunction) => {
        try {
            const headers = getRequestHeaders();

            const response = await axios.get(`/api/worker/symbol/stats/?date=${date}&page_size=37`, { headers });
            // console.log(response.data.results);
            setterFunction(response.data.results);

        } catch (error) {
            console.log(error);
        }
    }


    const getAllAttributeValues = (arr1, attr, arr2) => {
        if (arr1 && arr1.length > 0) {
            let output = [];

            let arr2Map = new Map();
            arr2.forEach(item => {
                arr2Map.set(item.symbol_code, item);
            });

            arr1.forEach(item => {
                let code = item.symbol_code;
                let value = item[attr];
                let value2Item = arr2Map.get(code);

                if (value2Item) {
                    let value2 = value2Item[attr];
                    output.push([code, value, value2]);
                }
            });

            output.unshift(["Symbol", initial, range]);
            //    console.log(output);
            return output;
        }
        return [["Symbol", initial, range]];
    }


    useEffect(() => {
        const fetchDataForInitial = async () => {
            await fetchData(initial, setFromData);
        };

        const fetchDataForRange = async () => {
            await fetchData(range, setToData);
        };

        fetchDataForInitial();
        fetchDataForRange();
    }, [initial, range]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full overflow-y-scroll">
            <div className="relative w-full h-full">
                {fromData.length > 0 && toData.length > 0 ? <ChartElement
                    title='High Price'
                    vAxisTitle='Vals.'
                    hAxisTitle='Stock Performance'
                    loader={<LoadingArrowAnimation />}
                    type='AreaChart'
                    data={getAllAttributeValues(fromData, 'high', toData)}
                /> : <Error />}
            </div>
            <div className="relative w-full h-full">
                {fromData.length > 0 && toData.length > 0 ? <ChartElement
                    title='Low Price'
                    vAxisTitle='Vals.'
                    hAxisTitle='Stock Performance'
                    loader={<LoadingArrowAnimation />}
                    type='AreaChart'
                    data={getAllAttributeValues(fromData, 'low', toData)}
                /> : <Error />}
            </div>
            <div className="relative w-full h-full">
                {fromData.length > 0 && toData.length > 0 ? <ChartElement
                    title='Last Day Close Price'
                    vAxisTitle='Vals.'
                    hAxisTitle='Stock Performance'
                    loader={<LoadingArrowAnimation />}
                    type='AreaChart'
                    data={getAllAttributeValues(fromData, 'lcdp', toData)}
                /> : <Error />}
            </div>
            <div className="relative w-full h-full">
                {fromData.length > 0 && toData.length > 0 ? <ChartElement
                    title='Performance Comparison'
                    vAxisTitle='Vals.'
                    hAxisTitle='Stock Performance'
                    loader={<LoadingArrowAnimation />}
                    type='Histogram'
                    data={getAllAttributeValues(fromData, 'high', toData)}
                /> : <Error />}
            </div>
        </div>
    )
}


export default GridCharting;