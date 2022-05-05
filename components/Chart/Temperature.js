import { useState } from 'react';
import dynamic from 'next/dynamic';
import {conversion} from '../../lib/api'
import Modal from './ModalT';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function Temperature(props) {

  const [celcius, setCelcius] = useState(true);
  const [show, setShow] = useState(false)
   
  var tmp = props.values //JSON.parse(props.values)
  
  var options = {
      chart: {
      // height: 350,
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
          if (series.data === undefined || series.data.length === 0)
          return 
        else
          return (val).toFixed(2)
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
      <div className='rounded overflow-hidden shadow-lg bg-white'>
        <div>
          <button className='ml-10 mt-5 border border-gray-200 hover:border-gray-400 bg-gray-200 rounded w-28 text-sm text-gray-700' onClick={() => { setCelcius(!celcius)}}>
            {
              celcius ? "to Fahrenheit" : "to Celcius"
            }
          </button>
          <button className='ml-1 border border-gray-200 hover:border-gray-400 rounded w-28 text-sm' onClick={() => setShow(true)}>
            {
              "Full view"
            }
          </button>
          <ApexCharts width="200%" options={options} series={series} type="area"/>
        </div>
        {
          show ?
          <Modal setShow={setShow} data={props.values} name={"Temperature"}/>
          :
          <></>
        }
      </div>
    )
  }

  export default Temperature