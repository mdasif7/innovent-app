import "./CarDetailsPage.scss";
import Button from "@material-ui/core/Button";
import CarImage from "../../images/car-image.jpg";
import { useParams, useHistory } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {carDetails} from "../HomePage/homeSlice"
const CarDetailsPage = () => {
    let history = useHistory();
    let { id } = useParams();
    let dispatch= useDispatch();
    let carDetail= useSelector(carDetails);
    useEffect(()=>{
        dispatch({type:"FETCH_CAR", payload:id})
    }, [id])

    useEffect(()=>{
console.log("ddddd", carDetail)
    },[carDetail])
  return (
    <div className="car-details-container">
      {
          carDetail && (<>
            <div className="car-image-container">
            <p >
              <img src={CarImage} alt="IMG" />
            </p>
          </div>
          <div className="details-content-wrapper">
            <p>{carDetail.car}</p>
            <p>Model: {carDetail.car_model}</p>
            <p>Year: {carDetail.car_model_year}</p>
            <p>A car (or automobile) is a wheeled motor vehicle used for transportation. Most definitions of cars say that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people rather than goods. ... Cars have controls for driving, parking, passenger comfort, and a variety of lights.</p>
            <p className="details-button">
            <Button variant="contained" color="primary">Order Now </Button>
              <Button variant="contained" onClick={() => history.goBack()}>Go Back</Button>
            </p>
          </div>
          </> )
      }
    </div>
  );
};

export default CarDetailsPage;
