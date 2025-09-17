import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' }
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  selectedLanguage?: string;
}

export const LanguageSelector = ({ onLanguageSelect, selectedLanguage }: LanguageSelectorProps) => {
  return (
    <Card className="p-6 bg-card shadow-healthcare">
      <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">
        Choose Your Language / भाषा चुनें / ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ
      </h3>
      <div className="grid gap-4">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "outline"}
            size="lg"
            className="touch-target flex items-center justify-between p-6 text-lg transition-transform hover:scale-[1.02]"
            onClick={() => onLanguageSelect(lang.code)}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <div className="font-semibold">{lang.nativeName}</div>
                <div className="text-sm opacity-75">{lang.name}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};