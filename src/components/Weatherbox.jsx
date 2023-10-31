import React from "react";
import { useEffect } from "react";

function Weatherbox() {
  const getdata = () => {
    const d = new Date();
    let week = d.getDay();
    if (week === 1) document.getElementById("day").innerText = "Monday";
    else if (week === 2) document.getElementById("day").innerText = "Tuesday";
    else if (week === 3) document.getElementById("day").innerText = "Wednesday";
    else if (week === 4) document.getElementById("day").innerText = " Thursday";
    else if (week === 5) document.getElementById("day").innerText = "Friday";
    else if (week === 6) document.getElementById("day").innerText = "Saturday";
    else if (week === 7) document.getElementById("day").innerText = "Sunday";
    else document.getElementById("day").innerText = d;
    
    let date = new Date().toLocaleDateString("de-DE");
    document.getElementById("today_date").innerText = date;
    
    const sB = document.getElementById("submitBtn");
    const cityName = document.getElementById("cityName");
    
    const city_name = document.getElementById("city_name");
    const temp_real = document.getElementById("temp_real");
    const tempStatus = document.getElementById("temp_status");
    const Condition = document.getElementById("Condition");
    Condition.style.visibility = "hidden";
    const getInfo = async (event) => {
      event.preventDefault();
      const cityVal = cityName.value;

      if (cityVal === "") {
        city_name.innerText = "Plz write the name before search";
      } else {
        try {
          const url =
            await `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e19666e4245f6fa43d803a3fbd9f183e`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          const arrData = [data];
          city_name.innerText = ` ${arrData[0].name}, ${arrData[0].sys.country}`;
          temp_real.innerText = arrData[0].main.temp;
          tempStatus.innerText = arrData[0].main.humidity;
          Condition.style.visibility = "visible";
          Condition.innerText = arrData[0].weather[0].main;
        } catch {
          city_name.innerText = "plz enter the city name peoperly";
        }
      }
    };

    sB.addEventListener("click", getInfo, false);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-10 col-12 mx-auto">
            <div className="main-content">
              <form className="temp_form">
                <input
                  type="text"
                  id="cityName"
                  className="cit"
                  placeholder="Enter your city Name"
                  autoComplete="off"
                />
                <input
                  type="submit"
                  className="sub"
                  value="search"
                  id="submitBtn"
                />
              </form>
            </div>
            <div className="tempinformation">
              <div className="top_layer">
                <p id="day"></p>
                <p id="today_date"></p>
              </div>
              <div className="main_layer" >
              <div className="mid" style={{display:"flex",direction :"row" ,justifyContent: 'space-between'}}>
                <p className="city" id="city_name">
                  Get output
                </p>
                <p className="Condition" id="Condition">
                  Good
                </p>
                </div>
                <div className="middle_layer data_hide">
                  <p id="temp">
                    <span id="temp_real">0</span>
                    <sup>o</sup>C
                  </p>
                  <p id="temps">
                    <span id="temp_status"></span>%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weatherbox;
