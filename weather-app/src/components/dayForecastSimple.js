const DayForecastSimple = props => {
  const { forecast } = props;
  const images = require.context('./../assets/images', true);
  const loadImage = imageName => (images(`./${imageName}`).default);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const dateObject = new Date(forecast.Date)
  return (
    <>
      <div className="simple-weather-card w-3/6 pt-3 px-3">
        <div className="card-header pb-2">
          <p className="text-lg font-bold">{days[dateObject.getDay() -1]}</p>
          <div className="max-min flex justify-center">
            <p>{forecast.Temperature.Maximum.Value}<span>&#176;</span>c |</p>
            <p className="pl-1">{forecast.Temperature.Minimum.Value}<span>&#176;</span>c</p>
          </div>
        </div>
        <div className="card-body flex justify-center">
          <div className="w-1/2">
            <p className="font-bold pb-2">Day</p>
            <div className="weather-icon h-20">
              <img className="mx-auto pb-2 h-full object-cover" src={loadImage(`${forecast.Day.Icon}.png`)} alt="weather-icon"/>
            </div>
            <p>{forecast.Day.IconPhrase}</p>
          </div>
          <div className="w-1/2">
            <p className="font-bold pb-2">Night</p>
            <div className="weather-icon h-20">
              <img className="mx-auto pb-2 h-full object-cover" src={loadImage(`${forecast.Night.Icon}.png`)} alt="weather-icon"/>
            </div>
            <p>{forecast.Night.IconPhrase}</p>
          </div>
        </div>
      </div>
    </>
    )
}

export default DayForecastSimple;
