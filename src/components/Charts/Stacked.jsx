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
  BarSeries
} from "@syncfusion/ej2-react-charts";

import {
  barCustomSeries,
  barCustomSeries2,
  barPrimaryXAxis,
  barPrimaryYAxis,
} from "../../data/dummy";
import { ChartsHeader } from "..";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import loader from "../../images/loader1.jpg"

const Bar2 = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();
  // const [lineSeries , setLineSeries] = useState(null)

  const BarData = async () => {
    const response = await axios.get(
      "http://3.95.219.100:8000/displayequipmentFailure"
    );
    console.log("apiResponse => ", response);
    
    return response;
  };
    
  useEffect(() => {
    BarData()
      .then((response) => {
        setBarData(response.data.values);
      })

      .catch((error) => console.log(error));
  }, []);

//   let data = [{ x: 'Jan', y: 50 }, { x: 'Feb', y: 57 }, { x: 'Mar', y: 48 }, { x: 'Apr', y: 60 },
// { x: 'May', y: 70 }, { x: 'Jun', y: 48 }];

  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
        <div className=" w-full">
        {barData ? (<ChartComponent
          primaryXAxis={{
            valueType: "Category",
            title: ""
          }}
          primaryYAxis={{
            title: ""
          }}
        >
          <Inject services={[BarSeries, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={barData} xName='x' yName='y' type='Bar'>
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>) : (
          <img style={{height: "50px"}} src={loader} alt="loader" />
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Bar2;
