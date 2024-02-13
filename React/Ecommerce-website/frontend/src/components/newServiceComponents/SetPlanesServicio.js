import React from "react";
import "./SetPlanesServicio.css";
import { useSelector } from "react-redux";
import SetPlanIndividual from "./SetPlanIndividual";

function SetPlanesServicio({ plans }) {
  

  return (
    <div className="planesContainer">
      <SetPlanIndividual Plan={plans?.basic} />
      <SetPlanIndividual Plan={plans?.standard} />
      <SetPlanIndividual Plan={plans?.premium} />
    </div>
  );
}

export default SetPlanesServicio;
