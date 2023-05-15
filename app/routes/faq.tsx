import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "Is SQLtroughAI worth the monthly cost?",
    answer:
      "The last time we checked the average Data Analyst salary in the US at approximately $75,000, translating to an hourly wage of around $39.  If you save 1.2 minutes per workday trough SQLtroughAI, our service becomes a mutually beneficial investment for both you and us. Boost your efficiency and profitability with our expert solutions today!"
  },
  {
    question: "What does SQLthroughAI do?",
    answer:
      "SQLthroughAI is a tool that enables users to create SQL (Structured Query Language) statements with ease based on their input. Users can skip the hassle of writing the code themselves, which can save them time and prevent errors. This makes SQLtroughAI a convenient tool for developers, database administrators, and other professionals who work with SQL."
  },
  {
    question: "How to cancel my subscription?",
    answer:
      "It's easy to cancel your subscribtion. We use Stripe as our payment processor. You can cancel your subscribtion at any time to the end of the month by pressing the User button in the header and then pressing the cancel button."
  },
  {
    question: "Which natural languages does SQLthroughAI support?",
    answer:
      "SQLthroughAI currently supports English. We are working on adding more languages in the future."
  },
  {
    question: "Is there a free Trial?",
    answer:
      "Yes! You can try the tool for free for 14 days. After that, you can choose to subscribe to a plan or cancel your account."
  },
  {
    question: "Other Questions regarding SQLthroughAI?",
    answer:
      "Scroll a bit further down to find the contact information for our support team."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleActiveIndex = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Frequently Asked Questions</h1>
        </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
    
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <button
              className="w-full flex items-center justify-between px-4 py-2"
              onClick={() => toggleActiveIndex(index)}
            >
              <span className="font-medium">{faq.question}</span>
              {activeIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {activeIndex === index && (
              <div className="px-4 py-2">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;