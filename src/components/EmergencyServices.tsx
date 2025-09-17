import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Phone, AlertTriangle, MapPin, Navigation } from "lucide-react";

interface EmergencyServicesProps {
  language: string;
  userPhone: string;
}

export const EmergencyServices = ({ language, userPhone }: EmergencyServicesProps) => {
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Emergency Services",
      sos: "Send SOS SMS",
      sosSent: "SOS alert sent successfully!",
      error: "Something went wrong, please try again.",
      contacts: "Emergency Contacts",
      nearby: "Nearby Services",
      callNow: "Call Now",
      directions: "Get Directions",
      available: "Available",
      unavailable: "Unavailable",
    },
    hi: {
      title: "आपातकालीन सेवाएँ",
      sos: "SOS SMS भेजें",
      sosSent: "SOS अलर्ट सफलतापूर्वक भेजा गया!",
      error: "कुछ गलत हो गया, कृपया पुनः प्रयास करें।",
      contacts: "आपातकालीन संपर्क",
      nearby: "नजदीकी सेवाएँ",
      callNow: "कॉल करें",
      directions: "दिशा-निर्देश",
      available: "उपलब्ध",
      unavailable: "अनुपलब्ध",
    },
    pa: {
      title: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
      sos: "SOS SMS ਭੇਜੋ",
      sosSent: "SOS ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ!",
      error: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      contacts: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
      nearby: "ਨੇੜਲੀਆਂ ਸੇਵਾਵਾਂ",
      callNow: "ਹੁਣੇ ਕਾਲ ਕਰੋ",
      directions: "ਦਿਸ਼ਾਵਾਂ ਲਓ",
      available: "ਉਪਲਬਧ",
      unavailable: "ਉਪਲਬਧ ਨਹੀਂ",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSendSOS = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: userPhone, userName: "User", userLocation: "Nabha" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "✅ Success", description: t.sosSent });
      } else {
        toast({ title: "❌ Error", description: t.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "❌ Error", description: t.error, variant: "destructive" });
    }
  };

  const contacts = [
    {
      name: "Nabha District Hospital",
      address: "Main Road, Nabha",
      distance: "2.5 km",
      eta: "8-12 min",
      available: true,
      phone: "+91108",
      mapsQuery: "Nabha District Hospital",
      iconBg: "bg-red-100",
    },
    {
      name: "Punjab Police Emergency",
      address: "Police Station, Nabha",
      distance: "1.8 km",
      eta: "5-8 min",
      available: true,
      phone: "+91100",
      mapsQuery: "Punjab Police Nabha",
      iconBg: "bg-blue-100",
    },
    {
      name: "Fire Department",
      address: "Fire Station, Nabha",
      distance: "3.2 km",
      eta: "10-15 min",
      available: true,
      phone: "+91101",
      mapsQuery: "Fire Station Nabha",
      iconBg: "bg-orange-100",
    },
    {
      name: "Civil Hospital Nabha",
      address: "Hospital Road, Nabha",
      distance: "1.2 km",
      eta: "24/7",
      available: true,
      phone: "+91108",
      mapsQuery: "Civil Hospital Nabha",
      iconBg: "bg-green-100",
    },
    {
      name: "Dr. Emergency Response",
      address: "NabhaCare Clinic",
      distance: "0.8 km",
      eta: "On-call",
      available: false,
      phone: "+919999999999",
      mapsQuery: "NabhaCare Clinic",
      iconBg: "bg-purple-100",
    },
  ];

  const openTel = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const openMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="max-w-md mx-auto p-6 space-y-6 border rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-center">{t.title}</h2>
        <Button onClick={handleSendSOS} className="w-full bg-red-600 hover:bg-red-700">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {t.sos}
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{t.contacts}</h3>
        <p className="text-sm text-muted-foreground">{t.nearby}</p>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <Card key={c.name} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${c.iconBg} flex items-center justify-center`}> 
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-lg leading-tight">{c.name}</h4>
                      <Badge variant="outline" className={c.available ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                        {c.available ? t.available : t.unavailable}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.address}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span>{c.distance}</span>
                      <span>{c.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={() => openTel(c.phone)} className="bg-green-600 hover:bg-green-700">
                    <Phone className="w-4 h-4" /> {t.callNow}
                  </Button>
                  <Button variant="outline" onClick={() => openMaps(c.mapsQuery)}>
                    <Navigation className="w-4 h-4" /> {t.directions}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
