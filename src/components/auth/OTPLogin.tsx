// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";

// interface OTPLoginProps {
//   onLoginSuccess: (phone: string) => void;
//   language: string;
// }

// export const OTPLogin = ({ onLoginSuccess, language }: OTPLoginProps) => {
//   const { toast } = useToast();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState<"phone" | "otp">("phone");

//   const sendOTP = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast({ title: "✅ OTP Sent" });
//         setStep("otp");
//       } else {
//         toast({ title: "❌ Error", description: data.error || "Failed to send OTP", variant: "destructive" });
//       }
//     } catch {
//       toast({ title: "❌ Error", description: "Failed to send OTP", variant: "destructive" });
//     }
//   };

//   const verifyOTP = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber, otp }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         toast({ title: "✅ Login Successful" });
//         onLoginSuccess(phoneNumber);
//       } else {
//         toast({ title: "❌ Error", description: data.message || "Invalid OTP", variant: "destructive" });
//       }
//     } catch {
//       toast({ title: "❌ Error", description: "Verification failed", variant: "destructive" });
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {step === "phone" ? (
//         <>
//           <Input placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           <Button className="w-full" onClick={sendOTP}>Send OTP</Button>
//         </>
//       ) : (
//         <>
//           <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
//           <Button className="w-full" onClick={verifyOTP}>Verify OTP</Button>
//         </>
//       )}
//     </div>
//   );
// };



import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface OTPLoginProps {
  onLoginSuccess: (phone: string) => void;
  language: string;
}

export const OTPLogin = ({ onLoginSuccess, language }: OTPLoginProps) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

 const sendOTP = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber }),  // 👈 FIXED
    });
    const data = await res.json();
    if (res.ok && data.success) {
      toast({ title: "✅ OTP Sent" });
      setStep("otp");
    } else {
      toast({
        title: "❌ Error",
        description: data.error || "Failed to send OTP",
        variant: "destructive",
      });
    }
  } catch {
    toast({
      title: "❌ Error",
      description: "Failed to send OTP",
      variant: "destructive",
    });
  }
};

const verifyOTP = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber, otp }),  // 👈 FIXED
    });
    const data = await res.json();
    if (res.ok && data.success) {
      toast({ title: "✅ Login Successful" });
      onLoginSuccess(phoneNumber);
    } else {
      toast({
        title: "❌ Error",
        description: data.message || "Invalid OTP",
        variant: "destructive",
      });
    }
  } catch {
    toast({
      title: "❌ Error",
      description: "Verification failed",
      variant: "destructive",
    });
  }
};


  return (
    <div className="space-y-4">
      {step === "phone" ? (
        <>
          <Input placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <Button className="w-full" onClick={sendOTP}>Send OTP</Button>
        </>
      ) : (
        <>
          <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button className="w-full" onClick={verifyOTP}>Verify OTP</Button>
        </>
      )}
    </div>
  );
};