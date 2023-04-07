import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import {
  barCustomSeries,
  barCustomSeries2,
  barPrimaryXAxis,
  barPrimaryYAxis,
} from "../../data/dummy";
import { ChartsHeader } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import Bar2 from "./Bar2";

const Bar = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();
  // const [lineSeries , setLineSeries] = useState(null)

  const BarData = async () => {
    const response = await axios.get(
      "http://3.95.219.100:8000/displaysensorgraphOne"
    );
    console.log("apiResponse => ", response);
    return response;
  };
  useEffect(() => {
    BarData()
      .then((response) => {
        const data = [
          {
            dataSource: response.data.values[0],
            xName: 'x',
            yName: 'y',
            name: 'Gold',
            type: 'Column',
            marker: {
              dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600', color: '#ffffff' },
              },
            },
          },
          {
            dataSource: response.data.values[1],
            xName: 'x',
            yName: 'y',
            name: 'Silver',
            type: 'Column',
            marker: {
              dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600', color: '#ffffff' },
              },
            },
          },
        ];

        setBarData(data);
        console.log(response.data.values[0]);
        console.log(response.data.values[1]);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
    
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
        <div className=" w-full">
        {barData ? (
          <ChartComponent
            primaryXAxis={barPrimaryXAxis}
            primaryYAxis={barPrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === "Dark" ? "#33373E" : "#fff"}
            legendSettings={{ background: "white" }}
          >
            <Inject
              services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
            />
            <SeriesCollectionDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {barData.map((item, index) => (
                <SeriesDirective key={index} {...item} />
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>) : (
            <h1>Please wait</h1>
          )}
        </div>
      </div>

    
      <Bar2 />

      
    </div>
  );
};

export default Bar;
