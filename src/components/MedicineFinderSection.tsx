import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Navigation,
  Bookmark
} from "lucide-react";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  openHours: string;
  isOpen: boolean;
  medicines: {
    [key: string]: {
      available: boolean;
      stock: 'high' | 'low' | 'out';
      price: number;
      lastUpdated: string;
    }
  };
}

const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'JP Pharmacy',
    address: 'Opposite Hanuman Mandir, Civil Hospital Road, Nabha',
    distance: 0.8,
    phone: '+91 70870 01441',
    openHours: 'Monday to Saturday: 6:00 AM - 8:30 PM',
    isOpen: true,
    medicines: {
      'paracetamol': { available: true, stock: 'high', price: 25, lastUpdated: '2 min ago' },
      'crocin': { available: true, stock: 'low', price: 35, lastUpdated: '5 min ago' },
      'dolo': { available: false, stock: 'out', price: 0, lastUpdated: '1 hour ago' }
    }
  },
  {
    id: '2',
    name: 'Prem Medical Store',
    address: 'Bhawra Bazar, Nabha (Near Civil Hospital area)',
    distance: 1.1,
    phone: '+91 94175 60065',
    openHours: 'Monday to Sunday: 9:00 AM - 10:00 PM',
    isOpen: true,
    medicines: {
      'paracetamol': { available: true, stock: 'high', price: 30, lastUpdated: '10 min ago' },
      'crocin': { available: true, stock: 'high', price: 40, lastUpdated: '3 min ago' },
      'dolo': { available: true, stock: 'low', price: 45, lastUpdated: '15 min ago' }
    }
  },
  {
    id: '3',
    name: 'Bhandari Medicos',
    address: 'Alohran Kalan Road, Nabha',
    distance: 1.5,
    phone: '+91 96464 52952',
    openHours: 'Monday to Sunday: 7:00 AM - 9:00 PM',
    isOpen: true,
    medicines: {
      'paracetamol': { available: true, stock: 'high', price: 25, lastUpdated: '2 min ago' },
      'crocin': { available: true, stock: 'low', price: 35, lastUpdated: '5 min ago' },
      'dolo': { available: false, stock: 'out', price: 0, lastUpdated: '1 hour ago' }
    }
  },
  {
    id: '4',
    name: 'Mittal Pharmacy',
    address: 'Bhawara Bazar, opposite Raja Narinder Singh Street, Nabha',
    distance: 1.3,
    phone: '+91 94631 55396',
    openHours: 'Monday to Saturday: 9:00 AM - 8:00 PM',
    isOpen: true,
    medicines: {
      'paracetamol': { available: true, stock: 'high', price: 30, lastUpdated: '10 min ago' },
      'crocin': { available: true, stock: 'high', price: 40, lastUpdated: '3 min ago' },
      'dolo': { available: true, stock: 'low', price: 45, lastUpdated: '15 min ago' }
    }
  }
];

