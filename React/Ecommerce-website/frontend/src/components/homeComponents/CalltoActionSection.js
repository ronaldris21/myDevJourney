import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>¿Necesitas algo más?</h2>
              <p>Incribete en nuestro servicio de ayuda.</p>
              <form className="form-section">
                <input placeholder="Tu correo electrónico..." name="email" type="email" />
                <input value="Si, ¡Quiero!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
