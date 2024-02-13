import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PlanIndividual = ({ Plan , match}) => {
  let history = useHistory();

  const id = useSelector((state) => state.productDetails.product._id);

  var lineasDescripcion = [];
  if (Plan?.includes) lineasDescripcion = Plan.includes.split("\n");


  const addServiceToCartHandler = (e) =>{
      e.preventDefault();
      let uri  = `/cart/${id}?planName=${Plan.name}`;
      console.table(["URI", uri]);
      history.push(uri);
  }

  return (
    <div className="accordion-body">
      <p>
        <strong>Descripción: </strong>
        {Plan.description}
      </p>
      <p>
        <strong>Precio: </strong>
        {Plan.price}€
      </p>
      <p>
        <strong>Número de revisiones: </strong>
        {Plan.revisionsCount}
      </p>
      <p>
        <strong>Días de entrega: </strong>
        {Plan.deliveryDays}
      </p>
      <p>
        <strong>Incluye: </strong>
        <ul>
          {lineasDescripcion.map((linea, index) =>
            linea.length > 0 ? <li>{linea}</li> : <br />
          )}
        </ul>
      </p>
      <button type="button" className="btn btn-primary" onClick={addServiceToCartHandler}>
        Añadir al carrito
      </button>
    </div>
  );
};

export default PlanIndividual;
