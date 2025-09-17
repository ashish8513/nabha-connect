import { useState } from "react";
import { X, HelpCircle } from "lucide-react";

interface FAQButtonProps {
  language: string;
}

export const FAQButton = ({ language }: FAQButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const faqData = {
    en: [
      {
        question: "What are the common health issues in Nabha?",
        answer: "People in Nabha often face lifestyle-related issues like diabetes, hypertension (high BP), heart problems, obesity, and seasonal diseases like dengue, viral fever, and respiratory infections."
      },
      {
        question: "How can I keep myself healthy on a daily basis?",
        answer: "Eat a balanced diet (fruits, vegetables, pulses, milk). Drink clean water and avoid excessive junk food. Do at least 30 minutes of exercise daily (walking, yoga, cycling). Sleep for 7–8 hours regularly. Avoid smoking, alcohol, and tobacco."
      },
      {
        question: "Where can I go for medical help in Nabha?",
        answer: "Government Hospitals & Community Health Centres, Private Clinics in the city, Pharmacies for basic medicines. In emergencies, call 108 Ambulance Service."
      },
      {
        question: "How can I prevent seasonal diseases like dengue and malaria?",
        answer: "Don't let water collect in open containers. Use mosquito nets or repellents. Keep your surroundings clean and dry. Wear full-sleeved clothes in the rainy season."
      },
      {
        question: "What should I do if I feel symptoms of diabetes or high BP?",
        answer: "Get your sugar and BP checked regularly at a nearby clinic. If you feel excessive thirst, frequent urination, headache, or dizziness, consult a doctor immediately. Follow the doctor's advice on diet, medicines, and lifestyle changes."
      },
      {
        question: "Are there any free health check-up camps in Nabha?",
        answer: "Yes, from time to time the local government hospitals and NGOs organize free camps for blood pressure, sugar, eye check-ups, and vaccination drives. Stay updated through local news, panchayat announcements, or hospital notices."
      },
      {
        question: "How can I improve my children's health?",
        answer: "Give them nutritious food (green veggies, milk, eggs, pulses). Ensure they get vaccinations on time. Encourage them to play outdoor games instead of only mobile/TV. Teach them handwashing and hygiene habits."
      },
      {
        question: "What mental health support is available in Nabha?",
        answer: "Government hospitals have counselors and psychiatrists. You can also talk to local NGOs working in mental health. Simple steps like talking to family, meditation, yoga, and keeping a routine help improve mental well-being."
      },
      {
        question: "How do I know if the water I'm drinking is safe?",
        answer: "Use boiled or filtered water. If water looks muddy or smells bad, avoid drinking. Contact the local municipal board for water supply issues."
      },
      {
        question: "Where can I get emergency help quickly?",
        answer: "Dial 108 for Ambulance Service. Government Hospital, Nabha is the nearest emergency care provider. Keep a list of nearby private clinics and pharmacy numbers handy."
      }
    ],
    hi: [
      {
        question: "नाभा में आम स्वास्थ्य समस्याएं क्या हैं?",
        answer: "नाभा के लोगों को अक्सर जीवनशैली से जुड़ी समस्याएं जैसे मधुमेह, उच्च रक्तचाप, हृदय रोग, मोटापा, और मौसमी बीमारियां जैसे डेंगू, वायरल बुखार और श्वसन संक्रमण का सामना करना पड़ता है।"
      },
      {
        question: "मैं रोजाना खुद को स्वस्थ कैसे रख सकता हूं?",
        answer: "संतुलित आहार लें (फल, सब्जियां, दाल, दूध)। साफ पानी पिएं और अत्यधिक जंक फूड से बचें। रोजाना कम से कम 30 मिनट व्यायाम करें (चलना, योग, साइकिल चलाना)। नियमित रूप से 7-8 घंटे सोएं। धूम्रपान, शराब और तंबाकू से बचें।"
      },
      {
        question: "नाभा में मैं चिकित्सा सहायता के लिए कहां जा सकता हूं?",
        answer: "सरकारी अस्पताल और सामुदायिक स्वास्थ्य केंद्र, शहर में निजी क्लीनिक, बुनियादी दवाओं के लिए फार्मेसी। आपातकाल में 108 एम्बुलेंस सेवा पर कॉल करें।"
      },
      {
        question: "मैं डेंगू और मलेरिया जैसी मौसमी बीमारियों को कैसे रोक सकता हूं?",
        answer: "खुले कंटेनरों में पानी जमा न होने दें। मच्छरदानी या रिपेलेंट का उपयोग करें। अपने आसपास को साफ और सूखा रखें। बरसात के मौसम में पूरी आस्तीन के कपड़े पहनें।"
      },
      {
        question: "अगर मुझे मधुमेह या उच्च रक्तचाप के लक्षण महसूस हों तो मुझे क्या करना चाहिए?",
        answer: "पास के क्लीनिक में अपनी शुगर और बीपी नियमित रूप से जांच कराएं। अगर आपको अत्यधिक प्यास, बार-बार पेशाब, सिरदर्द या चक्कर आते हैं, तो तुरंत डॉक्टर से सलाह लें। आहार, दवाओं और जीवनशैली में बदलाव के लिए डॉक्टर की सलाह का पालन करें।"
      },
      {
        question: "क्या नाभा में कोई मुफ्त स्वास्थ्य जांच शिविर हैं?",
        answer: "हां, समय-समय पर स्थानीय सरकारी अस्पताल और एनजीओ रक्तचाप, शुगर, आंखों की जांच और टीकाकरण अभियान के लिए मुफ्त शिविर आयोजित करते हैं। स्थानीय समाचार, पंचायत घोषणाओं या अस्पताल नोटिस के माध्यम से अपडेट रहें।"
      },
      {
        question: "मैं अपने बच्चों के स्वास्थ्य को कैसे सुधार सकता हूं?",
        answer: "उन्हें पौष्टिक भोजन दें (हरी सब्जियां, दूध, अंडे, दाल)। सुनिश्चित करें कि उन्हें समय पर टीकाकरण मिले। उन्हें केवल मोबाइल/टीवी के बजाय बाहरी खेल खेलने के लिए प्रोत्साहित करें। उन्हें हाथ धोने और स्वच्छता की आदतें सिखाएं।"
      },
      {
        question: "नाभा में क्या मानसिक स्वास्थ्य सहायता उपलब्ध है?",
        answer: "सरकारी अस्पतालों में काउंसलर और मनोचिकित्सक हैं। आप मानसिक स्वास्थ्य में काम करने वाली स्थानीय एनजीओ से भी बात कर सकते हैं। परिवार से बात करना, ध्यान, योग और दिनचर्या बनाए रखना जैसे सरल कदम मानसिक कल्याण में सुधार करने में मदद करते हैं।"
      },
      {
        question: "मुझे कैसे पता चलेगा कि मैं जो पानी पी रहा हूं वह सुरक्षित है?",
        answer: "उबला हुआ या फिल्टर किया हुआ पानी पिएं। अगर पानी गंदा दिखता है या बदबू आती है तो पीने से बचें। जल आपूर्ति की समस्याओं के लिए स्थानीय नगर पालिका से संपर्क करें।"
      },
      {
        question: "मैं जल्दी आपातकालीन सहायता कहां से प्राप्त कर सकता हूं?",
        answer: "एम्बुलेंस सेवा के लिए 108 डायल करें। नाभा का सरकारी अस्पताल निकटतम आपातकालीन देखभाल प्रदाता है। पास के निजी क्लीनिक और फार्मेसी नंबरों की सूची तैयार रखें।"
      }
    ],
    pa: [
      {
        question: "ਨਾਭਾ ਵਿੱਚ ਆਮ ਸਿਹਤ ਸਮੱਸਿਆਵਾਂ ਕੀ ਹਨ?",
        answer: "ਨਾਭਾ ਦੇ ਲੋਕਾਂ ਨੂੰ ਅਕਸਰ ਜੀਵਨਸ਼ੈਲੀ ਨਾਲ ਜੁੜੀਆਂ ਸਮੱਸਿਆਵਾਂ ਜਿਵੇਂ ਮਧੂਮੇਹ, ਉੱਚ ਰਕਤਚਾਪ, ਦਿਲ ਦੀਆਂ ਬੀਮਾਰੀਆਂ, ਮੋਟਾਪਾ, ਅਤੇ ਮੌਸਮੀ ਬੀਮਾਰੀਆਂ ਜਿਵੇਂ ਡੈਂਗੂ, ਵਾਇਰਲ ਬੁਖਾਰ ਅਤੇ ਸਾਹ ਦੇ ਰੋਗਾਂ ਦਾ ਸਾਮਣਾ ਕਰਨਾ ਪੈਂਦਾ ਹੈ।"
      },
      {
        question: "ਮੈਂ ਰੋਜ਼ਾਨਾ ਆਪਣੇ ਆਪ ਨੂੰ ਸਿਹਤਮੰਦ ਕਿਵੇਂ ਰੱਖ ਸਕਦਾ ਹਾਂ?",
        answer: "ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਲਓ (ਫਲ, ਸਬਜ਼ੀਆਂ, ਦਾਲ, ਦੁੱਧ)। ਸਾਫ਼ ਪਾਣੀ ਪੀਓ ਅਤੇ ਜ਼ਿਆਦਾ ਜੰਕ ਫੂਡ ਤੋਂ ਬਚੋ। ਰੋਜ਼ਾਨਾ ਘੱਟੋ-ਘੱਟ 30 ਮਿੰਟ ਕਸਰਤ ਕਰੋ (ਚਲਣਾ, ਯੋਗ, ਸਾਈਕਲਿੰਗ)। ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ 7-8 ਘੰਟੇ ਸੌਓ। ਸਿਗਰਟ, ਸ਼ਰਾਬ ਅਤੇ ਤੰਬਾਕੂ ਤੋਂ ਬਚੋ।"
      },
      {
        question: "ਨਾਭਾ ਵਿੱਚ ਮੈਂ ਮੈਡੀਕਲ ਸਹਾਇਤਾ ਲਈ ਕਿੱਥੇ ਜਾ ਸਕਦਾ ਹਾਂ?",
        answer: "ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਅਤੇ ਕਮਿਊਨਿਟੀ ਹੈਲਥ ਸੈਂਟਰ, ਸ਼ਹਿਰ ਵਿੱਚ ਪ੍ਰਾਈਵੇਟ ਕਲੀਨਿਕ, ਬੁਨਿਆਦੀ ਦਵਾਈਆਂ ਲਈ ਫਾਰਮੇਸੀ। ਐਮਰਜੈਂਸੀ ਵਿੱਚ 108 ਐਂਬੂਲੈਂਸ ਸਰਵਿਸ 'ਤੇ ਕਾਲ ਕਰੋ।"
      },
      {
        question: "ਮੈਂ ਡੈਂਗੂ ਅਤੇ ਮਲੇਰੀਆ ਵਰਗੀਆਂ ਮੌਸਮੀ ਬੀਮਾਰੀਆਂ ਨੂੰ ਕਿਵੇਂ ਰੋਕ ਸਕਦਾ ਹਾਂ?",
        answer: "ਖੁੱਲ੍ਹੇ ਕੰਟੇਨਰਾਂ ਵਿੱਚ ਪਾਣੀ ਇਕੱਠਾ ਨਾ ਹੋਣ ਦਿਓ। ਮੱਛਰਦਾਨੀ ਜਾਂ ਰਿਪੈਲੈਂਟ ਦਾ ਇਸਤੇਮਾਲ ਕਰੋ। ਆਪਣੇ ਆਸ-ਪਾਸ ਨੂੰ ਸਾਫ਼ ਅਤੇ ਸੁੱਕਾ ਰੱਖੋ। ਬਰਸਾਤ ਦੇ ਮੌਸਮ ਵਿੱਚ ਪੂਰੀ ਆਸਤੀਨ ਦੇ ਕੱਪੜੇ ਪਾਓ।"
      },
      {
        question: "ਜੇ ਮੈਨੂੰ ਮਧੂਮੇਹ ਜਾਂ ਉੱਚ ਰਕਤਚਾਪ ਦੇ ਲੱਛਣ ਮਹਿਸੂਸ ਹੋਣ ਤਾਂ ਮੈਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
        answer: "ਨੇੜਲੇ ਕਲੀਨਿਕ ਵਿੱਚ ਆਪਣੀ ਸ਼ੁਗਰ ਅਤੇ ਬੀਪੀ ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ ਚੈਕ ਕਰਾਓ। ਜੇ ਤੁਹਾਨੂੰ ਜ਼ਿਆਦਾ ਪਿਆਸ, ਬਾਰ-ਬਾਰ ਪਿਸ਼ਾਬ, ਸਿਰਦਰਦ ਜਾਂ ਚਕਰ ਆਉਂਦੇ ਹਨ, ਤਾਂ ਤੁਰੰਤ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਲਓ। ਖੁਰਾਕ, ਦਵਾਈਆਂ ਅਤੇ ਜੀਵਨਸ਼ੈਲੀ ਵਿੱਚ ਬਦਲਾਅ ਲਈ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਦਾ ਪਾਲਣ ਕਰੋ।"
      },
      {
        question: "ਕੀ ਨਾਭਾ ਵਿੱਚ ਕੋਈ ਮੁਫ਼ਤ ਸਿਹਤ ਚੈਕ-ਅੱਪ ਕੈਂਪ ਹਨ?",
        answer: "ਹਾਂ, ਸਮੇਂ-ਸਮੇਂ 'ਤੇ ਸਥਾਨਕ ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਅਤੇ ਐਨਜੀਓ ਰਕਤਚਾਪ, ਸ਼ੁਗਰ, ਅੱਖਾਂ ਦੀ ਜਾਂਚ ਅਤੇ ਟੀਕਾਕਰਣ ਮੁਹਿੰਮਾਂ ਲਈ ਮੁਫ਼ਤ ਕੈਂਪ ਆਯੋਜਿਤ ਕਰਦੇ ਹਨ। ਸਥਾਨਕ ਖਬਰਾਂ, ਪੰਚਾਇਤ ਐਲਾਨਾਂ ਜਾਂ ਹਸਪਤਾਲ ਨੋਟਿਸਾਂ ਦੇ ਰਾਹੀਂ ਅਪਡੇਟ ਰਹੋ।"
      },
      {
        question: "ਮੈਂ ਆਪਣੇ ਬੱਚਿਆਂ ਦੀ ਸਿਹਤ ਨੂੰ ਕਿਵੇਂ ਸੁਧਾਰ ਸਕਦਾ ਹਾਂ?",
        answer: "ਉਨ੍ਹਾਂ ਨੂੰ ਪੌਸ਼ਟਿਕ ਭੋਜਨ ਦਿਓ (ਹਰੀਆਂ ਸਬਜ਼ੀਆਂ, ਦੁੱਧ, ਅੰਡੇ, ਦਾਲ)। ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਉਨ੍ਹਾਂ ਨੂੰ ਸਮੇਂ 'ਤੇ ਟੀਕਾਕਰਣ ਮਿਲੇ। ਉਨ੍ਹਾਂ ਨੂੰ ਸਿਰਫ਼ ਮੋਬਾਈਲ/ਟੀਵੀ ਦੀ ਬਜਾਏ ਬਾਹਰੀ ਖੇਡਾਂ ਖੇਡਣ ਲਈ ਉਤਸ਼ਾਹਿਤ ਕਰੋ। ਉਨ੍ਹਾਂ ਨੂੰ ਹੱਥ ਧੋਣ ਅਤੇ ਸਫ਼ਾਈ ਦੀਆਂ ਆਦਤਾਂ ਸਿਖਾਓ।"
      },
      {
        question: "ਨਾਭਾ ਵਿੱਚ ਕੀ ਮਾਨਸਿਕ ਸਿਹਤ ਸਹਾਇਤਾ ਉਪਲਬਧ ਹੈ?",
        answer: "ਸਰਕਾਰੀ ਹਸਪਤਾਲਾਂ ਵਿੱਚ ਕਾਉਂਸਲਰ ਅਤੇ ਮਨੋਵਿਗਿਆਨੀ ਹਨ। ਤੁਸੀਂ ਮਾਨਸਿਕ ਸਿਹਤ ਵਿੱਚ ਕੰਮ ਕਰਨ ਵਾਲੀਆਂ ਸਥਾਨਕ ਐਨਜੀਓ ਨਾਲ ਵੀ ਗੱਲ ਕਰ ਸਕਦੇ ਹੋ। ਪਰਿਵਾਰ ਨਾਲ ਗੱਲ ਕਰਨਾ, ਧਿਆਨ, ਯੋਗ ਅਤੇ ਦਿਨਚਰਿਆ ਬਣਾਈ ਰੱਖਣਾ ਵਰਗੇ ਸਧਾਰਨ ਕਦਮ ਮਾਨਸਿਕ ਭਲਾਈ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।"
      },
      {
        question: "ਮੈਨੂੰ ਕਿਵੇਂ ਪਤਾ ਚਲੇਗਾ ਕਿ ਮੈਂ ਜੋ ਪਾਣੀ ਪੀ ਰਿਹਾ ਹਾਂ ਉਹ ਸੁਰੱਖਿਤ ਹੈ?",
        answer: "ਉਬਲਿਆ ਹੋਇਆ ਜਾਂ ਫਿਲਟਰ ਕੀਤਾ ਹੋਇਆ ਪਾਣੀ ਪੀਓ। ਜੇ ਪਾਣੀ ਗੰਦਾ ਦਿਖਦਾ ਹੈ ਜਾਂ ਬਦਬੂ ਆਉਂਦੀ ਹੈ ਤਾਂ ਪੀਣ ਤੋਂ ਬਚੋ। ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਲਈ ਸਥਾਨਕ ਨਗਰ ਪਾਲਿਕਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।"
      },
      {
        question: "ਮੈਂ ਜਲਦੀ ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ ਕਿੱਥੋਂ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦਾ ਹਾਂ?",
        answer: "ਐਂਬੂਲੈਂਸ ਸਰਵਿਸ ਲਈ 108 ਡਾਇਲ ਕਰੋ। ਨਾਭਾ ਦਾ ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਨੇੜਲਾ ਐਮਰਜੈਂਸੀ ਕੇਅਰ ਪ੍ਰਦਾਤਾ ਹੈ। ਨੇੜਲੇ ਪ੍ਰਾਈਵੇਟ ਕਲੀਨਿਕ ਅਤੇ ਫਾਰਮੇਸੀ ਨੰਬਰਾਂ ਦੀ ਸੂਚੀ ਤਿਆਰ ਰੱਖੋ।"
      }
    ]
  };

  const faqs = faqData[language as keyof typeof faqData] || faqData.en;

  const translations = {
    en: {
      title: "Frequently Asked Questions",
      close: "Close"
    },
    hi: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      close: "बंद करें"
    },
    pa: {
      title: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
      close: "ਬੰਦ ਕਰੋ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <>
      {/* Floating FAQ Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Open FAQ"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* FAQ Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close FAQ"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {index + 1}. {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};






