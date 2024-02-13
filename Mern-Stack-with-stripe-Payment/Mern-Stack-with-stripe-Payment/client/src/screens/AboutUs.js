import React from 'react';
import Head from '../components/Head';
import Layout from '../layout/Layout';

function AboutUs() {
  return (
    <Layout header={true}>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Head title="About us" />
        <div className="bg-white">
          <div className=" xl:p -20 pb-10 px-4">
            <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
              <div>
                <h3 className="text-xl lg:text-3xl mb-2 font-semibold">
                  About Online Shop
                </h3>
                <div className="mt-3 text-base opacity-90 leading-7">
                  <p>
                    At Online Shop, we are passionate about delivering an
                    exceptional online shopping experience to our valued
                    customers. With a wide selection of top-quality products and
                    a commitment to outstanding customer service, we aim to be
                    your go-to destination for all your shopping needs. Our
                    journey began with a simple vision – to create an ecommerce
                    platform that offers convenience, reliability, and a touch
                    of personalization. As a team of dedicated professionals, we
                    continuously strive to curate a diverse range of products
                    that cater to various interests and preferences
                  </p>

                  <p>
                    What sets us apart is our unwavering dedication to ensuring
                    customer satisfaction. Our user-friendly website is designed
                    to make your shopping journey seamless, from browsing
                    through products to completing your purchase securely. We
                    value your trust, and that's why we prioritize data security
                    and privacy to safeguard your information. At Online Shop,
                    we believe that every interaction matters. Our friendly and
                    knowledgeable customer support team is always ready to
                    assist you with any inquiries or concerns. We take pride in
                    building lasting relationships with our customers, ensuring
                    that your satisfaction is at the heart of everything we do.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                  <div className="p-8 bg-deepest shadow-sm rounded-lg">
                    <span className="text-3xl block font-extrabold mb-4 text-gray-800">
                      10K
                    </span>
                    <h4 className="text-lg font-bold mb-1">Happy Customers</h4>
                    <p className="mb-0 opacity-90 leading-7">
                      Our customers are our priority, we make sure that they are
                      satisfied with our services
                    </p>
                  </div>
                  <div className="p-8 bg-deepest shadow-sm rounded-lg">
                    <span className="text-3xl block font-extrabold mb-4 text-gray-800">
                      8K
                    </span>
                    <h4 className="text-lg font-bold mb-1">
                      Products Available
                    </h4>
                    <p className="mb-0 opacity-90 leading-7">
                      we have a wide range of products; from fashion items to
                      electronic devices, you
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <img
                  className="w-full  md:h-[600px] rounded shadow object-cover"
                  src="/images/about.jpeg"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
