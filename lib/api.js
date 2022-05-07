import { data } from "autoprefixer";
import { account, actionName, history_endpoint, limit } from "./constant"

export async function getActions( begin_time_iso_date ) {
    let url = history_endpoint + "/v2/history/get_actions?"
        +"account="+account
        +"&act.name="+actionName
        +"&after="+begin_time_iso_date
        +"&limit="+limit;

    const fetchPromise = fetch(url);

    return fetchPromise

}

// get all the timeseries & data related to timeseries inside the json response
export function getData(bunk, devname) {
    let _temperature = []
    let _humidity = []
    let _pressure = []
    let _times = []
    let i = 0
    let d = {}
    for(let row of bunk){
      if(row.act.data.devname == devname) {
        _temperature.push(row.act.data.temperature_c)
        _humidity.push(row.act.data.humidity_percent)
        _pressure.push(row.act.data.pressure_hpa)
        _times.push(new Date(row.timestamp).toISOString())

        if(i<1){
          d = {
            block: row.block_num,
            trx: row.trx_id,
            devname: row.act.data.devname,
            producer: row.producer,
            receiver: row.block_num,
          }
        }
        i = i+1
      }
    }
  
    return {
      temperature: _temperature,
      humidity: _humidity,
      pressure: _pressure,
      times: _times,
      sensor: d
    }
  }


  // convert from celcius to fah value
  export function conversion(list) {
    var converted = []
    for (let i of list) {
      converted.push((i * 1.8 + 32).toFixed(2))
    }
    return converted
  }

  // compare the last date in the collected timeseries and the day_threshold(default is 5)
  export function compare(date1, date2) {
    return date1 <= date2;
  } 

  // check gmt index
  export function checkCurrentGMT(formated_date) {
    // var sign = formated_date.slice(0,1)
    var id = parseInt(formated_date.slice(1,3))

    return id
    
    
  }


  // getMapData
  export async function postMapData() {
    const url = "https://kandaweather-mainnet.ddns.net/v1/chain/get_table_rows"
    data = "{\"code\":\"dclimateiot4\",\"table\":\"weather\",\"scope\":\"dclimateiot4\",\"index_position\":\"first\",\"json\":\"true\",\"limit\":100}"
    const response = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json", "Accept-Charset": "UTF-8"},
      body: data
    })

    return response.json()
  }
