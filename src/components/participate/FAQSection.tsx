import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type FAQItem } from './data/types';

interface FAQSectionProps {
  faqData: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqData }) => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      {faqData.map((faq) => (
        <div key={faq.id} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-3 sm:px-4 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm sm:text-base font-medium text-gray-900 pr-2">
              {faq.question}
            </span>
            {expandedFAQ === faq.id ? (
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {expandedFAQ === faq.id && (
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
