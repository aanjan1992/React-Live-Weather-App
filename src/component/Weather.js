import React,{useState, useEffect} from 'react'
import axios from "axios";
import cityTimezones from "city-timezones";
import Weathercard from './Weathercard';

function Weather() {
    const [city, setCity] = useState("kolkata")
    const [tempInfo, settempInfo] = useState({})
    // time differentlocation
    const [timeNow, setTimeNow] = useState(new Date().toLocaleTimeString("en-GB"));
    const [cityLookup, setCityLookup] = useState("Asia/Kolkata")
    const [background, setBackground] = useState("")
    const getWeatherInfo = () => {
        axios(
            {
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f610b69b3c6d7eb99d61f54215f3362e
                `,
                method: 'GET',
                headers : { 'Content-Type':'application/json' }
            }
        ).then(
            response => {
                const data = response.data;
                const {temp, humidity, pressure } = data.main;
                const {main: weatherMood} = data.weather[0];
                const {name} = data;
                const {speed} = data.wind;
                const {country, sunset} = data.sys;

                const myWeatherInfo = {
                    temp,
                    humidity,
                    pressure,
                    weatherMood,
                    name,
                    speed,
                    country,
                    sunset
                }
                // background change
                
                setCityLookup(cityTimezones.lookupViaCity(myWeatherInfo.name)[0].timezone);
                setTimeNow(new Date().toLocaleTimeString('en-GB', {timeZone : cityLookup }))
                if (parseInt(timeNow.substr(0,2)) <= 5 || parseInt(timeNow.substr(0,2)) >= 18){
                      setBackground("#191970")
                      }
                else{
                      setBackground("#fafafa")
                }
                // background change
                settempInfo(myWeatherInfo)
                document.title = `${city.toUpperCase()} Weather`
                
            }
        ).catch((error) => {console.log(error)})
    }
    useEffect(() => {
        getWeatherInfo();
    },[city,timeNow,background])

    return (
        <>
            <div className="container">
                <div className="wrap">
                    <div className="search">
                        <input type="search" placeholder="Search city..." className="searchTerm" autoFocus id="search"
                            value={city} onChange={(e)=>{setCity(e.target.value)}}
                        />
                        <button className="searchButton" onClick={getWeatherInfo}>Search</button>
                    </div>
                </div>
                <Weathercard tempInfo = {tempInfo} background = {background} cityLookup = {cityLookup}/>
            </div>
        </>
    )
}

export default Weather;
