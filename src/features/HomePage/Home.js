import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalCars } from "./homeSlice";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import CardComeponent from "../Components/CardComponent/CardComponent";
import "./HomePage.scss";

const Home = () => {
  const NumberOfCars= 9
  const dispatch = useDispatch();
  const totalCar = useSelector(totalCars);
  const [displayCars, setDisplayCars] = useState([]);
  const [filterCarsList, setfilterCarsList] = useState([]);
  const [totaldisplayCars, setTotalDisplayCars] = useState([]);
  const [indexes, setIndexes] = useState({ startIndex: 0, endIndex: NumberOfCars });
  const [searchObj, setSearchObj] = useState({ car: "", type: "" });

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
    if(searchObj && searchObj.car){
      setDisplayCars(filterCarsList.slice(indexes.startIndex, indexes.endIndex));
    } else {
      setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
    }
    
  }, [indexes]);
  useEffect(() => {
    setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
    setTotalDisplayCars(totalCar);
  }, [totalCar]);

  useEffect(() => {
    window.addEventListener("scroll", onCarContainerScroll);
  }, [displayCars]);
  let timer;
  const onSearchCars = (type, e) => {
    if(timer){
      clearTimeout(timer)
    }
    if(e.target.value === ''){
      setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
    } else {
      
      timer = setTimeout(callChangeList(e), 1000)
      
    }
  }

  const callChangeList = (e) => {
    let filterList= totalCar.filter(item => item.car.toLowerCase().includes(e.target.value.toLowerCase()));
    setfilterCarsList(filterList);
    setSearchObj({...searchObj, car:e.target.value})
    setDisplayCars(filterList.slice(0, NumberOfCars));
    setIndexes({startIndex:0, endIndex:NumberOfCars})
  }
  return (
    <div className="homePage-wrapper">
      Home Page
      <div className="search-container">
     Price Model: <Autocomplete
  id="combo-box-demo"
  options={totalCar}
  getOptionLabel={(option) => option.car_model}
  style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Price" variant="outlined" />}
/>

Pick Year :
<Autocomplete
  id="combo-box-demo"
  options={totalCar}
  getOptionLabel={(option) => option.car_model_year.toString()}
  style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Year" variant="outlined" />}
/>
        Car:{" "}
        <TextField
          id="outlined-search"
          label="Search Car"
          type="search"
          variant="outlined"
          onChange={(e)=> onSearchCars("car", e)}
        />
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
                price ={
                  item.price
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
