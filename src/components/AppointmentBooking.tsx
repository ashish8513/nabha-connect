import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, User, MapPin, Video, Phone, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/supabaseClient";

interface AppointmentBookingProps {
  language: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  location: string;
  consultationFee: number;
  nextAvailable: string;
  avatar: string;
  languages: string[];
  consultationTypes: ('video' | 'audio' | 'in-person')[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export const AppointmentBooking = ({ language }: AppointmentBookingProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Book Appointment",
      subtitle: "Schedule your consultation with qualified doctors",
      selectDoctor: "Select Doctor",
      selectDate: "Select Date",
      selectTime: "Select Time",
      consultationType: "Consultation Type",
      symptoms: "Describe Symptoms",
      symptomsPlaceholder: "Please describe your symptoms or reason for consultation...",
      bookAppointment: "Book Appointment",
      booking: "Booking...",
      videoConsult: "Video Consultation",
      audioConsult: "Audio Consultation",
      inPerson: "In-Person Visit",
      experience: "Experience",
      rating: "Rating",
      fee: "Consultation Fee",
      nextAvailable: "Next Available",
      languages: "Languages",
      available: "Available",
      booked: "Booked",
      bookingSuccess: "Appointment booked successfully!",
      selectAllFields: "Please fill all required fields",
      doctorDetails: "Doctor Details",
      appointmentDetails: "Appointment Details",
      myAppointments: "My Appointments",
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    hi: {
      title: "अपॉइंटमेंट बुक करें",
      subtitle: "योग्य डॉक्टरों के साथ अपना परामर्श शेड्यूल करें",
      selectDoctor: "डॉक्टर चुनें",
      selectDate: "दिनांक चुनें",
      selectTime: "समय चुनें",
      consultationType: "परामर्श प्रकार",
      symptoms: "लक्षणों का वर्णन करें",
      symptomsPlaceholder: "कृपया अपने लक्षण या परामर्श का कारण बताएं...",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      booking: "बुकिंग...",
      videoConsult: "वीडियो परामर्श",
      audioConsult: "ऑडियो परामर्श",
      inPerson: "व्यक्तिगत भेंट",
      experience: "अनुभव",
      rating: "रेटिंग",
      fee: "परामर्श शुल्क",
      nextAvailable: "अगली उपलब्धता",
      languages: "भाषाएं",
      available: "उपलब्ध",
      booked: "बुक किया गया",
      bookingSuccess: "अपॉइंटमेंट सफलतापूर्वक बुक हो गया!",
      selectAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
      doctorDetails: "डॉक्टर विवरण",
      appointmentDetails: "अपॉइंटमेंट विवरण",
      myAppointments: "मेरे अपॉइंटमेंट",
      upcoming: "आगामी",
      completed: "पूर्ण",
      cancelled: "रद्द",
    },
    pa: {
      title: "ਅਪਾਇਨਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
      subtitle: "ਯੋਗ ਡਾਕਟਰਾਂ ਨਾਲ ਆਪਣੀ ਸਲਾਹ ਦਾ ਸਮਾਂ ਨਿਸ਼ਚਿਤ ਕਰੋ",
      selectDoctor: "ਡਾਕਟਰ ਚੁਣੋ",
      selectDate: "ਮਿਤੀ ਚੁਣੋ",
      selectTime: "ਸਮਾਂ ਚੁਣੋ",
      consultationType: "ਸਲਾਹ ਦੀ ਕਿਸਮ",
      symptoms: "ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ",
      symptomsPlaceholder: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਲੱਛਣ ਜਾਂ ਸਲਾਹ ਦਾ ਕਾਰਨ ਦੱਸੋ...",
      bookAppointment: "ਅਪਾਇਨਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
      booking: "ਬੁੱਕਿੰਗ...",
      videoConsult: "ਵੀਡਿਓ ਸਲਾਹ",
      audioConsult: "ਆਡੀਓ ਸਲਾਹ",
      inPerson: "ਨਿੱਜੀ ਮੁਲਾਕਾਤ",
      experience: "ਤਜਰਬਾ",
      rating: "ਰੇਟਿੰਗ",
      fee: "ਸਲਾਹ ਫੀਸ",
      nextAvailable: "ਅਗਲੀ ਉਪਲਬਧਤਾ",
      languages: "ਭਾਸ਼ਾਵਾਂ",
      available: "ਉਪਲਬਧ",
      booked: "ਬੁੱਕ ਕੀਤਾ ਗਿਆ",
      bookingSuccess: "ਅਪਾਇਨਟਮੈਂਟ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਿਆ!",
      selectAllFields: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲੋੜੀਂਦੇ ਖੇਤਰ ਭਰੋ",
      doctorDetails: "ਡਾਕਟਰ ਵੇਰਵੇ",
      appointmentDetails: "ਅਪਾਇਨਟਮੈਂਟ ਵੇਰਵੇ",
      myAppointments: "ਮੇਰੇ ਅਪਾਇਨਟਮੈਂਟਸ",
      upcoming: "ਆਉਣ ਵਾਲੇ",
      completed: "ਪੂਰੇ ਹੋਏ",
      cancelled: "ਰੱਦ ਕੀਤੇ",
    }
  };

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Medicine',
      experience: '15 years',
      rating: 4.8,
      location: 'Nabha District Hospital',
      consultationFee: 500,
      nextAvailable: 'Today 2:00 PM',
      avatar: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Punjabi'],
      consultationTypes: ['video', 'audio', 'in-person']
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      experience: '12 years',
      rating: 4.9,
      location: 'NabhaCare Clinic',
      consultationFee: 600,
      nextAvailable: 'Tomorrow 10:00 AM',
      avatar: '/api/placeholder/100/100',
      languages: ['English', 'Hindi'],
      consultationTypes: ['video', 'in-person']
    },
    {
      id: '3',
      name: 'Dr. Amrit Singh',
      specialty: 'Cardiology',
      experience: '20 years',
      rating: 4.7,
      location: 'Civil Hospital Nabha',
      consultationFee: 800,
      nextAvailable: 'Dec 25 9:00 AM',
      avatar: '/api/placeholder/100/100',
      languages: ['Punjabi', 'Hindi', 'English'],
      consultationTypes: ['video', 'audio', 'in-person']
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: true },
  ];

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !consultationType) {
      toast({
        title: "Missing Information",
        description: t.selectAllFields,
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    try {
      // Build minimal payload matching your table columns
      const payload = {
        doctor: selectedDoctor.name,
        // Send pure date string to satisfy DATE-typed columns
        date: new Date(selectedDate as Date).toISOString().split('T')[0],
        time: selectedTime,
        consultation_type: consultationType,
        symptoms: symptoms,
      };

      const { data, error, status, statusText } = await supabase
        .from("Appointments")
        .insert([payload]);

      if (error) {
        // Log full error details for debugging
        console.error("Supabase Appointments insert failed", {
          error,
          status,
          statusText,
          payload,
          data,
        });
        toast({
          title: "Booking Failed",
          description: "We couldn't save your appointment. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Supabase Appointments insert success", { data, payload });
      toast({
        title: "Booking Confirmed",
        description: t.bookingSuccess,
      });

      // Reset form on success
      setSelectedDoctor(null);
      setSelectedDate(new Date());
      setSelectedTime("");
      setConsultationType("");
      setSymptoms("");
    } catch (err) {
      // Catch any unexpected runtime errors
      console.error("Unexpected error during appointment booking", err);
      toast({
        title: "Booking Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getConsultationTypeName = (type: string) => {
    switch (type) {
      case 'video': return t.videoConsult;
      case 'audio': return t.audioConsult;
      case 'in-person': return t.inPerson;
      default: return t.videoConsult;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CalendarDays className="w-8 h-8 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Doctor Selection */}
          <div>
            <h3 className="font-semibold mb-4">{t.selectDoctor}</h3>
            <div className="grid gap-4">
              {mockDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{doctor.name}</h4>
                            <p className="text-primary font-medium">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{doctor.rating}</span>
                            </div>
                            <p className="text-lg font-bold text-primary">₹{doctor.consultationFee}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <span className="font-medium">{t.experience}:</span>
                            <p>{doctor.experience}</p>
                          </div>
                          <div>
                            <span className="font-medium">{t.nextAvailable}:</span>
                            <p className="text-green-600">{doctor.nextAvailable}</p>
                          </div>
                          <div>
                            <span className="font-medium">{t.languages}:</span>
                            <p>{doctor.languages.join(', ')}</p>
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>
                            <p>{doctor.location}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {doctor.consultationTypes.map((type) => (
                            <Badge key={type} variant="outline" className="flex items-center gap-1">
                              {getConsultationTypeIcon(type)}
                              {getConsultationTypeName(type)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {selectedDoctor && (
            <>
              {/* Date Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">{t.selectDate}</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="font-semibold mb-4">{t.selectTime}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="text-sm"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Type */}
              <div>
                <h3 className="font-semibold mb-4">{t.consultationType}</h3>
                <Select value={consultationType} onValueChange={setConsultationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consultation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDoctor.consultationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          {getConsultationTypeIcon(type)}
                          {getConsultationTypeName(type)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="font-semibold mb-4">{t.symptoms}</h3>
                <Textarea
                  placeholder={t.symptomsPlaceholder}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Booking Summary */}
              {selectedDate && selectedTime && consultationType && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">{t.appointmentDetails}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Doctor:</span>
                        <span className="font-medium">{selectedDoctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{selectedDate.toDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{getConsultationTypeName(consultationType)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Fee:</span>
                        <span className="font-bold text-primary">₹{selectedDoctor.consultationFee}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Book Button */}
              <Button
                onClick={handleBooking}
                disabled={isBooking || !selectedDate || !selectedTime || !consultationType}
                className="w-full"
                size="lg"
              >
                {isBooking ? t.booking : t.bookAppointment}
                {!isBooking && <CalendarDays className="w-4 h-4 ml-2" />}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};