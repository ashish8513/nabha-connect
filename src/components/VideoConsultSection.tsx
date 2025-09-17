import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  Clock, 
  Star, 
  Phone, 
  Calendar,
  MapPin,
  Shield,
  Heart
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  languages: string[];
  availability: 'available' | 'busy' | 'offline';
  nextSlot?: string;
  location: string;
  consultationFee: number;
  phone: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Jai Kishan',
    specialty: 'TB & Chest Specialist',
    rating: 4.8,
    experience: 12,
    languages: ['Punjabi', 'Hindi', 'English'],
    availability: 'available',
    nextSlot: 'Available Now',
    location: '267 SST Nagar / Sunder Nagar, Opposite House Number-509, Main Road Harkishan Public School, Corner House Street Number-2, Near Eqbal Inn Hotel, SST Nagar-147003',
    consultationFee: 100,
    phone: '098887 74425'
  },
  {
    id: '2', 
    name: 'Dr. Pawan Kumar Mittal — Hope Clinic',
    specialty: 'General Physician / Family Medicine (MBBS)',
    rating: 4.9,
    experience: 15,
    languages: ['Hindi', 'English', 'Punjabi'],
    availability: 'busy',
    nextSlot: '2:30 PM Today',
    location: 'Near Bhavnesh Electronics, Nabha HO, Anand Nagar B (Patiala)',
    consultationFee: 150,
    phone: '08460557936'
  }
];

const translations = {
  en: {
    title: "Connect with Doctors",
    subtitle: "Instant video consultations with certified doctors",
    available: "Available Now",
    busy: "In Consultation", 
    offline: "Offline",
    experience: "years experience",
    languages: "Languages",
    location: "Location",
    consultFee: "Consultation Fee",
    bookNow: "Book Video Consult",
    joinQueue: "Join Queue",
    emergency: "Emergency Call"
  },
  hi: {
    title: "डॉक्टरों से जुड़ें",
    subtitle: "प्रमाणित डॉक्टरों के साथ तुरंत वीडियो परामर्श",
    available: "अभी उपलब्ध",
    busy: "परामर्श में",
    offline: "ऑफलाइन",
    experience: "साल का अनुभव",
    languages: "भाषाएं",
    location: "स्थान",
    consultFee: "परामर्श शुल्क",
    bookNow: "वीडियो परामर्श बुक करें",
    joinQueue: "कतार में शामिल हों",
    emergency: "आपातकालीन कॉल"
  },
  pa: {
    title: "ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ",
    subtitle: "ਪ੍ਰਮਾਣਿਤ ਡਾਕਟਰਾਂ ਨਾਲ ਤੁਰੰਤ ਵੀਡੀਓ ਸਲਾਹ",
    available: "ਹੁਣ ਉਪਲਬਧ",
    busy: "ਸਲਾਹ ਵਿੱਚ",
    offline: "ਆਫਲਾਈਨ",
    experience: "ਸਾਲ ਦਾ ਤਜਰਬਾ",
    languages: "ਭਾਸ਼ਾਵਾਂ",
    location: "ਸਥਾਨ",
    consultFee: "ਸਲਾਹ ਫੀਸ",
    bookNow: "ਵੀਡੀਓ ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
    joinQueue: "ਕਤਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    emergency: "ਐਮਰਜੈਂਸੀ ਕਾਲ"
  }
};

interface VideoConsultSectionProps {
  language: string;
}

export const VideoConsultSection = ({ language }: VideoConsultSectionProps) => {
  const t = translations[language as keyof typeof translations] || translations.en;

  const handlePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'offline': return 'destructive';
      default: return 'secondary';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available': return t.available;
      case 'busy': return t.busy;
      case 'offline': return t.offline;
      default: return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Emergency Button */}
      <Card className="p-4 bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 p-3 rounded-full">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-destructive">{t.emergency}</h3>
              <p className="text-sm text-muted-foreground">24/7 Emergency Support</p>
            </div>
          </div>
          <Button variant="destructive" size="lg" className="touch-target">
            <Phone className="h-5 w-5 mr-2" />
            Call 108
          </Button>
        </div>
      </Card>

      {/* Available Doctors */}
      <div className="grid gap-6">
        {mockDoctors.map((doctor) => (
          <Card key={doctor.id} className="p-6 shadow-healthcare">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Doctor Info */}
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/placeholder-doctor-${doctor.id}.jpg`} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getAvailabilityColor(doctor.availability) as any}>
                      {getAvailabilityText(doctor.availability)}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {doctor.rating}
                    </Badge>
                    <Badge variant="outline">
                      {doctor.experience} {t.experience}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <button 
                        onClick={() => handlePhoneCall(doctor.phone)}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {doctor.phone}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.nextSlot}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t.languages}: </span>
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t.consultFee}: </span>
                      <span className="font-semibold">₹{doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3 lg:w-48">
                {doctor.availability === 'available' ? (
                  <Button size="lg" className="touch-target gap-2">
                    <Video className="h-5 w-5" />
                    {t.bookNow}
                  </Button>
                ) : (
                  <Button variant="outline" size="lg" className="touch-target gap-2">
                    <Calendar className="h-5 w-5" />
                    {t.joinQueue}
                  </Button>
                )}
                
                <Button variant="outline" size="lg" className="touch-target gap-2">
                  <Heart className="h-5 w-5" />
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};