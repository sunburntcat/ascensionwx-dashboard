import { useState } from "react"
import Temperature from "../components/Chart/Temperature"
import Dashboard from "../components/Dashboard"
import { getActions, checkCurrentGMT, compare, getData } from "../lib/api"

const navigation = [
    { name: 'Overview', href: '/' },
    { name: 'Graph', href: '/graph' },
    { name: 'Map', href: '/map' },
  ]


export default function Graph(props) {

    ////////// STATES ///////////////
    const [temp, setTemp] = useState([])
    const [sensor, setSensor] = useState('')
    const [prio, setPrior] = useState(0)
    const [errorPrior, setErrorPrior] = useState('')
    const [errorSensor, setErrorSensor] = useState('')
    ////////////////////////////////

    ////////// Handlers /////////////
    const handleSensor = (e) => {
      setSensor(e.target.value)
    }
    const handlePrior = (e) => {
      setPrior(e.target.value)
      var _ = e.target.value
      
      if (_.match(/^[0-9]+$/) != null ) {
        setErrorPrior("")
        console.log(sensor, prio, errorPrior)
      }else if(e.target.value == ""){
        setErrorPrior("")
      }else{
        setErrorPrior('**You should enter a digit')
      }
      
      
    }
    

    /////////////////////////////////


    return (
        <>
          <Dashboard className="sticky">
            <div className=" max-w-7xl md:mx-auto flex mt-14">
                <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2" >
                    Sensor *
                    </label>
                    <input onChange={handleSensor} defaultValue={sensor? sensor : ""} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="sensor" type="text" placeholder="_devname" />
                    <p className="block text-red-400 text-sm font-bold mb-2">{errorSensor}</p>
                </div>
                <div className="md:ml-5 sm:ml-2">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >
                    Prior number of day
                    </label>
                    <input onChange={handlePrior} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="digit" type="text" placeholder="_number" />
                    <p className="block text-red-400 text-sm font-bold mb-2">{errorPrior}</p>
                </div>
                <div className="md:ml-5 sm:ml-5 md:py-0 sm:py-20 sm:py-20">
                    <label className="block text-violet-400 text-sm font-bold mb-2" >
                    * must be provided
                    </label>
                    <button className="shadow appearance-none border rounded py-2 px-3 text-white bg-[#C416EC] text-sm font-bold leading-tight focus:outline-none focus:shadow-outline w-40">
                        Plot
                    </button>
                </div>
            </div>
            
            {/* ------------------------- */}
            <hr className="mt-12"/>

            {/* ------------------------- */}
            <div className="bg-blue-400">
              {

                temp ??
                (
                  <Temperature values={temp} />
                )
              }
            </div>

          </Dashboard>
            
 
            
            

            
            
        </>            
    )
}


// the puller data
async function puller(context) {
  // get the start time and the name of the device sensor
  let d = new Date();
    
  // let start = "2022-03-10T09:38:42.500Z";
  
  const _devname = context.query.sensor
  var _before = context.query.before

  /////////////////////////////
  if(!_before) _before = 5
  /////////////////////////////

  d.setDate(d.getDate() - _before)
  
  // set the day to today - 'before' days
  let start = d.toISOString()
 
  // get the response data
  const res = await getActions( start )

  // check GMT index time to different zone
  var val = new Date().toString().match(/([-\+][0-9]+)\s/)[1] 
  var id = checkCurrentGMT(val)
  if (id == 0 ){
    // add 1hour to the server time
    d.setHours( d.getHours() + 1 )
    start = d.toISOString()
  }
  if (id == 1){
    // keep time
  }

  // parse into json format
  const json = await res.json()
  const _actions = json.actions

  const parsed = getData(_actions, _devname)

  const _data = JSON.stringify(parsed)

  let is_data_collected = false

  // check result of _data
  let existing_sensor = false
  if(_data == JSON.stringify({temperature:[],humidity:[],times:[]})){
    existing_sensor = false
  }else{
    existing_sensor = true

    // is data collected statement ?
    const size = parsed.times.length

    if(size == 0){
      is_data_collected = false
    }else{
      const from = parsed.times[size-1]
      const day_threshold = start
      is_data_collected = compare(from, day_threshold)
      // console.log(from, day_threshold)
    }
  }

  // console.log(is_data_collected, existing_sensor)
  return {
    props: {
      data: _data || JSON.stringify({}),
      existing_sensor,
      is_data_collected,

    }
  }
}