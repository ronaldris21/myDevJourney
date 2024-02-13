import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEW_PRODUCT_PLANS_UPDATE } from "../../Redux/newProduct/NewProductConstants";
import { newProductPostChanges } from "../../Redux/newProduct/NewProductActions";
import { ToastContainer, toast } from "react-toastify";

const SetPlanIndividual = ({ Plan }) => {
  const [description, setDescription] = useState(Plan?.description || "");
  const [price, setPrice] = useState(Plan?.price || "");
  const [revisionsCount, setRevisionsCount] = useState(
    Plan?.revisionsCount || ""
  );
  const [deliveryDays, setDeliveryDays] = useState(Plan?.deliveryDays || "");
  const [includes, setIncludes] = useState(Plan?.includes || "");
  const [isPlanUsed, setIsPlanUsed] = useState(Plan?.isPlanUsed || false);

  const newProduct = useSelector((state) => state.newProduct);
  const { loading, error, editProduct } = newProduct;

  const dispatch = useDispatch();

  React.useEffect(() => {
    setDescription(Plan?.description);
    setPrice(Plan?.price);
    setRevisionsCount(Plan?.revisionsCount);
    setDeliveryDays(Plan?.deliveryDays);
    setIncludes(Plan?.includes);
    setIsPlanUsed(Plan?.isPlanUsed);
  }, [editProduct]);

  const updatePlanOnBackend = (e) => {
    const scrollPosition = window.pageYOffset;

    const planActualizado = {
      description: description,
      price: price,
      revisionsCount: revisionsCount,
      deliveryDays: deliveryDays,
      includes: includes,
      isPlanUsed: isPlanUsed,
    };

    console.log(planActualizado);

    ///Actualizo el estado
    dispatch({
      type: NEW_PRODUCT_PLANS_UPDATE,
      payload: {
        planName: Plan.name,
        plan: planActualizado,
      },
    });

    ///PUBLICO LOS CAMBIOS EN LA BASE DE DATOS
    dispatch(newProductPostChanges());
    window.scrollTo(0, scrollPosition);

    if (!error) {
      toast.success("Actualizado!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("No es posible subir los cambios " + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  };

  return (
    <div className="mt-4">
      <section className="position-relative">
        
        <div className="form-group">
          <h1>Plan: {Plan?.name}</h1>
        </div>

        <label>Activar servicio</label>
        <input
          type="checkbox"
          className="form-check-input"
          id="intermedio"
          name="nivel"
          checked={isPlanUsed}
          onChange={(e) => setIsPlanUsed(e.target.checked)}
        />

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="revisiones">Número de revisiones:</label>
          <input
            type="number"
            className="form-control"
            id="revisiones"
            name="revisiones"
            min="0"
            value={revisionsCount}
            onChange={(e) => {
              setRevisionsCount(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="entrega">Días de entrega:</label>
          <input
            type="number"
            className="form-control"
            id="entrega"
            name="entrega"
            min="0"
            value={deliveryDays}
            onChange={(e) => setDeliveryDays(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cosasIncluidas">Cosas incluidas (separalos por líneas):</label>
          <textarea
            className="form-control"
            id="cosasIncluidas"
            name="cosasIncluidas"
            rows="4"
            value={includes}
            onChange={(e) => setIncludes(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary m-2 end-0"
          onClick={updatePlanOnBackend}
        >
          Enviar
        </button>
      </section>

      <hr />
      <br />
      <br />
    </div>
  );
};

export default SetPlanIndividual;
