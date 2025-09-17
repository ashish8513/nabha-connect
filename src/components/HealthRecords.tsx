import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, QrCode, Eye, Calendar, User, Stethoscope, Pill } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface HealthRecordsProps {
  language: string;
}

interface MedicalRecord {
  id: string;
  type: 'prescription' | 'lab' | 'consult' | 'vaccination';
  title: string;
  date: string;
  doctor: string;
  hospital: string;
  notes: string;
  attachments: string[];
}

export const HealthRecords = ({ language }: HealthRecordsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const translations = {
    en: {
      title: "Health Records",
      subtitle: "Your complete digital health history",
      searchPlaceholder: "Search records...",
      filterAll: "All Records",
      filterPrescription: "Prescriptions",
      filterLab: "Lab Reports",
      filterConsult: "Consultations",
      filterVaccination: "Vaccinations",
      scanQR: "Scan QR Code",
      downloadAll: "Download All",
      viewRecord: "View Details",
      noRecords: "No records found",
      recordDetails: "Record Details",
      doctor: "Doctor",
      hospital: "Hospital",
      date: "Date",
      notes: "Notes",
      attachments: "Attachments",
      download: "Download",
    },
    hi: {
      title: "स्वास्थ्य रिकॉर्ड",
      subtitle: "आपका संपूर्ण डिजिटल स्वास्थ्य इतिहास",
      searchPlaceholder: "रिकॉर्ड खोजें...",
      filterAll: "सभी रिकॉर्ड",
      filterPrescription: "दवाई की पर्ची",
      filterLab: "लैब रिपोर्ट",
      filterConsult: "परामर्श",
      filterVaccination: "टीकाकरण",
      scanQR: "QR कोड स्कैन करें",
      downloadAll: "सभी डाउनलोड करें",
      viewRecord: "विवरण देखें",
      noRecords: "कोई रिकॉर्ड नहीं मिला",
      recordDetails: "रिकॉर्ड विवरण",
      doctor: "डॉक्टर",
      hospital: "अस्पताल",
      date: "तारीख",
      notes: "टिप्पणियां",
      attachments: "संलग्नक",
      download: "डाउनलोड",
    },
    pa: {
      title: "ਸਿਹਤ ਰਿਕਾਰਡ",
      subtitle: "ਤੁਹਾਡਾ ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਸਿਹਤ ਇਤਿਹਾਸ",
      searchPlaceholder: "ਰਿਕਾਰਡ ਖੋਜੋ...",
      filterAll: "ਸਾਰੇ ਰਿਕਾਰਡ",
      filterPrescription: "ਦਵਾਈ ਦੀ ਪਰਚੀ",
      filterLab: "ਲੈਬ ਰਿਪੋਰਟ",
      filterConsult: "ਸਲਾਹ",
      filterVaccination: "ਟੀਕਾਕਰਣ",
      scanQR: "QR ਕੋਡ ਸਕੈਨ ਕਰੋ",
      downloadAll: "ਸਭ ਡਾਊਨਲੋਡ ਕਰੋ",
      viewRecord: "ਵੇਰਵੇ ਵੇਖੋ",
      noRecords: "ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ",
      recordDetails: "ਰਿਕਾਰਡ ਵੇਰਵੇ",
      doctor: "ਡਾਕਟਰ",
      hospital: "ਹਸਪਤਾਲ",
      date: "ਮਿਤੀ",
      notes: "ਨੋਟਸ",
      attachments: "ਅਟੈਚਮੈਂਟਸ",
      download: "ਡਾਊਨਲੋਡ",
    }
  };

  const mockRecords: MedicalRecord[] = [
    {
      id: '1',
      type: 'prescription',
      title: 'Blood Pressure Medication',
      date: '2024-01-15',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Nabha District Hospital',
      notes: 'Take twice daily after meals. Monitor BP regularly.',
      attachments: ['prescription_1.pdf']
    },
    {
      id: '2',
      type: 'lab',
      title: 'Complete Blood Count',
      date: '2024-01-10',
      doctor: 'Dr. Priya Sharma',
      hospital: 'City Medical Center',
      notes: 'All values within normal range.',
      attachments: ['lab_report_1.pdf', 'lab_report_chart.jpg']
    },
    {
      id: '3',
      type: 'consult',
      title: 'General Check-up',
      date: '2024-01-05',
      doctor: 'Dr. Amrit Singh',
      hospital: 'NabhaCare Clinic',
      notes: 'Patient appears healthy. Recommended lifestyle changes.',
      attachments: []
    },
    {
      id: '4',
      type: 'vaccination',
      title: 'COVID-19 Booster',
      date: '2023-12-20',
      doctor: 'Nurse Jasbir Kaur',
      hospital: 'Primary Health Center',
      notes: 'No adverse reactions observed.',
      attachments: ['vaccination_cert.pdf']
    }
  ];

  const t = translations[language as keyof typeof translations] || translations.en;

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'prescription': return <Pill className="w-5 h-5" />;
      case 'lab': return <FileText className="w-5 h-5" />;
      case 'consult': return <Stethoscope className="w-5 h-5" />;
      case 'vaccination': return <User className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getRecordBadgeColor = (type: string) => {
    switch (type) {
      case 'prescription': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-green-100 text-green-800';
      case 'consult': return 'bg-purple-100 text-purple-800';
      case 'vaccination': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="w-8 h-8 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filterAll}</SelectItem>
                <SelectItem value="prescription">{t.filterPrescription}</SelectItem>
                <SelectItem value="lab">{t.filterLab}</SelectItem>
                <SelectItem value="consult">{t.filterConsult}</SelectItem>
                <SelectItem value="vaccination">{t.filterVaccination}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <QrCode className="w-4 h-4 mr-2" />
              {t.scanQR}
            </Button>
            <Button variant="ghost">
              <Download className="w-4 h-4 mr-2" />
              {t.downloadAll}
            </Button>
          </div>

          {/* Records List */}
          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t.noRecords}</p>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-full bg-primary/10">
                          {getRecordIcon(record.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{record.title}</h3>
                            <Badge className={getRecordBadgeColor(record.type)}>
                              {record.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {record.doctor} • {record.hospital}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            {t.viewRecord}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{t.recordDetails}</DialogTitle>
                            <DialogDescription>{record.title}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold">{t.doctor}</label>
                                <p className="text-muted-foreground">{record.doctor}</p>
                              </div>
                              <div>
                                <label className="font-semibold">{t.hospital}</label>
                                <p className="text-muted-foreground">{record.hospital}</p>
                              </div>
                            </div>
                            <div>
                              <label className="font-semibold">{t.date}</label>
                              <p className="text-muted-foreground">
                                {new Date(record.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold">{t.notes}</label>
                              <p className="text-muted-foreground">{record.notes}</p>
                            </div>
                            {record.attachments.length > 0 && (
                              <div>
                                <label className="font-semibold">{t.attachments}</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {record.attachments.map((attachment, index) => (
                                    <Button key={index} variant="outline" size="sm">
                                      <Download className="w-3 h-3 mr-2" />
                                      {attachment}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};