import {conversion} from '../../lib/api'

import {Helmet} from "react-helmet";


export default function Forecast7Day(props) {

    function update(d, s, id)
    {
        {var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
    }

    return (
        <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
            <div className=''>
                <div className="justify-evenly p-8 ml-0">
                    <font size="6">Forecast for Akure, Nigeria</font>
                    <br />
                    <font size="3">7.2571N , 5.2058E</font>
                    <br />
                    _______________________________________________
                    <iframe src="https://www.meteoblue.com/en/weather/widget/daily/akure_nigeria_2350841?geoloc=fixed&days=7&tempunit=CELSIUS&windunit=KNOT&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=dark"
                            height="300"
                            width="370"
                            align="center"
                            title="Temperature with forecast">
                    </iframe>
                    <div><a
                        href="https://www.meteoblue.com/en/weather/week/akure_nigeria_2350841?utm_source=weather_widget&utm_medium=linkus&utm_content=daily&utm_campaign=Weather%2BWidget"
                        target="_blank" rel="noopener"></a>
                    </div>
                </div>
            </div>

        </div>

    )
}

