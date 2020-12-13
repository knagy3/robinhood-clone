import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { key, options } from "./api";
import axios from "axios";
import moment from 'moment'
import "./LineGraph.css"
import { useStateValue } from './StateProvider';

//const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";



function LineGraph() {
  const [data, setData] = useState({});
  //const [stocksData, setStocksData] = useState([]);
  const [{choosedDate, choosedShare}, dispatch] = useStateValue();
  //const [choosedDate, dispatch] = useStateValue();

  const getDateUnix = (date) => {
    let displayDate = {}
    let today = moment().format('MM/DD/YYYY, hh:mm:ss a');

    switch (date) {
      case "D":
        displayDate = {
          from:  moment(moment().subtract(1, 'days').calendar()).unix(),
          to:  moment(today).unix()
        };
        break;
      case "W":
        displayDate = {
          from:  moment(moment().subtract(7, 'days').calendar()).unix(),
          to:  moment(today).unix()
        };
        break;
      case "M":
        displayDate = {
          from:  moment(moment().subtract(1, 'months').calendar()).unix(),
          to:  moment(today).unix()
        };
        break;
      case "Y":
        displayDate = {
          from:  moment(moment().subtract(11, 'months').calendar()).unix(),
          to:  moment(today).unix()
        };
        break;
      default:
        displayDate = {
          from:  moment(moment().startOf('day').format('MM/DD/YYYY, hh:mm:ss a')).unix(),
          to:  moment(today).unix()
        };
        break;
    }
    return displayDate;
  };

  const getStocksData = (stock) => {
    let resolution = null;
    choosedDate.choosedDate == "Y" ? resolution = "D" : resolution = "15";
    const displayDate = getDateUnix(choosedDate.choosedDate);
    console.log(stock, displayDate);
    const BASE_URL = `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=${resolution}&from=${displayDate.from}&to=${displayDate.to}`;
    const KEY_URL = `&token=${key}`;

    return axios
    .get(`${BASE_URL}${KEY_URL}`)
    .catch((error) => {
        console.error("Error", error.message);
    });
  };

  const buildChartData = (stocksData) => {
    let chartData = [];
    for (let i in stocksData[0].t) {
      let formatted = moment.unix(stocksData[0].t[i]).format('MM/DD/YYYY, hh:mm:ss a');
      let newDateObject = {
        x: formatted,
        y: stocksData[0].c[i]
      };
      chartData.push(newDateObject);
    };
    return chartData;
  };

  useEffect(() => {
    let testData = [];
    let promises = [];

    promises.push(
      getStocksData(choosedShare)
      .then((res) => {
        console.log(res);
        testData.push({
          name: choosedShare,
          ...res?.data
        });
      })
    );
    Promise.all(promises).then(() => {
      let chartData = buildChartData(testData);
      setData(chartData);
    })
  }, [choosedDate, choosedShare]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                type: 'line',
                backgroundColor: "black",
                borderColor: "#5AC53B",
                borderWidth: 2,
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBackgroundColor: '#5AC53B',
                pointHoverBorderColor: '#000000',
                pointHoverBorderWidth: 4,
                pointHoverRadius: 6,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
