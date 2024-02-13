import React, { useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {  toast } from "react-toastify";
import axios from "axios";

const PostNewService = ({ config , history}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const postServiceOnDb = async () => {
    let newProduct = {
      newProduct: {
        name: name,
        description: description,
        category: category,
      },
    };

    toast.info("publicando ...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    axios
      .post(`/api/products/`, newProduct, config)
      .then(async (response) => {

        toast.success("servicio publicado", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        history.push("/edit-service/"+response.data._id);   ///PUSH A LA VISTA DE EDITAR EL SERVICIO
        
        toast.info("Da click afuera para seguir editando", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    })
      .catch((error) => {
        toast.error("No fue posible publicar el servicio", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="custom-ui mt-4 bg-white p-5 border">

      <section>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            className="form-control"
            id="categoria"
            name="categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => postServiceOnDb()}
        >
          Enviar
        </button>
      </section>
    </div>
  );
};

export default PostNewService;
