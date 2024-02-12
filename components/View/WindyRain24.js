import {conversion} from '../../lib/api'

export default function WindyRain24(props) {

    return (
        <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
            <div className=''>
                <div className="justify-evenly p-8 ml-0">
                    <center><font size="5">ECMWF Rain Accumulation Forecast (mm)</font></center>
                    <br />
                    <iframe src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=kt&zoom=3&overlay=rainAccu&product=ecmwf&level=surface&lat=5.0377&lon=7.9128&detailLat=5.0377&detailLon=7.9128&detail=false"
                            height="400"
                            width="560"
                            align="middle"
                            title="Rain Accumulation">
                    </iframe>
                </div>
            </div>

        </div>

    )
}


  
