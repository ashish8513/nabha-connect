import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  Edit, 
  LogOut, 
  Globe, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  X
} from "lucide-react";

interface ProfileProps {
  language: string;
  userPhone: string;
  onLanguageChange: (language: string) => void;
  onLogout: () => void;
}

export const Profile = ({ language, userPhone, onLanguageChange, onLogout }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "Madhav Aggarwal",
    age: "19",
    address: "Civil Road, Nabha, Punjab"
  });

  const translations = {
    en: {
      title: "Profile",
      subtitle: "Manage your account information",
      name: "Name",
      age: "Age",
      address: "Address",
      phone: "Phone Number",
      language: "Language",
      editProfile: "Edit Profile",
      logout: "Logout",
      save: "Save Changes",
      cancel: "Cancel",
      profileUpdated: "Profile updated successfully!",
      selectLanguage: "Select Language",
      english: "English",
      hindi: "Hindi",
      punjabi: "Punjabi"
    },
    hi: {
      title: "प्रोफाइल",
      subtitle: "अपनी खाता जानकारी प्रबंधित करें",
      name: "नाम",
      age: "आयु",
      address: "पता",
      phone: "फोन नंबर",
      language: "भाषा",
      editProfile: "प्रोफाइल संपादित करें",
      logout: "लॉगआउट",
      save: "परिवर्तन सहेजें",
      cancel: "रद्द करें",
      profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट हो गया!",
      selectLanguage: "भाषा चुनें",
      english: "अंग्रेजी",
      hindi: "हिंदी",
      punjabi: "पंजाबी"
    },
    pa: {
      title: "ਪ੍ਰੋਫਾਈਲ",
      subtitle: "ਆਪਣੀ ਖਾਤਾ ਜਾਣਕਾਰੀ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
      name: "ਨਾਮ",
      age: "ਉਮਰ",
      address: "ਪਤਾ",
      phone: "ਫੋਨ ਨੰਬਰ",
      language: "ਭਾਸ਼ਾ",
      editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ",
      logout: "ਲੌਗਆਉਟ",
      save: "ਬਦਲਾਅ ਸੇਵ ਕਰੋ",
      cancel: "ਰੱਦ ਕਰੋ",
      profileUpdated: "ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਹੋ ਗਿਆ!",
      selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
      english: "ਅੰਗਰੇਜ਼ੀ",
      hindi: "ਹਿੰਦੀ",
      punjabi: "ਪੰਜਾਬੀ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    // Show success message (you could use toast here)
    console.log("Profile updated:", editData);
  };

  const handleCancel = () => {
    setEditData({
      name: "Madhav Aggarwal",
      age: "19",
      address: "Civil Road, Nabha, Punjab"
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'en': return t.english;
      case 'hi': return t.hindi;
      case 'pa': return t.punjabi;
      default: return t.english;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Profile Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-profile.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(editData.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.name}</Label>
                {isEditing ? (
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full"
                  />
                ) : (
                  <p className="text-lg font-semibold">{editData.name}</p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.age}</Label>
                {isEditing ? (
                  <Input
                    value={editData.age}
                    onChange={(e) => setEditData({...editData, age: e.target.value})}
                    className="w-full"
                    type="number"
                  />
                ) : (
                  <p className="text-lg">{editData.age} years</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t.address}
            </Label>
            {isEditing ? (
              <Input
                value={editData.address}
                onChange={(e) => setEditData({...editData, address: e.target.value})}
                className="w-full"
              />
            ) : (
              <p className="text-muted-foreground">{editData.address}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t.phone}
            </Label>
            <p className="text-muted-foreground">{userPhone}</p>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {t.language}
            </Label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.selectLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t.english}</SelectItem>
                <SelectItem value="hi">{t.hindi}</SelectItem>
                <SelectItem value="pa">{t.punjabi}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  {t.cancel}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  {t.editProfile}
                </Button>
                <Button variant="destructive" onClick={onLogout} className="flex-1">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.logout}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
