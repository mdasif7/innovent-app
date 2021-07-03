import "./CardComponent.scss";
import Button from "@material-ui/core/Button";
import CarImage from "../../../images/car-image.jpg";
import { useHistory } from "react-router";
const CardComponent = ({ price, id, name, model, year }) => {
const history= useHistory()
    const onMoreClick = () =>{
      history.push(`/detailsPage/${id}`)
    }
  return (
    <div key={`${id}-${name}`} className="card-container">
      <div>
        <p className="car-image-container">
          <img src={CarImage} alt="IMG" />
        </p>
        <p> {price} </p>
      </div>
      <div className="content-wrapper">
        <p>{name}</p>
        <p>Model: {model}</p>
        <p>Year: {year}</p>
        <p className="more-details">
          <Button variant="contained" onClick={onMoreClick}>More Details</Button>
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
