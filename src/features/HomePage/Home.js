import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalCars } from "./homeSlice";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import CardComeponent from "../Components/CardComponent/CardComponent";
import "./HomePage.scss";

const Home = () => {
  const NumberOfCars = 9;
  const dispatch = useDispatch();
  const totalCar = useSelector(totalCars);
  const [displayCars, setDisplayCars] = useState([]);
  const [filterCarsList, setfilterCarsList] = useState([]);
  const [totaldisplayCars, setTotalDisplayCars] = useState([]);
  const [indexes, setIndexes] = useState({
    startIndex: 0,
    endIndex: NumberOfCars,
  });
  const [searchObj, setSearchObj] = useState({
    car: "",
    car_model_year: "",
    car_model: "",
  });

  useEffect(() => {
    dispatch({ type: "GET_ALL_CARS" });
    let element = document.getElementById("cars-wrapper");
    console.log("element :", element);
  }, []);
  const onCarContainerScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      let newIndexes = {
        ...indexes,
        endIndex: indexes.endIndex + NumberOfCars,
      };
      setIndexes(newIndexes);

      window.removeEventListener("scroll", onCarContainerScroll);
    }
  };
  useEffect(() => {
    if (
      searchObj &&
      (searchObj.car || searchObj.car_model || searchObj.car_model_year)
    ) {
      setDisplayCars(
        filterCarsList.slice(indexes.startIndex, indexes.endIndex)
      );
    } else {
      setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
    }
  }, [indexes]);
  useEffect(() => {
    setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
    setTotalDisplayCars(totalCar);
    setfilterCarsList(totalCar);
  }, [totalCar]);

  useEffect(() => {
    window.addEventListener("scroll", onCarContainerScroll);
  }, [displayCars]);
  useEffect(() => {
    if (
      searchObj &&
      (searchObj.car || searchObj.car_model || searchObj.car_model_year)
    ) {
      filterList();
    } else {
      setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
      setTotalDisplayCars(totalCar);
      setfilterCarsList(totalCar);
    }
  }, [searchObj.car, searchObj.car_model, searchObj.car_model_year]);
  let timer;
  const onSearchCars = (type, e) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (e.target.value === "") {
      // setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
      let obj = {...searchObj};
      obj[type] = "";
      setSearchObj(obj);
    } else {
      // timer = setTimeout(callChangeList(e.target.value, "car"), 1000);
      let obj = {...searchObj};
      obj[type] = e.target.value;
      setSearchObj(obj);
    }
  };
  const filterList = () => {
    let filterList =[...totalCar];
    Object.keys(searchObj).forEach((key) => {
      if(searchObj[key]){
        filterList = filterList.filter((item) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(searchObj[key].toString().toLowerCase())
      );
      }
      
    });

    setfilterCarsList(filterList);
    setDisplayCars(filterList.slice(0, NumberOfCars));
    setIndexes({ startIndex: 0, endIndex: NumberOfCars });
  };
  const onDropdownChange = (identifier, e, newValue) => {
    let obj = { ...searchObj };
    if (newValue && newValue[identifier]) {
      obj[identifier] = newValue[identifier].toString();
    } else {
      obj[identifier] = "";
    }
    setSearchObj(obj);
  };
  return (
    <div className="homePage-wrapper">
      <div className="search-container">
        <div className="search-fields-container">
          <div className="search-fields">
            Price Model:{" "}
            <Autocomplete
              id="combo-box-demo"
              options={totalCar}
              getOptionLabel={(option) => option.car_model}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Model" variant="outlined" />
              )}
              onChange={(event, newValue) =>
                onDropdownChange("car_model", event, newValue)
              }
            />
          </div>
          <div className="search-fields">
            Pick Year :
            <Autocomplete
              id="combo-box-demo"
              options={totalCar}
              getOptionLabel={(option) => option.car_model_year.toString()}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Year" variant="outlined" />
              )}
              onChange={(event, newValue) =>
                onDropdownChange("car_model_year", event, newValue)
              }
            />
          </div>

          <div className="search-fields">
            Car:{" "}
            <p>
              <TextField
                id="outlined-search"
                label="Search Car"
                type="search"
                variant="outlined"
                onChange={(e) => onSearchCars("car", e)}
              />
            </p>
          </div>
        </div>
      </div>
      <div id="cars-wrapper" className="cars-wrapper">
        {displayCars &&
          displayCars.map((item, i) => {
            return (
              <CardComeponent
                id={item.id}
                name={item.car}
                model={item.car_model}
                year={item.car_model_year}
                price={item.price}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
