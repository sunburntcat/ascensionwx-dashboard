import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import Modal from './ModalT';
import { useState } from 'react';

function Rain(props) {
    var tmp = props.values
    const [show, setShow] = useState(false)

    var series = [{
      name: 'Rain',
      type: 'bar',
      data: tmp.rain
    }]

    var options = {
      chart: {
      type: 'bar',
      zoom: {
        type: "x",
        enabled: true,
      },
    },
    title: { text: "Rain", align: 'center' },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1]
    },
    labels: tmp.times,
    xaxis: {
      type: 'datetime'
    },
    yaxis: [{
      title: {
        text: 'Hourly Rain (mm)',
      },
      labels: {
        formatter: function (val) {
            if (series[0].data === undefined || series[0].data.length === 0)
            return
          else
            return (val).toFixed(2)
        },
      }
    }
  ],
    legend: {
      show: false
    }
}

    
    return (
      <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
          <div className='m-2'>
          <button className='ml-10 mt-10 border border-gray-200 hover:border-gray-400 rounded w-28 text-sm' onClick={() => { setShow(true) }}>
              {
                "Full view"
              }
            </button>
            <ApexCharts width="100%" options={options} series={series} type="area"/>
        </div>
        {
          show ?
          <Modal setShow={setShow} data={props.values} name={"Rain"}/>
          :
          <></>
        }
      </div>

    )

  }

  export default Rain
                       
