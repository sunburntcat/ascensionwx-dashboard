import {conversion} from '../../lib/api'

export default function AodNorthAfrica(props) {

    //let temperature = Number(props.sensor.last_temp).toFixed(1);

    return (
      <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
        <div className=''>
            <div className="justify-evenly p-8 ml-0">
                Aerosol Dust Forecast
                <iframe src="https://charts-dev.ecmwf.int/catalogue/embed/cams/aerosol-forecasts?base_time=202402040000&layer_name=composition_duaod550&player_dimension=valid_time&projection=classical_northern_africa&valid_time=202402040000"
                        height="400"
                        width="600"
                        align="middle"
                        title="Aerosol Dust Forecast">
                </iframe>
            </div>
        </div>
           
      </div>
      
    )
  
  }

  