const translations = {
  en: {
    title: "Find Medicine",
    subtitle: "Check availability at nearby pharmacies",
    searchPlaceholder: "Search medicine name...",
    nearbyPharmacies: "Nearby Pharmacies",
    distance: "km away",
    open: "Open",
    closed: "Closed",
    call: "Call",
    directions: "Directions",
    reserve: "Reserve",
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    lastUpdated: "Updated",
    price: "Price"
  },
  hi: {
    title: "दवा खोजें",
    subtitle: "नजदीकी फार्मेसियों में उपलब्धता जांचें",
    searchPlaceholder: "दवा का नाम खोजें...",
    nearbyPharmacies: "नजदीकी फार्मेसी",
    distance: "किमी दूर",
    open: "खुला",
    closed: "बंद",
    call: "कॉल करें",
    directions: "दिशा",
    reserve: "आरक्षित करें",
    inStock: "स्टॉक में",
    lowStock: "कम स्टॉक",
    outOfStock: "स्टॉक खत्म",
    lastUpdated: "अपडेटेड",
    price: "कीमत"
  },
  pa: {
    title: "ਦਵਾਈ ਲੱਭੋ",
    subtitle: "ਨੇੜਲੀਆਂ ਫਾਰਮੇਸੀਆਂ ਵਿੱਚ ਉਪਲਬਧਤਾ ਜਾਂਚੋ",
    searchPlaceholder: "ਦਵਾਈ ਦਾ ਨਾਮ ਖੋਜੋ...",
    nearbyPharmacies: "ਨੇੜਲੀਆਂ ਫਾਰਮੇਸੀਆਂ",
    distance: "ਕਿਮੀ ਦੂਰ",
    open: "ਖੁੱਲਾ",
    closed: "ਬੰਦ",
    call: "ਕਾਲ ਕਰੋ",
    directions: "ਦਿਸ਼ਾ",
    reserve: "ਰਿਜ਼ਰਵ ਕਰੋ",
    inStock: "ਸਟਾਕ ਵਿੱਚ",
    lowStock: "ਘੱਟ ਸਟਾਕ",
    outOfStock: "ਸਟਾਕ ਖਤਮ",
    lastUpdated: "ਅਪਡੇਟ ਕੀਤਾ",
    price: "ਕੀਮਤ"
  }
};

interface MedicineFinderSectionProps {
  language: string;
}

export const MedicineFinderSection = ({ language }: MedicineFinderSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[language as keyof typeof translations] || translations.en;

  const getStockIcon = (stock: string) => {
    switch (stock) {
      case 'high': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'low': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'out': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStockText = (stock: string) => {
    switch (stock) {
      case 'high': return t.inStock;
      case 'low': return t.lowStock;
      case 'out': return t.outOfStock;
      default: return stock;
    }
  };

  const getStockColor = (stock: string) => {
    switch (stock) {
      case 'high': return 'success';
      case 'low': return 'warning';
      case 'out': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 touch-target"
            />
          </div>
          <Button size="lg" className="touch-target px-8">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">{t.nearbyPharmacies}</h3>
        <Badge variant="outline" className="gap-1">
          <MapPin className="h-3 w-3" />
          {mockPharmacies.length} locations
        </Badge>
      </div>

      {/* Pharmacy List */}
      <div className="space-y-4">
        {mockPharmacies.map((pharmacy) => (
          <Card key={pharmacy.id} className="p-6 shadow-healthcare">
            <div className="space-y-4">
              {/* Pharmacy Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-foreground">{pharmacy.name}</h4>
                    <Badge variant={pharmacy.isOpen ? "success" : "destructive"}>
                      {pharmacy.isOpen ? t.open : t.closed}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{pharmacy.address} • {pharmacy.distance} {t.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{pharmacy.openHours}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    {t.call}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Navigation className="h-4 w-4" />
                    {t.directions}
                  </Button>
                </div>
              </div>

              {/* Medicine Availability */}
              {searchQuery && (
                <div className="border-t pt-4">
                  <h5 className="font-medium mb-3">Medicine Availability</h5>
                  <div className="space-y-3">
                    {Object.entries(pharmacy.medicines)
                      .filter(([name]) => name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(([medicineName, details]) => (
                        <div key={medicineName} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getStockIcon(details.stock)}
                            <div>
                              <div className="font-medium capitalize">{medicineName}</div>
                              <div className="text-sm text-muted-foreground">
                                {t.lastUpdated} {details.lastUpdated}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge variant={getStockColor(details.stock) as any}>
                              {getStockText(details.stock)}
                            </Badge>
                            {details.available && (
                              <>
                                <div className="text-right">
                                  <div className="font-semibold">₹{details.price}</div>
                                  <div className="text-xs text-muted-foreground">{t.price}</div>
                                </div>
                                <Button size="sm" className="gap-2">
                                  <Bookmark className="h-4 w-4" />
                                  {t.reserve}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};