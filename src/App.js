import React, { useState } from 'react';
const api = {
    key: "dc6ff6a86398fe175602b6f3e0ff0091",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    //Declare and init state to empty str, empty obj
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    //Define the search function, takes event object
    const search = (evt) => {
        //If enter key is pressed
        if (evt.key === "Enter") {
            //Call the api, pass in query state
            fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
            //fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
                //Then get the json promise
                .then(res => res.json())
                //Then set weather and query state
                .then(result => {
                    setWeather(result);
                    //Reset to empty string upon completion to choose new target location
                    setQuery("");
                    console.log(result);
                });
        }
    }


    //Datebuilder function
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }


    return (
        <div className={
            //If no search, call class app
            (typeof weather.main != "undefined")
                //If temp highe than 85
                ? ((weather.main.temp > 85)
                //Call class warm
                ? "App warm":
                // Else, call app
                    "App") :
                "App"}>
            <div className="App">
                <main>
                    <div className="devbox">
                        <p>OpenWeather API app</p>
                        <p>Tom Bielawski</p>
                    </div>

                    <div className = "search-box">
                        <input
                            type = "text"
                            className= "search-bar"
                            placeholder="Enter something here..."
                            //On change event, call setquery pass in event target
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                            onKeyPress={search}
                        />
                        <div className= "devbox2"><p>Enter a major city</p>
                        <p>to get started</p></div>
                    </div>
                    {/**/}
                    {(typeof weather.main != "undefined") ? (
                        <div>
                            <div className="location-box">
                                <div className="location">{weather.name}, {weather.sys.state}</div>
                                <div className="date">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°F
                                </div>
                                {/*make adjustment for us cities and states*/}
                                <div className="weather">{weather.weather[0].main}</div>
                            </div>
                        </div>
                    ) : ('')}
                </main>
                <div className= "devbox">
                    <p>React Weather App</p>
                    <p>openweather.org</p>
                    <p>tombielawski.com</p>
                    <div>October 14, 2021</div>
                </div>
            </div>
        </div>
    );
}

export default App;




