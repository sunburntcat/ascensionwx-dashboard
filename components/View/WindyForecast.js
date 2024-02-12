import {conversion} from '../../lib/api'

export default function WindyForecast(props) {

    return (
        <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
            <div className=''>
                <div className="justify-content-evenly p-8 ml-0 mb-5">
                        <font size="6">Forecast for Akure, Nigeria</font>
                        <br />
                        <iframe src="https://www.meteoblue.com/en/weather/widget/daily/akure_nigeria_2350841?geoloc=fixed&days=7&tempunit=CELSIUS&windunit=KNOT&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=light"
                                height="300"
                                width="470"
                                align="left"
                                title="Temperature with forecast">
                        </iframe>
                        <a
                            href="https://www.meteoblue.com/en/weather/week/akure_nigeria_2350841?utm_source=weather_widget&utm_medium=linkus&utm_content=daily&utm_campaign=Weather%2BWidget"
                            target="_blank" rel="noreferrer">
                        </a>
                        <iframe src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0C&metricWind=default&zoom=1&overlay=wind&product=ecmwf&level=surface&lat=23.28&lon=-32.45&detailLat=7.2571&detailLon=5.2058&detail=false"
                                height="350"
                                width="700"
                                align="right"
                                title="Wind circulation">
                        </iframe>
                </div>
                <br /><br />
            </div>

        </div>

    )
}

