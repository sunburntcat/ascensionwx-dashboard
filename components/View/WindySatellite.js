import {conversion} from '../../lib/api'

export default function WindySatellite(props) {

    return (
        <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
            <div className=''>
                <div className="justify-evenly p-8 ml-0">
                    <center><font size="5">2-Hour Visible Satellite</font></center>
                    <br />
                    <iframe src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=kt&zoom=4&overlay=satellite&product=satellite&level=surface&lat=6.826&lon=4.414"
                            height="400"
                            width="560"
                            align="middle"
                            title="Temperature with forecast">
                    </iframe>
                </div>
            </div>

        </div>

    )
}


  
