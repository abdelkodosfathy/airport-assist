// app/frequently-asked-questions/page.tsx

import { faqData } from "./faq-data";
import FAQItem from "./FAQItem";


export default function FaqqsPage() {
  return (
    <div>
      <h2 className="text-4xl mb-12">FAQ</h2>

      <div className="space-y-7.5">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
