import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import Modal from './ModalT';
import { useState } from 'react';

function Winddir(props) {
    var tmp = props.values
    const [show, setShow] = useState(false)

    var series = [{
      name: 'Winddir',
      //type: 'scatter',
      data: tmp.winddir
    }]


    var options = {
      chart: {
      type: 'scatter',
      zoom: {
        type: "xy",
        enabled: true,
      },
    },
    title: { text: "Wind Direction", align: 'center' },
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
        text: 'Wind Direction (degrees)',
      },
      labels: {
        formatter: function (val) {
            if (series[0].data === undefined || series[0].data.length === 0)
            return
          else
            return (val).toFixed(0)
        },
      },
      min: 0,
      max: 360
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
            <ApexCharts width="100%" options={options} series={series} type="scatter"/>
        </div>
        {
          show ?
          <Modal setShow={setShow} data={props.values} name={"Winddir"}/>
          :
          <></>
        }
      </div>

    )

  }

  export default Winddir
                  
