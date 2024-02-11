import {conversion} from '../../lib/api'

export default function WindyDrought(props) {

    return (
        <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
            <div className=''>
                <div className="justify-evenly p-8 ml-0">
                    <center><font size="5">ECMWF Drought Intensity Forecast (0-40cm)</font></center>
                    <br />
                    <iframe src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=kt&zoom=5&overlay=drought40&product=drought&level=surface&lat=7.2571&lon=5.205&detailLat=7.2571&detailLon=5.2058&detail=false"
                            height="400"
                            width="560"
                            align="middle"
                            title="Drought Intensity">
                    </iframe>
                </div>
            </div>

        </div>

    )
}


  
