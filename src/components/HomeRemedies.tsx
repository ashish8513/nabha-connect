import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Loader2, Home, AlertTriangle } from "lucide-react";

interface HomeRemediesProps {
  language: string;
}

export const HomeRemedies = ({ language }: HomeRemediesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remedies, setRemedies] = useState("");
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Home Remedies",
      subtitle: "Get quick home remedy suggestions for common symptoms",
      placeholder: "Type a symptom (e.g., chest pain, headache, fever)",
      search: "Search Remedies",
      defaultMessage: "Type a symptom to see possible home remedies.",
      warning: "⚠️ Warning: These are general suggestions. Please consult a doctor first.",
      error: "Something went wrong, please try again.",
      noResults: "No remedies found. Please try a different symptom.",
    },
    hi: {
      title: "घरेलू उपचार",
      subtitle: "आम लक्षणों के लिए त्वरित घरेलू उपचार सुझाव प्राप्त करें",
      placeholder: "लक्षण टाइप करें (जैसे: छाती में दर्द, सिरदर्द, बुखार)",
      search: "उपचार खोजें",
      defaultMessage: "लक्षण टाइप करके संभावित घरेलू उपचार देखें।",
      warning: "⚠️ चेतावनी: ये सामान्य सुझाव हैं। कृपया पहले डॉक्टर से सलाह लें।",
      error: "कुछ गलत हुआ, कृपया पुनः प्रयास करें।",
      noResults: "कोई उपचार नहीं मिला। कृपया कोई अन्य लक्षण आजमाएं।",
    },
    pa: {
      title: "ਘਰੇਲੂ ਇਲਾਜ",
      subtitle: "ਆਮ ਲੱਛਣਾਂ ਲਈ ਤੁਰੰਤ ਘਰੇਲੂ ਇਲਾਜ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ",
      placeholder: "ਲੱਛਣ ਟਾਈਪ ਕਰੋ (ਜਿਵੇਂ: ਛਾਤੀ ਦਰਦ, ਸਿਰਦਰਦ, ਬੁਖਾਰ)",
      search: "ਇਲਾਜ ਖੋਜੋ",
      defaultMessage: "ਲੱਛਣ ਟਾਈਪ ਕਰਕੇ ਸੰਭਾਵਿਤ ਘਰੇਲੂ ਇਲਾਜ ਦੇਖੋ।",
      warning: "⚠️ ਚੇਤਾਵਨੀ: ਇਹ ਸਾਧਾਰਣ ਸੁਝਾਅ ਹਨ। ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਲਓ।",
      error: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      noResults: "ਕੋਈ ਇਲਾਜ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਲੱਛਣ ਅਜ਼ਮਾਓ।",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "❌ Error",
        description: "Please enter a symptom to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRemedies("");

    try {
      const response = await fetch("/api/symptoms/check-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: searchQuery.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setRemedies(data.recommendations);
      } else {
        toast({
          title: "❌ Error",
          description: t.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching remedies:", error);
      toast({
        title: "❌ Error",
        description: t.error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Home className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-2">{t.subtitle}</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto">

        {/* Search Bar */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder={t.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="bg-green-600 hover:bg-green-700 h-12 px-6"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Results Panel */}
        <Card className="min-h-[300px] mt-6">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-green-600" />
                  <p className="text-muted-foreground">Searching for remedies...</p>
                </div>
              </div>
            ) : remedies ? (
              <div className="space-y-4">
                <div className="prose prose-base max-w-none">
                  <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                    {remedies}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48">
                <div className="text-center text-muted-foreground">
                  <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">{t.defaultMessage}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warning Message */}
        {remedies && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">{t.warning}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};






