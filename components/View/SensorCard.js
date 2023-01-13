import {conversion} from '../../lib/api'

export default function SensorCard(props) {

    let temperature = Number(props.sensor.last_temp).toFixed(1);
    let temperature_f = (Number(props.sensor.last_temp) * 1.8 + 32).toFixed(1);
    let humidity = Number(props.sensor.last_hum).toFixed(0);
    let pressure = Number(props.sensor.last_press).toFixed(2);

    let latitude = Number(props.sensor.la).toFixed(2);
    let longitude = Number(props.sensor.lo).toFixed(2);
    let fullLocation = ""
    if ( latitude > 0 ) fullLocation += latitude + "°N , "
    else fullLocation += Math.abs(latitude) + "°S , "
    if ( longitude > 0 ) fullLocation += longitude + "°E"
    else fullLocation += Math.abs(longitude) + "°W"

    let last_pay = Number(props.sensor.last_pay).toFixed(2);

    return (
      <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
        <div className=''>
            <div className="p-8 ml-1">
                <h5 className="mt-1 mb-4 text-xl font-medium text-[#8C01AA]"> Sensor Information</h5>
                <div className="flex items-baseline text-gray-700">
                    <span className="ml-0 text-xl font-normal text-gray-500 ">Devname:</span>
                    <span className="ml-2 text-3xl font-semibold">
                        {
                            props.sensor.devname
                        }
                    </span>
                </div>
                <ul role="list" className="my-7 space-y-2 ml-0">
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-purple-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {
                            <span className="text-base font-normal leading-tight text-gray-500"> 
                                Status : 
                                {
                                    props.sensor.status == "ACTIVE" ?
                                    (
                                        <span className="text-base font-semibold leading-tight text-green-400"> 
                                            {" "}{props.sensor.status} <font color="black">({props.sensor.last_update})</font>
                                        </span>
                                    )
                                    :
                                    (
                                        <span className="text-base font-semibold leading-tight text-red-400"> 
                                            {" "} {props.sensor.status} <font color="black">({props.sensor.last_update})</font>
                                        </span>
                                    )
                                }
                            </span>
                            
                        }

                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-400">Location: {fullLocation}</span>
                    </li>
                    <li className="flex space-x-3">
                        <img src="thermometer.png" width="20" height="20"/>
                        <span className="text-base font-normal leading-tight text-gray-500">Latest Temperature: {temperature}°C/{temperature_f}°F</span>
                    </li>
                    <li className="flex space-x-3">
                        <img src="humidity.jpg" width="20" height="20"/>
                        <span className="text-base font-normal leading-tight text-gray-500">Latest Humidity: {humidity}%</span>
                    </li>
                    <li className="flex space-x-3">
                        <img src="pressure.jpg" width="20" height="20"/>
                        <span className="text-base font-normal leading-tight text-gray-500">Latest Pressure: {pressure} hpa</span>
                    </li>
                </ul>
                <ul role="list" className="my-7 space-y-2 ml-1">
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500">Miner: {props.sensor.miner}</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500">Latest Miner Pay (all sensors): {last_pay} USD</span>
                    </li>
                </ul>
                {/* <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button> */}
            </div>
        </div>
           
      </div>
      
    )
  
  }

  
