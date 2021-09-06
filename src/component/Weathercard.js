import React,{useState, useEffect} from 'react';



function Weathercard({tempInfo, background, cityLookup}) {
    
    const {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunset
    } = tempInfo;

    const [weatherState, setWeatheState] = useState("");

    useEffect(() => {
        if (weatherMood) {
            if (background === "#191970"){
                switch (weatherMood) {
                    case "Clouds":
                    setWeatheState("wi-cloudy");
                    break;
                    case "Haze":
                    setWeatheState("wi-fog");
                    break;
                    case "Clear":
                    setWeatheState("wi-moon-waning-crescent-5");
                    break;
                    case "Mist":
                    setWeatheState("wi-dust");
                    break;
                    case "Rain":
                    setWeatheState("wi-rain");
                    break;
                    case "Snow":
                    setWeatheState("wi-snow");
                    break;
                    case "Lightning":
                    setWeatheState("wi-Lightning");
                    break;
                    case "Thunderstorm":
                    setWeatheState("wi-Thunderstorm");
                    break;

                    default:
                    setWeatheState("wi-day-sunny");
                    break;
                }
            }else{
                switch (weatherMood) {
                    case "Clouds":
                    setWeatheState("wi-cloudy");
                    break;
                    case "Haze":
                    setWeatheState("wi-fog");
                    break;
                    case "Clear":
                    setWeatheState("wi-day-sunny");
                    break;
                    case "Mist":
                    setWeatheState("wi-dust");
                    break;
                    case "Snow":
                    setWeatheState("wi-snow");
                    break;
                    case "Lightning":
                    setWeatheState("wi-Lightning");
                    break;
                    case "Thunderstorm":
                    setWeatheState("wi-Thunderstorm");
                    break;

                    default:
                    setWeatheState("wi-day-sunny");
                    break;
            }
        }
    }
    }, [weatherMood,background]);


    let sec = sunset;
    let date = new Date(sec*1000);
    let timestr = `${date.getHours()}:${date.getMinutes()}`
    return (
        <>
           <article className="widget noselect">
                    <div className="weatherIcon" style={{background}}>
                        <i className={`wi u ${weatherState}`}></i>
                    </div>
                    <div className="weatherInfo">
                        <div className="temperature">
                            <span>{temp}&deg;</span>
                        </div>
                        <div className="description">
                            <div className="weatherCondition">{weatherMood}</div>
                            <div className="place">{name}, {country}</div>
                        </div>
                    </div>
                    <div className="date">{new Date().toLocaleString("en-US", {timeZone : cityLookup }) }</div>
                    <div className="extra-temp">
                        <div className="temp-info-minmax">
                            <div className="two-sided-section">
                                <p>
                                    <i className={"wi wi-sunset"}></i>
                                </p>
                                <p className="extra-info-leftside">
                                    {timestr} <br />
                                    Sunset
                                </p>
                            </div>
                            <div className="two-sided-section">
                                <p>
                                    <i className={"wi wi-humidity"}></i>
                                </p>
                                <p className="extra-info-leftside">
                                    {humidity}% <br />
                                    Humidity
                                </p>
                            </div>
                        </div>
                        <div className="weather-extra-info">
                            <div className="two-sided-section">
                                <p>
                                    <i className={"wi wi-rain"}></i>
                                </p>
                                <p className="extra-info-leftside">
                                    {pressure} <br />
                                    Pressure
                                </p>
                            </div>
                            <div className="two-sided-section">
                                <p>
                                    <i className={"wi wi-strong-wind"}></i>
                                </p>
                                <p className="extra-info-leftside">
                                   {speed} <br />
                                    Wind
                                </p>
                            </div>
                        </div>
                    </div>
                </article> 
        </>
    )
}

export default Weathercard
