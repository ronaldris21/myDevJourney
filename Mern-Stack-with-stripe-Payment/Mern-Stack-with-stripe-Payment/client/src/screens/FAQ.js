import React from 'react';
import Head from '../components/Head';
import Layout from '../layout/Layout';
import { Disclosure } from '@headlessui/react';
import { FiChevronUp } from 'react-icons/fi';

function FAQPage() {
  const FAQData = [
    {
      title: 'How does the OnlineShop Market work?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
    {
      title: 'Can I cancel my subscription anytime?',
      desc: 'Distinctively initiate error-free channels with highly efficient ROI. Intrinsicly envisioneer world-class data via best-of-breed best practices. Efficiently enable empowered e-tailers after cross-unit services. Uniquely expedite seamless e-tailers via cooperative interfaces. Monotonectally myocardinate customer directed meta-services whereas error-free scenarios.',
    },
    {
      title: 'Whice payment method you should accept?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
    {
      title: 'Can I cancel my subscription anytime?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
    {
      title: 'What is OnlineShop Market EC2 auto scaling?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
    {
      title: ' What are the benefits of using OnlineShop Market affliate?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
    {
      title: 'What is a affliates product configuration?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
    {
      title:
        'What is fleet management and how is it different from dynamic scaling?',
      desc: ' Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.',
    },
  ];
  return (
    <Layout header={true}>
      <div className="min-h-screen container mx-auto px-4 my-6">
        <Head title="FAQ" />
        <div className="bg-white">
          <div className=" lg:py-20 py-10 lg:px-4">
            <div className="flex-rows">
              <div className="lg:w-4/6 w-full flex flex-col gap-4">
                {FAQData.map((q, i) => (
                  <Disclosure as="div" key={i}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-main bg-gray-50 hover:bg-deepest rounded-lg focus:outline-none">
                          <span>{q.title}</span>
                          <FiChevronUp
                            className={`${
                              open ? 'transform rotate-180 text-main' : ''
                            } w-5 h-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
                          {q.desc}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FAQPage;
