import { useState } from "react"
import Waiting from "../components/Waiting"
import Temperature from "../components/Chart/Temperature"
import Humidity from "../components/Chart/Humidity"
import Pressure from "../components/Chart/Pressure"
import Voltage from "../components/Chart/Voltage"
import Rain from "../components/Chart/Rain"
import Light from "../components/Chart/Light"
import Windspd from "../components/Chart/Windspd"
import Winddir from "../components/Chart/Winddir"
import Dashboard from "../components/Dashboard"
import SensorCard from "../components/View/SensorCard"
import { getActions, getTableEntry, checkCurrentGMT, compare, getData, diff_days } from "../lib/api"

import { useRouter } from 'next/router'

function diff_(d) {
  const today = new Date();
  d = new Date(d);
  const days = parseInt((today - d) / (1000 * 60 * 60 * 24));
  const hours = parseInt(Math.abs(today - d) / (1000 * 60 * 60) % 24);
  const minutes = parseInt(Math.abs(today.getTime() - d.getTime()) / (1000 * 60) % 60);
  const seconds = parseInt(Math.abs(today.getTime() - d.getTime()) / (1000) % 60); 

  console.log("─────────────────────")
  if(days == 0) {
    if(hours == 0) {
      console.log("minutes: "+ minutes)
      return minutes + " minute(s) ago"
    }else{
      console.log("hours: "+ hours)
      return hours + " hours(s) ago"
    }
    
  } else {
    console.log("days: "+ days)
    return days + " day(s) ago"
  }
}


