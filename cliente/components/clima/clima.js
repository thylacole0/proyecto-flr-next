'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';

const WeatherForecast = () => {
    const [forecast, setForecast] = useState([]);
    const [climaHoy, setClimaHoy] = useState([{}]);

    function upPrimeraLetra(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function upperCase(string) {
        return string.toUpperCase();
    }

    useEffect(() => {
        const getForecast = async () => {
            const result = await axios(
                `http://api.openweathermap.org/data/2.5/forecast?q=Santiago,cl&units=metric&appid=caac8519c6d00e45d898eadcc3ae4fff`
            );

            const groupedForecast = result.data.list.reduce((grouped, weather) => {
                const date = new Date(weather.dt_txt).toLocaleDateString();
                if (!grouped[date]) {
                    grouped[date] = [];
                }
                grouped[date].push(weather);
                return grouped;
            }, {});

            const dailyForecast = Object.values(groupedForecast).map((weathers) => {
                const minTemp = Math.min(...weathers.map(w => w.main.temp_min));
                const maxTemp = Math.max(...weathers.map(w => w.main.temp_max));
                return { ...weathers[0], main: { ...weathers[0].main, temp_min: minTemp, temp_max: maxTemp } };
            });
            setClimaHoy(dailyForecast.splice(0, 1));
            setForecast(dailyForecast.splice(0, 4));
            console.log(forecast)
            console.log(climaHoy)
        };

        getForecast();
    }, []);

    return (
            climaHoy[0].dt_txt && (
                <div className="bg-[#232931] w-[350px] min-w-[350px] rounded-3xl text-white relative flex flex-col max-w-[450px]">
                    <div className="bg-purple-900 h-[250px] flex justify-center rounded-xl bg-center bg-cover transform scale-100 perspective-[200px] cursor-pointer shadow-md transition-all ease-in-out duration-300" style={{ boxShadow: '0 0 20px -10px rgba(0, 0, 0, 0.2)' }}>
                        <div className='flex absolute flex-col items-center mt-6' id='info-hoy'>
                            <h1 className='font-bold text-2xl'>{upPrimeraLetra(new Date(climaHoy[0].dt_txt).toLocaleDateString('es-ES', { weekday: 'long' }))}</h1>
                            <span>{upPrimeraLetra(new Date(climaHoy[0].dt_txt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }))}</span>
                            <div className='mt-2'>
                                <GpsFixedRoundedIcon className='w-4 h-4 mb-1 mr-2' />
                                <span className='font-bold'>Santiago, CL</span>
                            </div>
                        </div>
                        {/* <div className='flex flex-col items-center justify-center'>
                            <img className="w-36" src={`http://openweathermap.org/img/w/${climaHoy[0].weather[0].icon}.png`} alt="" />
                        </div> */}
                        <div className='absolute bottom-5 left-5 flex flex-col items-start'>
                            <span>Temperatura mañana</span>
                            <h1 className='font-bold text-5xl'>{Math.round(climaHoy[0].main.temp)}°C</h1>
                        </div>
                    </div>
                    <div id='info-derecha' className='w-full md:w-auto relative pt-3 flex flex-col'>
                        <div id='info-dia' className='p-[25px] flex flex-col'>
                            <div className='mb-2'>
                                <span className='font-bold'>Temperatura minima</span>
                                <span className='float-right'>{Math.round(climaHoy[0].main.temp_min)}°C</span>
                            </div>
                            <div className='mb-2'>
                                <span className='font-bold'>Temperatura maxima</span>
                                <span className='float-right'>{Math.round(climaHoy[0].main.temp_max)}°C</span>
                            </div>
                            {/* <div className='mb-2'>
                                <span className='font-bold'>Humedad</span>
                                <span className='float-right'>{climaHoy[0].main.humidity}%</span>
                            </div>
                            <div className='mb-2'>
                                <span className='font-bold'>Velocidad del viento</span>
                                <span className='float-right'>{climaHoy[0].wind.speed}km/h</span>
                            </div> */}
                        </div>
    
                        <ul className='flex list-none shadow-md rounded-xl mx-3 my-3'>
                        {forecast.map((weather, index) => (
                            <li className='bg-[#1f252c] p-[15px] flex flex-col justify-between items-center rounded-xl transition ease-in-out delay-150 hover:scale-110 hover:bg-white hover:text-[#222831] hover:shadow-lg' key={index}>
                                <div className='flex flex-col items-center'>
                                    <img className="h-8 w-12 object-cover md:w-10" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
                                    <span >{upPrimeraLetra(new Date(weather.dt_txt).toLocaleDateString('es-ES', { weekday: 'long'}))}</span>
                                    <span className='font-bold'>{Math.round(weather.main.temp_max)}°C</span>
                                </div>
                            </li>
                            ))}
                        </ul>
    
                    </div>
    
                </div>
            )

        
    );
};

export default WeatherForecast;