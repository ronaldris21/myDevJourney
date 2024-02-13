import React from "react";
import Header from "../components/Header";
import ShopSection from "../components/homeComponents/ShopSection";
import Footer from "../components/Footer";
import ContactInfo from "../components/homeComponents/ContactInfo";
const Servicios = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword != null ?match.params.keyword : "";
  const pagenumber = match.params.pagenumber!= null ?match.params.pagenumber : 1;
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} tittle="Todos los servicios"/>
      <ContactInfo/>
      <Footer />
    </div>
  );
};

export default Servicios;