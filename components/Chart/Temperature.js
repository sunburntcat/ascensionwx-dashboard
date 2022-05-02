import { useState } from 'react';
import dynamic from 'next/dynamic';
import {conversion} from '../../lib/api'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function Temperature(props) {

  const [celcius, setCelcius] = useState(true);
   
  var tmp = JSON.parse(props.values)
  
  var options = {
      chart: {
      height: 350,
      type: 'area',
      zoom: {
        type: "x",
        enabled: true,
      },
    },    
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1]
    },
    labels: tmp.times,
    xaxis: {
      type: 'Datetime'
    },
    yaxis: [{
      title: {
        text: celcius? "Temperature  (°C)" : "Temperature (°F)",
      },
      labels: {
        formatter: function (val) {
          if (data === undefined || data.length === 0)
          return 
        else
          return val
        }
      }
    }
  ],
    fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
    }
    }

    // Converted value to Fahrenheit unit
    var series_fah = conversion(tmp.temperature)
  
    var series = [{
      name: 'Temperature',
      type: 'area',
      data: celcius ? tmp.temperature : series_fah
    }]
    
  
    return (
      <>
        <div>
          {/* <MDBBtn>to Fahrenheit</MDBBtn> */}
          <button className='' onClick={() => { setCelcius(!celcius)}}>
            {
              celcius ? "to Fahrenheit" : "to Celcius"
            }
          </button>
          <ApexCharts className="w-5/12" options={options} series={series} type="area"/>
        </div>   
      </>
    )
  }

  export default Temperature