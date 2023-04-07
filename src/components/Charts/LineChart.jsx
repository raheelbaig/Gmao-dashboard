import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  DateTimeCategory,
  ColumnSeries,
  Chart, 
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import { LinePrimaryXAxis, LinePrimaryYAxis, lineCustomSeries } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import loader from "../../images/loader1.jpg"

const LineChart = () => {
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();
  // const [lineSeries , setLineSeries] = useState(null)

  const LineData = async () => {
    const response = await axios.get(
      "http://3.95.219.100:8000/displaysensorTicketOpen"
    );
    console.log("apiResponse => ", response);
    return response;
  };
  useEffect(() => {
    LineData()
      .then((response) => {
        const data = [
          {
            dataSource: response.data[0],
            xName: "x",
            yName: "y",
            name: "Close",
            width: "2",
            marker: { visible: true, width: 10, height: 10 },
            type: "Line",
          },

          {
            dataSource: response.data[1],
            xName: "x",
            yName: "y",
            name: "Open",
            width: "2",
            marker: { visible: true, width: 10, height: 10 },
            type: "Line",
          },
        ];

        setLineData(data);

        console.log(response.data[0]);
        console.log(response.data[1]);
      })

      .catch((error) => console.log(error));
      return () => {
        setLineData({}); // This worked for me
      };
  }, []);

  
  const palette = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];
  return (
    <div>
      {lineData ? (
        <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      palettes={palette}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip, ColumnSeries, DateTimeCategory]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineData.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
      ) : (
        <img style={{height: "50px"}} src={loader} alt="loader" />
      )}
    </div>
  );
};

export default LineChart;
