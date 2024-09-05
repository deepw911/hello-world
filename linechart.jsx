import React from "react";
import GetMonthDays from "./GetMonthDays";
import { AgChartsReact } from "ag-charts-react";
import lineChartData from "./lineChartData.json";

const LineChart = () => {
  const monthArray = GetMonthDays(6, 2024);

  function processData(data) {
    const groupedData = data.reduce((acc, item) => {
      const key = `${item.app}-${item.pool}`;
      if (!acc[key]) {
        acc[key] = {
          app: item.app,
          pool: item.pool,
          errorDetails: []
        };
      }
  
      const existingEntry = acc[key].errorDetails.find(entry => entry.key === item.date);
      if (existingEntry) {
        existingEntry.totalNumber += item.totalNumber;
        existingEntry.value += item.value;
        existingEntry.requests += item.requests;
      } else {
        acc[key].errorDetails.push({
          key: item.date,
          totalNumber: item.totalNumber,
          value: item.value,
          requests: item.requests
        });
      }
  
      return acc;
    }, {});
  
    // Sort the errorDetails array for each group by date
    Object.values(groupedData).forEach(group => {
      group.errorDetails.sort((a, b) => new Date(a.key) - new Date(b.key));
    });
  
    return Object.values(groupedData);
  }



  const processedData = processData(lineChartData);
  console.log("processedData: ",processedData);
  const chartOptions = {
    height: 400, // Set chart height
    autoSize: true, // Adjust chart size to fit container
    data: [],
    series: [
      {
        type: "line",
        direction: "horizontal",
        xKey: "key",
        yKey: "totalNumber",
      },
      {
        type: "line",
        direction: "horizontal",
        xKey: "key",
        yKey: "value",
      },
      {
        type: "line",
        direction: "horizontal",
        xKey: "key",
        yKey: "requests",
      },
    ],
  };



  

//   console.log("chartOptions: ", chartOptions);
  console.log("chartData: ", lineChartData);
  return (
    <div>
      <h1>Line Chart</h1>
      <div></div>
      {processedData.map((item, index) => {
        
        return(
          <div>
          <h3>{item.pool}</h3>
          <AgChartsReact options={{...chartOptions,data:processedData[index].errorDetails}} />
        </div>
        )
      })}
      
    </div>
  );
};

export default LineChart;
