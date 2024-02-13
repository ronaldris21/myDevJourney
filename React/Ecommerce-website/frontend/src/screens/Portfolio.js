import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import ContactInfo from "../components/homeComponents/ContactInfo";
import PortfolioSection from "../components/homeComponents/PortfolioSection"

const Portfolio = ({ location, history }) => {

  return (
    
    <>
      <Header/>
          <section id="about">
            <div className="text-center">
                {/* <h3 className="titulos_services">Sobre nosotros</h3> */}
                <h3>Sobre nosotros</h3>
                <br></br>
                <p>Somos dos estudiantes de la Universidad Católica de Murcia "UCAM". </p>
                <p>Tenemos diversos proyectos realizados durante la carrera (Ingeniería informática).</p>
            </div>
          </section>
        
        <PortfolioSection/>

        <ContactInfo/>
            
        <Footer/>

    </>

  );
};

export default Portfolio;