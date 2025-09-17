import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HealthcareNav } from "@/components/HealthcareNav";
import { VideoConsultSection } from "@/components/VideoConsultSection";
import { MedicineFinderSection } from "@/components/MedicineFinderSection";
import { SymptomChecker } from "@/components/SymptomChecker";
import { HealthRecords } from "@/components/HealthRecords";
import { EmergencyServices } from "@/components/EmergencyServices";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { OTPLogin } from "@/components/auth/OTPLogin";
import { FAQButton } from "@/components/FAQButton";
import { HomeRemedies } from "@/components/HomeRemedies";
import { Profile } from "@/components/Profile";
import heroImage from "@/assets/healthcare-hero.jpg";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<string>("consult");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState<string>("");

  const translations = {
    en: {
      welcome: "Welcome to NabhaCare Connect",
      subtitle: "Bridging healthcare gaps across 173 villages of Nabha",
      getStarted: "Get Started",
      heroDescription:
        "Crystal-clear teleconsultations, real-time medicine tracking, and AI-powered health guidance - all in your language.",
    },
    hi: {
      welcome: "NabhaCare Connect में आपका स्वागत है",
      subtitle: "नाभा के 173 गांवों में स्वास्थ्य सेवा की कमी को पाटना",
      getStarted: "शुरू करें",
      heroDescription:
        "क्रिस्टल-क्लियर टेलीकंसल्टेशन, रियल टाइम दवा ट्रैकिंग, और AI-संचालित स्वास्थ्य मार्गदर्शन - सब आपकी भाषा में।",
    },
    pa: {
      welcome: "NabhaCare Connect ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
      subtitle: "ਨਾਭਾ ਦੇ 173 ਪਿੰਡਾਂ ਵਿੱਚ ਸਿਹਤ ਸੇਵਾ ਦੀ ਕਮੀ ਨੂੰ ਪਾਟਣਾ",
      getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
      heroDescription:
        "ਕ੍ਰਿਸਟਲ-ਕਲੀਅਰ ਟੈਲੀਕੰਸਲਟੇਸ਼ਨ, ਰੀਅਲ ਟਾਈਮ ਦਵਾਈ ਟ੍ਰੈਕਿੰਗ, ਅਤੇ AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਮਾਰਗਦਰਸ਼ਨ - ਸਭ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ।",
    },
  };

  // Show language selection first
  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Healthcare in Punjab"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          </div>

          <div className="relative min-h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground gradient-hero bg-clip-text text-transparent">
                  NabhaCare Connect
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Bridging healthcare gaps across 173 villages of Nabha • नाभा के
                  173 गांवों में स्वास्थ्य सेवा की कमी को पाटना • ਨਾਭਾ ਦੇ 173
                  ਪਿੰਡਾਂ ਵਿੱਚ ਸਿਹਤ ਸੇਵਾ ਦੀ ਕਮੀ ਨੂੰ ਪਾਟਣਾ
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <LanguageSelector
                  onLanguageSelect={setSelectedLanguage}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login after language selection
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Healthcare in Punjab"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
          </div>

          <div className="relative min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  NabhaCare Connect
                </h1>
                <p className="text-muted-foreground">
                  {selectedLanguage === "hi"
                    ? "सुरक्षित लॉगिन"
                    : selectedLanguage === "pa"
                    ? "ਸੁਰੱਖਿਤ ਲਾਗਇਨ"
                    : "Secure Login"}
                </p>
              </div>
              <OTPLogin
                onLoginSuccess={(phone) => {
                  setIsLoggedIn(true);
                  setUserPhone(phone); // ✅ Save logged-in user phone
                }}
                language={selectedLanguage}
              />
              <div className="text-center mt-6">
                <button
                  onClick={() => setSelectedLanguage("")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Change Language
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const t =
    translations[selectedLanguage as keyof typeof translations] ||
    translations.en;

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone("");
    setSelectedLanguage("");
    setCurrentSection("consult");
  };

  const renderSection = () => {
    switch (currentSection) {
      case "consult":
        return <VideoConsultSection language={selectedLanguage} />;
      case "medicines":
        return <MedicineFinderSection language={selectedLanguage} />;
      case "appointments":
        return <AppointmentBooking language={selectedLanguage} />;
      case "records":
        return <HealthRecords language={selectedLanguage} />;
      case "symptoms":
        return <SymptomChecker language={selectedLanguage} />;
      case "remedies":
        return <HomeRemedies language={selectedLanguage} />;
      case "profile":
        return (
          <Profile
            language={selectedLanguage}
            userPhone={userPhone}
            onLanguageChange={handleLanguageChange}
            onLogout={handleLogout}
          />
        );
      case "emergency":
        return (
          <EmergencyServices
            language={selectedLanguage}
            userPhone={userPhone} // ✅ Pass user phone here
          />
        );
      default:
        return <VideoConsultSection language={selectedLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HealthcareNav
        onNavigate={setCurrentSection}
        currentSection={currentSection}
        language={selectedLanguage}
      />
      <main className="py-8">{renderSection()}</main>
      <FAQButton language={selectedLanguage} />
    </div>
  );
};

export default Index;







// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { Phone, AlertTriangle } from "lucide-react";

// interface EmergencyServicesProps {
//   language: string;
// }

// export const EmergencyServices = ({ language }: EmergencyServicesProps) => {
//   const { toast } = useToast();

//   const translations = {
//     en: {
//       title: "Emergency Services",
//       sos: "Send SOS SMS",
//       call: "Call 108 (Ambulance)",
//       sosSent: "SOS alert sent successfully!",
//       callPlaced: "Emergency call triggered!",
//       error: "Something went wrong, please try again.",
//     },
//     hi: {
//       title: "आपातकालीन सेवाएँ",
//       sos: "SOS SMS भेजें",
//       call: "108 (एम्बुलेंस) पर कॉल करें",
//       sosSent: "SOS अलर्ट सफलतापूर्वक भेजा गया!",
//       callPlaced: "आपातकालीन कॉल किया गया!",
//       error: "कुछ गलत हो गया, कृपया पुनः प्रयास करें।",
//     },
//     pa: {
//       title: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
//       sos: "SOS SMS ਭੇਜੋ",
//       call: "108 (ਐਂਬੂਲੈਂਸ) ਤੇ ਕਾਲ ਕਰੋ",
//       sosSent: "SOS ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ!",
//       callPlaced: "ਐਮਰਜੈਂਸੀ ਕਾਲ ਲਗਾਇਆ ਗਿਆ!",
//       error: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
//     },
//   };

//   const t = translations[language as keyof typeof translations] || translations.en;

//   const handleSendSOS = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/sms/send-sos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: "🚨 SOS Alert! Immediate help needed." }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast({ title: "Success", description: t.sosSent });
//       } else {
//         toast({ title: "Error", description: t.error, variant: "destructive" });
//       }
//     } catch (err) {
//       toast({ title: "Error", description: t.error, variant: "destructive" });
//     }
//   };

//   const handleCall108 = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/call/emergency", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast({ title: "Success", description: t.callPlaced });
//       } else {
//         toast({ title: "Error", description: t.error, variant: "destructive" });
//       }
//     } catch (err) {
//       toast({ title: "Error", description: t.error, variant: "destructive" });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 space-y-6 border rounded-xl shadow-sm">
//       <h2 className="text-2xl font-bold text-center">{t.title}</h2>

//       <Button onClick={handleSendSOS} className="w-full bg-red-600 hover:bg-red-700">
//         <AlertTriangle className="w-5 h-5 mr-2" />
//         {t.sos}
//       </Button>

//       <Button onClick={handleCall108} className="w-full bg-blue-600 hover:bg-blue-700">
//         <Phone className="w-5 h-5 mr-2" />
//         {t.call}
//       </Button>
//     </div>
//   );
// };




// import { useState } from "react";
// import { LanguageSelector } from "@/components/LanguageSelector";
// import { HealthcareNav } from "@/components/HealthcareNav";
// import { VideoConsultSection } from "@/components/VideoConsultSection";
// import { MedicineFinderSection } from "@/components/MedicineFinderSection";
// import { SymptomChecker } from "@/components/SymptomChecker";
// import { HealthRecords } from "@/components/HealthRecords";
// import { EmergencyServices } from "@/components/EmergencyServices";
// import { AppointmentBooking } from "@/components/AppointmentBooking";
// import { OTPLogin } from "@/components/auth/OTPLogin";
// import heroImage from "@/assets/healthcare-hero.jpg";

// const Index = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState<string>("");
//   const [currentSection, setCurrentSection] = useState<string>("consult");
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userPhone, setUserPhone] = useState<string>("");