export default function Graph(props) {
    const json_sensor = JSON.parse(props.sensor)
    const json_data = JSON.parse(props.data)
    
    
    var tmp = json_data     //{temperature:[],humidity:[],pressure:[],times:[]}
    var date = new Date(json_sensor.responseSensor.time_created * 1000)
    var st_date = new Date(json_sensor.responseWeather.unix_time_s * 1000)
    
    /*
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let requested_sensor = params.sensor;
    
    const urlParams = new URLSearchParams(window.location.search);
    let requested_sensor = urlParams.get('sensor');
  
    */
    
    const router = useRouter();
    const {devname} = router.query
    let requested_sensor = devname;
  
    if ( !requested_sensor ) {
      requested_sensor = 'brownlotguru'
    }

    let minerValue = ""
    if ( json_sensor.responseMiner.evm_send_enabled ) {
      minerValue = json_sensor.responseMiner.evm_address_str
    } else {
      minerValue = json_sensor.responseRewards.miner
    }

    let last_day_pay = "0.00"
    let now = new Date()
    let time_24_hrs_ago = now - (1000*3600*24)
    let last_miner_payout = Number( json_sensor.responseRewards.last_miner_payout )*1000
    if( last_miner_payout > time_24_hrs_ago )
      last_day_pay = json_sensor.responseMiner.previous_day_pay_usd
          
    var sensor_info = {
      time_created: date.toISOString(),
      status: diff_days(st_date),
      devname: requested_sensor,
      sensor_type: json_sensor.responseSensor.station_type,
      msg_type: json_sensor.responseSensor.message_type,
      la: json_sensor.responseWeather.la,
      lo: json_sensor.responseWeather.lo,
      miner: minerValue,
      last_pay: last_day_pay,
      last_temp: json_sensor.responseWeather.last_temp,
      last_hum: json_sensor.responseWeather.last_hum,
      last_press: json_sensor.responseWeather.last_press,
      last_update: diff_(json_sensor.responseWeather.unix_time_s * 1000)
    }

    ////////// STATES ///////////////
    const [series, setSeries] = useState(tmp)
    const [sensor, setSensor] = useState(requested_sensor)
    const [sensorInfo, setSensorInfo] = useState(sensor_info)
    const [prior, setPrior] = useState(0)
    const [plot, setPlot] = useState("Plot")
    const [loader, setLoader] = useState(false)
    const [errorPrior, setErrorPrior] = useState('')
    const [errorSensor, setErrorSensor] = useState('')
    ////////////////////////////////

    //--------- Handlers -------------
    //////////////////////////////
    // SENSOR ////////////////////
    const handleSensor = (e) => {
      setSensor(e.target.value)
      setErrorSensor('')
    }
    //////////////////////////////
    // PRIOR /////////////////////
    const handlePrior = (e) => {
      setPrior(e.target.value)
      var _ = e.target.value
      
      if (_.match(/^[0-9]+$/) != null ) {
        setErrorPrior("")
      }else if(e.target.value == ""){
        setErrorPrior("")
      }else{
        setErrorPrior('**You should enter a digit')
      }
    }
    //////////////////////////////
    // CLICK /////////////////////
    const handleClick = async (e) => {

      if(!sensor) {
        setErrorSensor("You should provide a devname")
      }else{
        setPlot("loading...")
        setLoader(true)
        const template = {sensor:sensor,before:prior}

        const pulled = await puller(template)
        const json_sensor = await getSensorData(template.sensor)
        console.log(json_sensor.responseSensor.devname)

	let minerValue = ""
        if ( json_sensor.responseMiner.evm_send_enabled ) {
          minerValue = json_sensor.responseMiner.evm_address_str
        } else {
          minerValue = json_sensor.responseRewards.miner
        }

        let last_day_pay = "0.00"
        let now = new Date()
        let time_24_hrs_ago = now - (1000*3600*24)
        let last_miner_payout = Number( json_sensor.responseRewards.last_miner_payout )*1000
        if( last_miner_payout > time_24_hrs_ago )
            last_day_pay = json_sensor.responseMiner.previous_day_pay_usd

          
        setSeries(pulled.props.data)
        if(json_sensor.responseSensor.devname != undefined){
            const _info = {
              time_created: (new Date(json_sensor.responseSensor.time_created *1000)).toISOString(),
              status: diff_days(new Date(json_sensor.responseWeather.unix_time_s*1000)),
              devname: sensor,
	      sensor_type: json_sensor.responseSensor.station_type,
	      msg_type: json_sensor.responseSensor.message_type,
              la: json_sensor.responseWeather.la,
              lo: json_sensor.responseWeather.lo,
              miner: minerValue, 
              last_pay: last_day_pay, 
              last_temp: json_sensor.responseWeather.last_temp,
              last_hum: json_sensor.responseWeather.last_hum,
              last_press: json_sensor.responseWeather.last_press,
              last_update: diff_(json_sensor.responseWeather.unix_time_s * 1000)
          }
          setSensorInfo(_info)
        }else{
            const _empty = {
              time_created: "",
              status: "",
              devname: "--",
              sensor_type: "--",
              msg_type: "--",
              la: "",
              lo: "",
              miner: "",
              last_temp: "--",
              last_hum: "--",
              last_press: "--",
              last_update: ""
          }
          setSensorInfo(_empty)
        }
        setPlot("Plot")
        setLoader(false)
        
        
      }
    }
    
    /////////////////////////////////

    let hidden_volt_str = "hidden"
    if( sensorInfo.sensor_type === "ascension3dp" )
          hidden_volt_str = ""

    let hidden_rain_str = "hidden"
    if( sensorInfo.msg_type.includes("rain") )
          hidden_rain_str = ""

    let hidden_solar_str = "hidden"
    if( sensorInfo.msg_type.includes("solar") )
          hidden_solar_str = ""

    let hidden_wind_str = "hidden"
    if( sensorInfo.msg_type.includes("wind") )
          hidden_wind_str = ""

    return (
        <>
          <Dashboard className="sticky">
            <div className="justify-end max-w-7xl md:mx-auto flex mt-14">
                <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2" >
                    Station
                    </label>
                    <input onChange={handleSensor} defaultValue={sensor? sensor : ""} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline hover:border-purple-500" id="sensor" type="text" placeholder="_devname" />
                    <p className="block text-red-400 text-sm font-bold mb-2">{errorSensor}</p>
                </div>
                <div className="md:ml-5 sm:ml-5 md:py-0">
		    <label className="block text-violet-400 text-sm font-bold mb-2" > . </label>
                    <button onClick={handleClick} className="appearance-none border rounded py-2 px-3 text-white bg-[#C416EC] text-sm font-bold leading-tight focus:outline-none shadow-md w-40 hover:bg-purple-600 duration-300" name="click">
                        {plot}
                    </button>
                </div>
            </div>
            
            {/* ------------------------- */}
            <hr className="mt-3"/>

            {/* ------------------------- */}
            <div className="mt-5">
              {
                loader ? 
                  <div className="mt-28">
                    <Waiting />
                    <p className=" mt-10 text-center text-gray-500 font-medium text-xl">
                        Data are pulling from Telos blockchain
                    </p>
                  </div>
                  :
                  <div className="">
                    <div className="m-1 grid gap-4 grid-cols-1">
                      <SensorCard sensor={sensorInfo} />
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-1">
                      <Temperature values={series} />
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-1">
                      <Humidity values={series} />
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-1">
                        <Pressure values={series} />
                    </div>
                    <div className={hidden_volt_str + " m-1 grid gap-4 grid-cols-1"}>
                      <Voltage values={series} />
                    </div>
                    <div className={hidden_rain_str + " m-1 grid gap-4 grid-cols-1"}>
                      <Rain values={series} />
                    </div>
                    <div className={hidden_solar_str + " m-1 grid gap-4 grid-cols-1"}>
                      <Light values={series} />
                    </div>
                    <div className={hidden_wind_str + " m-1 grid gap-4 grid-cols-1"}>
                      <Windspd values={series} />
                    </div>
                    <div className={hidden_wind_str + " m-1 grid gap-4 grid-cols-1"}>
                      <Winddir values={series} />
                    </div>
                  </div>
              }
            </div>
            <br/>

          </Dashboard>
      
        </>            
    )
}


