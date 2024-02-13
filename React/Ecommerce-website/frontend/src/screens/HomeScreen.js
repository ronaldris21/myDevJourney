import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Carrousel from "../components/homeComponents/Carrousel";
import PortfolioSection from "../components/homeComponents/PortfolioSection";
const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword != null ?match.params.keyword : "";
  const pagenumber = match.params.pagenumber!= null ?match.params.pagenumber : 1;
  return (
    <div>
      <Header />
      <Carrousel/>
      <ShopSection keyword={keyword} pagenumber={pagenumber} tittle="Nuevos servicios"/>
      <PortfolioSection/>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