//   const translations = {
//     en: {
//       welcome: "Welcome to NabhaCare Connect",
//       subtitle: "Bridging healthcare gaps across 173 villages of Nabha",
//       getStarted: "Get Started",
//       heroDescription: "Crystal-clear teleconsultations, real-time medicine tracking, and AI-powered health guidance - all in your language."
//     },
//     hi: {
//       welcome: "NabhaCare Connect में आपका स्वागत है",
//       subtitle: "नाभा के 173 गांवों में स्वास्थ्य सेवा की कमी को पाटना",
//       getStarted: "शुरू करें",
//       heroDescription: "क्रिस्टल-क्लियर टेलीकंसल्टेशन, रियल टाइम दवा ट्रैकिंग, और AI-संचालित स्वास्थ्य मार्गदर्शन - सब आपकी भाषा में।"
//     },
//     pa: {
//       welcome: "NabhaCare Connect ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
//       subtitle: "ਨਾਭਾ ਦੇ 173 ਪਿੰਡਾਂ ਵਿੱਚ ਸਿਹਤ ਸੇਵਾ ਦੀ ਕਮੀ ਨੂੰ ਪਾਟਣਾ",
//       getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
//       heroDescription: "ਕ੍ਰਿਸਟਲ-ਕਲੀਅਰ ਟੈਲੀਕੰਸਲਟੇਸ਼ਨ, ਰੀਅਲ ਟਾਈਮ ਦਵਾਈ ਟ੍ਰੈਕਿੰਗ, ਅਤੇ AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਮਾਰਗਦਰਸ਼ਨ - ਸਭ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ।"
//     }
//   };

