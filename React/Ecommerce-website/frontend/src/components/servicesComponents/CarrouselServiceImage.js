import ImageMongoMultimedia from "../ImageMongoMultimedia";
import "./CarrouselServiceImage.css";

const CarrouselServiceImage = ({ multimedia }) => {

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {multimedia?.map((image, i) => (
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={i}
            className={i === 1 ? " active" : ""}
          ></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {multimedia?.map((image, i) => (
          <div
            className={
              i === 1 ? " carousel-item active" : "carousel-item"
            }
          >
            <div className="single-image">
              <ImageMongoMultimedia image={image} className="d-block w-100" />
            </div>
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default CarrouselServiceImage;
