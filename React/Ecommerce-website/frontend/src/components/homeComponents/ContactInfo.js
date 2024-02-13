import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Contáctanos 24x7</h5>
            <a href="tel:+34 655 54 34 22">+34 655 54 34 22</a>
            <a href="tel:+34 641 72 28 63">+34 641 72 28 63</a>

          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Murcia</h5>
            <a href="geo:37.992801,-1.130876">Plaza Circular</a>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-envelope-open"></i>
            </div>
            <h5>Email</h5>
            <a href="mailto:aitornmanresa@gmail.com">aitornmanresa@gmail.com</a>
            <a href="mailto:rrris402@gmail.com">rrris402@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