//   // Show language selection first
//   if (!selectedLanguage) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0">
//             <img 
//               src={heroImage} 
//               alt="Healthcare in Punjab"
//               className="w-full h-full object-cover opacity-20"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
//           </div>
          
//           <div className="relative min-h-screen flex items-center justify-center p-6">
//             <div className="max-w-4xl mx-auto text-center space-y-8">
//               <div className="space-y-4">
//                 <h1 className="text-4xl md:text-6xl font-bold text-foreground gradient-hero bg-clip-text text-transparent">
//                   NabhaCare Connect
//                 </h1>
//                 <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//                   Bridging healthcare gaps across 173 villages of Nabha • नाभा के 173 गांवों में स्वास्थ्य सेवा की कमी को पाटना • ਨਾਭਾ ਦੇ 173 ਪਿੰਡਾਂ ਵਿੱਚ ਸਿਹਤ ਸੇਵਾ ਦੀ ਕਮੀ ਨੂੰ ਪਾਟਣਾ
//                 </p>
//               </div>
              
//               <div className="max-w-md mx-auto">
//                 <LanguageSelector 
//                   onLanguageSelect={setSelectedLanguage}
//                   selectedLanguage={selectedLanguage}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show login after language selection
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0">
//             <img 
//               src={heroImage} 
//               alt="Healthcare in Punjab"
//               className="w-full h-full object-cover opacity-10"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
//           </div>
          
//           <div className="relative min-h-screen flex items-center justify-center p-6">
//             <div className="w-full max-w-md">
//               <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold text-foreground mb-2">
//                   NabhaCare Connect
//                 </h1>
//                 <p className="text-muted-foreground">
//                   {selectedLanguage === 'hi' ? 'सुरक्षित लॉगिन' : 
//                    selectedLanguage === 'pa' ? 'ਸੁਰੱਖਿਤ ਲਾਗਇਨ' : 'Secure Login'}
//                 </p>
//               </div>
//               <OTPLogin 
//                 onLoginSuccess={(phone) => {
//                   setIsLoggedIn(true);
//                   setUserPhone(phone);
//                 }}
//                 language={selectedLanguage}
//               />
//               <div className="text-center mt-6">
//                 <button 
//                   onClick={() => setSelectedLanguage("")}
//                   className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   ← Change Language
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

//   const renderSection = () => {
//     switch (currentSection) {
//       case 'consult':
//         return <VideoConsultSection language={selectedLanguage} />;
//       case 'medicines':
//         return <MedicineFinderSection language={selectedLanguage} />;
//       case 'appointments':
//         return <AppointmentBooking language={selectedLanguage} />;
//       case 'records':
//         return <HealthRecords language={selectedLanguage} />;
//       case 'symptoms':
//         return <SymptomChecker language={selectedLanguage} />;
//       case 'emergency':
//         return <EmergencyServices language={selectedLanguage} />;
//       default:
//         return <VideoConsultSection language={selectedLanguage} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <HealthcareNav 
//         onNavigate={setCurrentSection}
//         currentSection={currentSection}
//         language={selectedLanguage}
//       />
//       <main className="py-8">
//         {renderSection()}
//       </main>
//     </div>
//   );
// };

// export default Index;