export async function getServerSideProps(context) {
  
  let requested_sensor = context.query.devname;
  
  if ( !requested_sensor ) {
      requested_sensor = 'brownlotguru'
  }
  
  const ctx = {
    sensor: requested_sensor, //dxujgds3gkzy nxik2maqfxop
  }

  const template = {sensor:ctx.sensor,before:5}
  // var predata

  const res = await puller(template)

  const sensor = await getSensorData(ctx.sensor)


  return {
    props: {
      sensor: JSON.stringify(sensor),
      data: JSON.stringify(res.props.data)

    }
  }
}

async function getSensorData(devname){

  var response = await getTableEntry( devname, "weather" )
  var res = response.rows[0]
  var resWeather = {
    unix_time_s: res.unix_time_s,
    la: res.latitude_deg,
    lo: res.longitude_deg,
    last_temp: res.temperature_c,
    last_hum: res.humidity_percent,
    last_press: res.pressure_hpa,
  }

  response = await getTableEntry( devname, "sensorsv3" )
  res = response.rows[0]
  var resSensor = {    
    time_created: res.time_created,
    devname: res.devname,
    station_type: res.station_type,
    message_type: res.message_type,
  }

  response = await getTableEntry( devname, "rewardsv2" )
  res = response.rows[0]
  let miner = res.miner
  var resRewards = {
    devname: res.devname,
    miner: res.miner,
    last_miner_payout: res.last_miner_payout,
  }

  response = await getTableEntry( miner, "minersv2" )
  res = response.rows[0]
  var resMiner = {
    miner: res.miner,
    evm_address_str: res.evm_address_str,
    evm_send_enabled: res.evm_send_enabled,
    previous_day_pay_usd: res.previous_day_pay_usd
  }

  return {
      responseWeather: resWeather,
      responseSensor: resSensor,
      responseRewards: resRewards,
      responseMiner: resMiner
  }
}

// the puller data
async function puller(context) {

  // get the start time and the name of the device sensor
  let d = new Date();
  
  
  ///////////////////////////// pre config ////////////////////////////
  const _devname = context.sensor
  var _before = context.before
  if(!_before) _before = 5
  
  d.setDate(d.getDate() - _before)
  
  // set the day to [today - 'before' days] in iso format
  let start = d.toISOString()

  // check GMT index time to different zone
  var val = new Date().toString().match(/([-\+][0-9]+)\s/)[1] 
  var id = checkCurrentGMT(val)

    start = d.toISOString()

  /////////////////////////////


 
  // get the response data
  const res = await getActions( start, _devname )

  // parse into json format
  const json = await res.json()
  const _actions = json.actions

  const parsed = getData(_actions, _devname)

  const _data = JSON.stringify(parsed)

  let is_data_collected = false

  ////////////////////// check result of _data ////////////////////////////////////////
  let existing_sensor = false
  if(_data == JSON.stringify({temperature:[],humidity:[],pressure:[],voltage:[],times:[]})){
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

    }
  }
  //////////////////////////////////////////////


  return {
    props: {
      data: parsed || JSON.stringify({}), //_data
      existing_sensor,
      is_data_collected,

    }
  }
}
