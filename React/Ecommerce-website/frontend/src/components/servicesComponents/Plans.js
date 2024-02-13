import { useSelector } from "react-redux";
import PlanIndividual from "./PlanIndividual";
import { useEffect, useState } from "react";

const AccordionComponent = () => {
  
  const [plans, setPlans] = useState({
    basic: {
      name: "Básico",
      description: "",
      price: 100,
      revisionsCount: 1,
      deliveryDays: 1,
      includes: "",
      isPlanUsed: false,
    },
    standard: {
      name: "Estándar",
      description: "",
      price: 500,
      revisionsCount: 2,
      deliveryDays: 5,
      includes: "",
      isPlanUsed: false,
    },
    premium: {
      name: "Premium",
      description: "",
      price: 800,
      revisionsCount: 3,
      deliveryDays: 10,
      includes: "",
      isPlanUsed: false,
    },
  });

  const {product} = useSelector((state) => state.productDetails);

  useEffect(() => {
    setPlans(product.plans);
  }, [product]);

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Básico
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <PlanIndividual Plan={plans.basic} />
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            Estándar
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <PlanIndividual Plan={plans.standard} />
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            Premium
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <PlanIndividual Plan={plans.premium} />
        </div>
      </div>
    </div>
  );
};

export default AccordionComponent;
