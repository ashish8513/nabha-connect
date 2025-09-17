import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Thermometer, Heart, Zap, AlertTriangle, CheckCircle, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SymptomCheckerProps {
  language: string;
}

interface Symptom {
  id: string;
  name: { en: string; hi: string; pa: string };
  icon: React.ReactNode;
  severity: 'low' | 'medium' | 'high';
}

interface AssessmentResult {
  severity: 'low' | 'medium' | 'high';
  urgency: string;
  recommendations: string[];
  nextSteps: string[];
}

export const SymptomChecker = ({ language }: SymptomCheckerProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "AI Symptom Checker",
      subtitle: "Select your symptoms for AI-powered health assessment",
      selectSymptoms: "Select Your Symptoms",
      additionalInfo: "Additional Information",
      additionalPlaceholder: "Describe any other symptoms, duration, or relevant details...",
      analyzeButton: "Analyze Symptoms",
      analyzing: "Analyzing...",
      results: "Assessment Results",
      severity: "Severity Level",
      urgency: "Urgency",
      recommendations: "Recommendations",
      nextSteps: "Next Steps",
      bookConsult: "Book Video Consultation",
      findPharmacy: "Find Nearby Pharmacy",
      emergencyCall: "Emergency Call",
      newAssessment: "New Assessment",
      severityLow: "Low Priority",
      severityMedium: "Medium Priority", 
      severityHigh: "High Priority - Seek Immediate Care",
    },
    hi: {
      title: "AI लक्षण जांचकर्ता",
      subtitle: "AI-संचालित स्वास्थ्य मूल्यांकन के लिए अपने लक्षण चुनें",
      selectSymptoms: "अपने लक्षण चुनें",
      additionalInfo: "अतिरिक्त जानकारी",
      additionalPlaceholder: "कोई अन्य लक्षण, अवधि, या प्रासंगिक विवरण बताएं...",
      analyzeButton: "लक्षणों का विश्लेषण करें",
      analyzing: "विश्लेषण कर रहे हैं...",
      results: "मूल्यांकन परिणाम",
      severity: "गंभीरता स्तर",
      urgency: "तत्काल आवश्यकता",
      recommendations: "सिफारिशें",
      nextSteps: "अगले कदम",
      bookConsult: "वीडियो परामर्श बुक करें",
      findPharmacy: "निकटतम फार्मेसी खोजें",
      emergencyCall: "आपातकालीन कॉल",
      newAssessment: "नया मूल्यांकन",
      severityLow: "कम प्राथमिकता",
      severityMedium: "मध्यम प्राथमिकता",
      severityHigh: "उच्च प्राथमिकता - तत्काल देखभाल लें",
    },
    pa: {
      title: "AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
      subtitle: "AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਮੁਲਾਂਕਣ ਲਈ ਆਪਣੇ ਲੱਛਣ ਚੁਣੋ",
      selectSymptoms: "ਆਪਣੇ ਲੱਛਣ ਚੁਣੋ",
      additionalInfo: "ਵਾਧੂ ਜਾਣਕਾਰੀ",
      additionalPlaceholder: "ਕੋਈ ਹੋਰ ਲੱਛਣ, ਸਮਾਂ, ਜਾਂ ਸੰਬੰਧਿਤ ਵੇਰਵੇ ਦੱਸੋ...",
      analyzeButton: "ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ",
      analyzing: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਹੇ ਹਾਂ...",
      results: "ਮੁਲਾਂਕਣ ਨਤੀਜੇ",
      severity: "ਗੰਭੀਰਤਾ ਪੱਧਰ",
      urgency: "ਤਤਕਾਲ ਲੋੜ",
      recommendations: "ਸਿਫਾਰਸ਼ਾਂ",
      nextSteps: "ਅਗਲੇ ਕਦਮ",
      bookConsult: "ਵੀਡਿਓ ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
      findPharmacy: "ਨੇੜਲੀ ਫਾਰਮੇਸੀ ਲੱਭੋ",
      emergencyCall: "ਐਮਰਜੈਂਸੀ ਕਾਲ",
      newAssessment: "ਨਵਾਂ ਮੁਲਾਂਕਣ",
      severityLow: "ਘੱਟ ਤਰਜੀਹ",
      severityMedium: "ਮੱਧਮ ਤਰਜੀਹ",
      severityHigh: "ਉੱਚ ਤਰਜੀਹ - ਤਤਕਾਲ ਦੇਖਭਾਲ ਲਓ",
    }
  };

  const symptoms: Symptom[] = [
    {
      id: 'fever',
      name: { en: 'Fever', hi: 'बुखार', pa: 'ਬੁਖਾਰ' },
      icon: <Thermometer className="w-5 h-5" />,
      severity: 'medium'
    },
    {
      id: 'headache',
      name: { en: 'Headache', hi: 'सिरदर्द', pa: 'ਸਿਰ ਦਰਦ' },
      icon: <Brain className="w-5 h-5" />,
      severity: 'low'
    },
    {
      id: 'chest_pain',
      name: { en: 'Chest Pain', hi: 'छाती में दर्द', pa: 'ਛਾਤੀ ਵਿੱਚ ਦਰਦ' },
      icon: <Heart className="w-5 h-5" />,
      severity: 'high'
    },
    {
      id: 'fatigue',
      name: { en: 'Fatigue', hi: 'थकान', pa: 'ਥਕਾਵਟ' },
      icon: <Zap className="w-5 h-5" />,
      severity: 'low'
    },
    {
      id: 'nausea',
      name: { en: 'Nausea', hi: 'मतली', pa: 'ਮਤਲੀ' },
      icon: <AlertTriangle className="w-5 h-5" />,
      severity: 'medium'
    },
    {
      id: 'cough',
      name: { en: 'Cough', hi: 'खांसी', pa: 'ਖੰਘ' },
      icon: <Brain className="w-5 h-5" />,
      severity: 'low'
    }
  ];

  const t = translations[language as keyof typeof translations] || translations.en;

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Prepare symptoms text for AI
      const selectedSymptomNames = symptoms
        .filter(s => selectedSymptoms.includes(s.id))
        .map(s => s.name[language as keyof typeof s.name])
        .join(', ');
      
      const symptomsText = `${selectedSymptomNames}${additionalInfo ? `. Additional info: ${additionalInfo}` : ''}`;

      // Call Cerebras AI endpoint
      const response = await fetch('http://localhost:5000/api/symptoms/check-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptomsText }),
      });

      const data = await response.json();

      if (data.success) {
        // Create result with AI recommendations
        const aiResult: AssessmentResult = {
          severity: 'medium', // Default severity for AI analysis
          urgency: 'AI Analysis Complete',
          recommendations: [data.recommendations],
          nextSteps: ['Review AI recommendations', 'Consult a doctor if needed', 'Monitor symptoms']
        };

        setResult(aiResult);
        
        // Also display in the recommendations div
        const recommendationsDiv = document.getElementById('recommendations');
        if (recommendationsDiv) {
          recommendationsDiv.innerHTML = data.recommendations.replace(/\n/g, '<br>');
        }
      } else {
        toast({
          title: "Analysis Failed",
          description: data.error || "Failed to analyze symptoms",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error calling AI endpoint:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to AI service",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getSeverityProgress = (severity: string) => {
    switch (severity) {
      case 'high': return 90;
      case 'medium': return 60;
      case 'low': return 30;
      default: return 0;
    }
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              {t.results}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.severity}</h3>
                <Badge className={getSeverityColor(result.severity)}>
                  {result.severity === 'high' ? t.severityHigh :
                   result.severity === 'medium' ? t.severityMedium : t.severityLow}
                </Badge>
                <Progress value={getSeverityProgress(result.severity)} className="mt-2" />
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.urgency}</h3>
                <p className="text-muted-foreground">{result.urgency}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.recommendations}</h3>
                <div id="recommendations" className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="mb-2">
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.nextSteps}</h3>
                <ul className="space-y-1">
                  {result.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t.bookConsult}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t.findPharmacy}
              </Button>
              {result.severity === 'high' && (
                <Button variant="destructive" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t.emergencyCall}
                </Button>
              )}
              <Button variant="ghost" onClick={() => setResult(null)}>
                {t.newAssessment}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="w-8 h-8 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">{t.selectSymptoms}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {symptoms.map((symptom) => (
                <Button
                  key={symptom.id}
                  variant={selectedSymptoms.includes(symptom.id) ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  {symptom.icon}
                  <span className="text-sm text-center">
                    {symptom.name[language as keyof typeof symptom.name]}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">{t.additionalInfo}</h3>
            <Textarea
              placeholder={t.additionalPlaceholder}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={analyzeSymptoms}
            disabled={isAnalyzing || selectedSymptoms.length === 0}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? t.analyzing : t.analyzeButton}
            {!isAnalyzing && <Brain className="w-4 h-4 ml-2" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};