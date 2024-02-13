import React from 'react';
import Head from '../components/Head';
import Layout from '../layout/Layout';
import { FiMail, FiPhoneCall, FiMapPin } from 'react-icons/fi';

function ContactUs() {
  const contactData = [
    {
      id: 1,
      title: 'Email Us',
      info: 'Interactively grow empowered for process-centric total linkage.',
      icon: FiMail,
      contact: 'minahmmassy@gmail.com',
    },
    {
      id: 2,
      title: 'Call Us',
      info: 'Distinctively disseminate focused solutions clicks-and-mortar ministate.',
      icon: FiPhoneCall,
      contact: '+255 762 352 746',
    },
    {
      id: 3,
      title: 'Location',
      info: 'Cecilia Chapman, 561-4535 Nulla LA, United States 96522',
      icon: FiMapPin,
      contact: '',
    },
  ];
  return (
    <Layout header={true}>
      <div className="min-h-screen container mx-auto px-4 my-6">
        <Head title="Contact us" />
        <div className="grid md:grid-cols-2 gap-6 lg:mt-20 mt-10 lg:grid-cols-3 xl:gap-8">
          {contactData.map((data) => (
            <div key={data.id} className="border p-10 rounded-lg text-center">
              <span className="flex justify-center text-4xl text-subMain mb-4">
                <data.icon />
              </span>
              <h5 className="text-xl mb-2 font-bold">{data.title}</h5>
              <p className="mb-0 text-base opacity-90 leading-7">
                <a href={`mailto:${data.contact}`} className="text-main">
                  {data.contact}
                </a>{' '}
                {data.info}
              </p>
            </div>
          ))}
        </div>
        {/* map */}
        <div className="my-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5650677.540494369!2d-120.05948539383785!3d46.24784430580107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53412b9c2d7b8ad3%3A0xf571d658cf2a6c18!2sMontana%2C%20USA!5e0!3m2!1sen!2stz!4v1684491878569!5m2!1sen!2stz"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
