import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
  ColumnSeries, 
  DateTimeCategory,
  Chart
} from "@syncfusion/ej2-react-charts";

import axios from "axios";
import { LinePrimaryXAxis, LinePrimaryYAxis } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { ChartsHeader, LineChart } from "../../components";
import loader from "../../images/loader1.jpg"

const Line = () => {
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();
  // const [lineSeries , setLineSeries] = useState(null)

  const LineData = async () => {
    const response = await axios.get(
      "http://3.95.219.100:8000/displayequipmentTicketOpen"
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
  }, []);
  const palette = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];
  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader category="Line" title="Distribution sur 30j du nb pannes" />
        <div className="w-full">
          <LineChart />
        </div>
      </div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader category="Line" title="Distribution sur 30j du nb pannes" />
        <div className="w-full">
          <div>
            {lineData ? (
              <ChartComponent
                height="420px"
                primaryXAxis={LinePrimaryXAxis}
                primaryYAxis={LinePrimaryYAxis}
                palettes={palette}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background={currentMode === "Dark" ? "#33373E" : "#fff"}
                legendSettings={{ background: "white" }}
              >
                <Inject services={[LineSeries, DateTime, Legend, Tooltip, ColumnSeries, DateTimeCategory]} />
                <SeriesCollectionDirective>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  {lineData.map((item, index) => (
                    <SeriesDirective key={index} {...item} />
                  ))}
                  {console.log(lineData)}
                </SeriesCollectionDirective>
              </ChartComponent>
            ) : (
              <img style={{height: "50px"}} src={loader} alt="loader" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Line;
