import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ImageMongoMultimedia from "../ImageMongoMultimedia";
// import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "./UploadServicesImages.css";
import { NEW_PRODUCT_ATTRIBUTE_UPDATE } from "../../Redux/newProduct/NewProductConstants";

//URL DE PRUEBA: http://localhost:5000/edit-service/64669c47bb8957385e1cd77c
const UploadServiceImagesComponent = ({ idService }) => {
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  // const history = useNavigate();
  const newProduct = useSelector((state) => state.newProduct);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, editProduct } = newProduct;
  const [cant, setCant] = useState(editProduct?.multimedia?.length || 0);

  // ACTUALIZO TODAS LAS IMAGENES
  const ActualizarImagenesDelProduct = async (atributte, value) => {
    const { data } = await axios.get(`http://localhost:5004/api/products/${editProduct._id}`);
    dispatch({
      type: NEW_PRODUCT_ATTRIBUTE_UPDATE,
      payload: { attribute: "multimedia", value: data.multimedia },
    });
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
    setFiles(e.target.files);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userLogin.userInfo.token}`,
    },
  };

  const SetPrimaryImage = async( imageId) =>{
    console.log(config);


    const res = await axios.put(
      "/api/products/" + idService+"/mainImage/"+imageId,
      config
    );


    toast.success("Imagen principal", {
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

  const UploadImage = async (e) => {
    e.preventDefault();

    // console.log(files.FileList);
    for (let i = 0; i < files.length; i++) {
      let filecito = files.item(i);
      var formData = new FormData();
      formData.append("photo", filecito);

      try {
        toast.info("Publicando imagen", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const res = await axios.post(
          "/api/products/upload/" + idService,
          formData,
          config
        );

        toast.success("Imagen publicada", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setCant(cant + 1);
        ActualizarImagenesDelProduct();
      } catch (error) {
        toast.error("No fue posible subir la imagen", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
      }
    }
  };

  const DeleteImage = async (idImage) => {
    try {
      toast.info("Eliminando imagen", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const res = await axios.delete(
        "/api/products/" + editProduct._id + "/remove-image/" + idImage
      );

      toast.success("Imagen eliminada", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setCant(cant - 1);
      ActualizarImagenesDelProduct();
    } catch (error) {
      toast.error("No fue posible eliminar la imagen", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  return (
    <>

      <div className="container mt-3 ">
        <h1>
          Sube tus imagenes acá:{" "}
          {editProduct?.multimedia ? editProduct.multimedia.length : 0}
        </h1>

        <form>
          <label htmlFor="photo">Selecciona una imagen</label>
          <input
            type="file"
            onChange={setimgfile}
            name="photo"
            placeholder=""
            multiple
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={UploadImage}
          >
            Subir imagen
          </button>
        </form>
        <br></br>

        <section className="row d-flex">
          {editProduct?.multimedia?.map((media) => (
            <section className="section-img" key={media}>
              <section className="close-btn">
                <button
                  className="btn-primary "
                  onClick={() => SetPrimaryImage(media)}
                >
                  Principal
                </button>
                <button
                  className="btn-danger"
                  onClick={() => DeleteImage(media)}
                >
                  &times;
                </button>
              </section>
              <ImageMongoMultimedia image={media} className="image" />
            </section>
          ))}
        </section>
      </div>
    </>
  );
};

export default UploadServiceImagesComponent;
