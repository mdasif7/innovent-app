import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalCars } from "./homeSlice";
import CardComeponent from "../Components/CardComponent/CardComponent";
import "./HomePage.scss";

const Home = () => {
  const dispatch = useDispatch();
  const totalCar = useSelector(totalCars);
  const [displayCars, setDisplayCars] = useState([]);
  const [totaldisplayCars, setTotalDisplayCars] = useState([]);
  const [indexes, setIndexes] = useState({ startIndex: 0, endIndex: 12 });

  useEffect(() => {
    dispatch({ type: "GET_ALL_CARS" });
    let element = document.getElementById("cars-wrapper");
    console.log("element :", element);
  }, []);
  const onCarContainerScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      let newIndexes = {
        ...indexes,
        endIndex: indexes.endIndex + 12,
      };
      setIndexes(newIndexes);

      window.removeEventListener("scroll", onCarContainerScroll);
    }
  };
  useEffect(() => {
    setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
  }, [indexes]);
  useEffect(() => {
    setDisplayCars(totalCar.slice(indexes.startIndex, indexes.endIndex));
    setTotalDisplayCars(totalCar);
  }, [totalCar]);

  useEffect(() => {
    window.addEventListener("scroll", onCarContainerScroll);
  }, [displayCars]);
  return (
    <div className="homePage-wrapper">
      Home Page
      <div id="cars-wrapper" className="cars-wrapper">
        {displayCars &&
          displayCars.map((item, i) => {
            return (
              <CardComeponent
                id={item.id}
                name={item.car}
                model={item.car_model}
                year={item.car_model_year}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
