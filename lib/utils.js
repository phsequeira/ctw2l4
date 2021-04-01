function formattedWeather(wdata) {
  const formatted = wdata.data.map((wItem) => {
    return {
      forecast: wItem.weather.description,
      tempature: wItem.temp,
      time: new Date(wItem.ts * 1000).toDateString(),
    };
  });
  const final = formatted.slice(0, 7);
  return final; 
}  

module.exports = { formattedWeather };