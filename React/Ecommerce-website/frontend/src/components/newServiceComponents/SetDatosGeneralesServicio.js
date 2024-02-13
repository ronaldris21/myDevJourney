import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEW_PRODUCT_ATTRIBUTE_UPDATE } from "../../Redux/newProduct/NewProductConstants";
import { newProductPostChanges } from "../../Redux/newProduct/NewProductActions";
import { ToastContainer, toast } from "react-toastify";

const SetDatosGeneralesServicio = () => {
  const newProduct = useSelector((state) => state.newProduct);
  const { loading, error, editProduct } = newProduct;

  const dispatch = useDispatch();
  const updateAttributeNewProduct = (atributte, value) => {
    dispatch({
      type: NEW_PRODUCT_ATTRIBUTE_UPDATE,
      payload: { attribute: atributte, value: value },
    });
  };

  const updateService = () => {
    dispatch(newProductPostChanges());

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

      <section>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={editProduct?.name}
            onChange={(e) => updateAttributeNewProduct("name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            className="form-control"
            id="categoria"
            name="categoria"
            value={editProduct?.category}
            onChange={(e) =>
              updateAttributeNewProduct("category", e.target.value)
            }
          >
            <option value="Website">Website</option>
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="4"
            value={editProduct?.description}
            onChange={(e) =>
              updateAttributeNewProduct("description", e.target.value)
            }
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={updateService}
        >
          Enviar
        </button>
      </section>
    </div>
  );
};

export default SetDatosGeneralesServicio;
