import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Calendar, 
  FileText, 
  Pill, 
  Heart, 
  Shield, 
  User, 
  Globe,
  Home
} from "lucide-react";

interface HealthcareNavProps {
  onNavigate: (section: string) => void;
  currentSection: string;
  language: string;
}

const navigationItems = {
  en: [
    { key: 'consult', label: 'Video Consult', icon: Phone },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
    { key: 'records', label: 'Health Records', icon: FileText },
    { key: 'medicines', label: 'Find Medicine', icon: Pill },
    { key: 'symptoms', label: 'Check Symptoms', icon: Heart },
    { key: 'remedies', label: 'Home Remedies', icon: Home },
    { key: 'emergency', label: 'Emergency', icon: Shield }
  ],
  hi: [
    { key: 'consult', label: 'वीडियो परामर्श', icon: Phone },
    { key: 'appointments', label: 'अपॉइंटमेंट', icon: Calendar },
    { key: 'records', label: 'स्वास्थ्य रिकॉर्ड', icon: FileText },
    { key: 'medicines', label: 'दवा खोजें', icon: Pill },
    { key: 'symptoms', label: 'लक्षण जांचें', icon: Heart },
    { key: 'remedies', label: 'घरेलू उपचार', icon: Home },
    { key: 'emergency', label: 'आपातकाल', icon: Shield }
  ],
  pa: [
    { key: 'consult', label: 'ਵੀਡੀਓ ਸਲਾਹ', icon: Phone },
    { key: 'appointments', label: 'ਮੁਲਾਕਾਤਾਂ', icon: Calendar },
    { key: 'records', label: 'ਸਿਹਤ ਰਿਕਾਰਡ', icon: FileText },
    { key: 'medicines', label: 'ਦਵਾਈ ਲੱਭੋ', icon: Pill },
    { key: 'symptoms', label: 'ਲੱਛਣ ਜਾਂਚੋ', icon: Heart },
    { key: 'remedies', label: 'ਘਰੇਲੂ ਇਲਾਜ', icon: Home },
    { key: 'emergency', label: 'ਐਮਰਜੈਂਸੀ', icon: Shield }
  ]
};

export const HealthcareNav = ({ onNavigate, currentSection, language }: HealthcareNavProps) => {
  const items = navigationItems[language as keyof typeof navigationItems] || navigationItems.en;

  return (
    <nav className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary">NabhaCare Connect</h1>
          <Button 
            variant={currentSection === 'profile' ? "default" : "outline"}
            size="sm" 
            className={`gap-2 ${currentSection === 'profile' ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => onNavigate('profile')}
          >
            <Globe className="h-4 w-4" />
            <User className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.key;
            
            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "outline"}
                size="lg"
                className={`touch-target flex flex-col gap-2 h-auto py-4 transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-healthcare scale-105' 
                    : 'hover:bg-muted hover:scale-[1.02]'
                }`}
                onClick={() => onNavigate(item.key)}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium leading-tight text-center">
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};