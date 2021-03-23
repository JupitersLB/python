import DayForecastSimple from './dayForecastSimple';

const ForecastList = props => {
  const { forecast } = props;
  return (
    <>
      <div className="weather-forecast text-purple-500 pt-3 bg-opacity-50 w-3/6 bg-indigo-300 mx-auto rounded-2xl">
        <p className="font-bold text-xl">A look into the next few days...</p>
        <div className="forecast-cards flex p-3">
          { forecast.map( (day, idx ) => <DayForecastSimple forecast={day} key={idx}/> ) }
        </div>
      </div>
    </>
    )

}

export default ForecastList;
