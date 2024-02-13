import React from 'react';
import Head from '../components/Head';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';

const TermAndConditions = () => {
  return (
    <Layout header={true}>
      <div className="min-h-screen container mx-auto px-4 my-6">
        <Head title="Terms & Conditions" />
        <div className="bg-white my-12">
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
              Welcome to OnlineShop Market!
            </h2>
            <div className="font-sans leading-7">
              <p>
                These terms and conditions outline the rules and regulations for
                the use of OnlineShop Market's Website. By accessing this
                website we assume you accept these terms and conditions. Do not
                continue to use OnlineShop Market if you do not agree to take
                all of the terms and conditions stated on this page.
              </p>
              <p>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                "Client", "You" and "Your" refers to you, the person log on this
                website and compliant to the Company’s terms and conditions.
                "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                Company. "Party", "Parties", or "Us", refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner for
                the express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with
                and subject to, prevailing law of Netherlands. Any use of the
                above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </p>
            </div>
          </div>
          <div className="mb-6 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
              Cookies
            </h2>
            <div className="font-sans leading-7">
              <p>
                We employ the use of cookies. By accessing OnlineShop Market,
                you agreed to use cookies in agreement with the OnlineShop
                Market's Privacy Policy. Most interactive websites use cookies
                to let us retrieve the user’s details for each visit. Cookies
                are used by our website to enable the functionality of certain
                areas to make it easier for people visiting our website. Some of
                our affiliate/advertising partners may also use cookies.
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
              License
            </h2>
            <div className="font-sans leading-7">
              <p>
                Unless otherwise stated, OnlineShop Market and/or its licensors
                own the intellectual property rights for all material on
                OnlineShop Market. All intellectual property rights are
                reserved. You may access this from OnlineShop Market for your
                own personal use subjected to restrictions set in these terms
                and conditions.This Agreement shall begin on the date hereof.
                Our Terms and Conditions were created with the help of the Terms
                And Conditions Generator.
              </p>

              <ul>
                <strong className="mb-2">You must not:</strong>
                <li>
                  1. Identifiers (e.g. name, mailing address, email address,
                  phone number, credit/debit card number)
                </li>
                <li>
                  2. Characteristics of protected classifications (e.g. gender,
                  age)
                </li>
                <li>
                  3. Commercial information (e.g. products or services
                  purchased, purchase history)
                </li>
                <li>
                  4. Internet or other electronic network activity (e.g. browse
                  or search history)
                </li>
                <li> 5. Geo location data (e.g. latitude or longitude)</li>
                <li>
                  6. Audio, electronic, visual, or similar information (e.g.
                  recording of Guest service calls)
                </li>
                <li>
                  7. Inferences drawn from any of the above (e.g. preferences or
                  characteristics)
                </li>
              </ul>
              <p>
                Parts of this website offer an opportunity for users to post and
                exchange opinions and information in certain areas of the
                website. OnlineShop Market does not filter, edit, publish or
                review Comments prior to their presence on the website. Comments
                do not reflect the views and opinions of OnlineShop Market,its
                agents and/or affiliates. Comments reflect the views and
                opinions of the person who post their views and opinions. To the
                extent permitted by applicable laws, OnlineShop Market shall not
                be liable for the Comments or for any liability, damages or
                expenses caused and/or suffered as a result of any use of and/or
                posting of and/or appearance of the Comments on this website.
              </p>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
                Content Liability
              </h2>
              <div className="font-sans leading-7">
                <p>
                  We shall not be hold responsible for any content that appears
                  on your Website. You agree to protect and defend us against
                  all claims that is rising on your Website. No link(s) should
                  appear on any Website that may be interpreted as libelous,
                  obscene or criminal, or which infringes, otherwise violates,
                  or advocates the infringement or other violation of, any third
                  party rights.Without prior approval and written permission,
                  you may not create frames around our Webpages that alter in
                  any way the visual presentation or appearance of our Website.
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
                Your Privacy
              </h2>
              <div className="font-sans leading-7">
                <p>
                  Please read{' '}
                  <Link to="/policy" className="text-main">
                    Privacy Policy
                  </Link>{' '}
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
                Reservation of Rights
              </h2>
              <div className="font-sans leading-7">
                <p>
                  We reserve the right to request that you remove all links or
                  any particular link to our Website. You approve to immediately
                  remove all links to our Website upon request. We also reserve
                  the right to amen these terms and conditions and it’s linking
                  policy at any time. By continuously linking to our Website,
                  you agree to be bound to and follow these linking terms and
                  conditions./
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
                Removal of links from our website
              </h2>
              <div className="font-sans leading-7">
                <p>
                  If you find any link on our Website that is offensive for any
                  reason, you are free to contact and inform us any moment. We
                  will consider requests to remove links but we are not
                  obligated to or so or to respond to you directly. We do not
                  ensure that the information on this website is correct, we do
                  not warrant its completeness or accuracy; nor do we promise to
                  ensure that the website remains available or that the material
                  on the website is kept up to date.
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold mb-2 lg:mb-4">
                Disclaimer
              </h2>
              <div className="font-sans leading-7">
                <p>
                  To the maximum extent permitted by applicable law, we exclude
                  all representations, warranties and conditions relating to our
                  website and the use of this website. Nothing in this
                  disclaimer will:
                </p>
                <ul>
                  <li>
                    1. limit or exclude our or your liability for death or
                    personal injury;
                  </li>
                  <li>
                    2. limit or exclude our or your liability for fraud or
                    fraudulent misrepresentation;
                  </li>
                  <li>
                    3. limit any of our or your liabilities in any way that is
                    not permitted under applicable law; or
                  </li>
                  <li>
                    4. exclude any of our or your liabilities that may not be
                    excluded under applicable law.
                  </li>
                </ul>
                <p>
                  The limitations and prohibitions of liability set in this
                  Section and elsewhere in this disclaimer: (a) are subject to
                  the preceding paragraph; and (b) govern all liabilities
                  arising under the disclaimer, including liabilities arising in
                  contract, in tort and for breach of statutory duty. As long as
                  the website and the information and services on the website
                  are provided free of charge, we will not be liable for any
                  loss or damage of any nature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermAndConditions;
