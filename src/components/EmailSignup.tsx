import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this URL with your actual Google Form URL
    const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
    window.open(googleFormUrl, '_blank');
    
    toast({
      title: "Thanks for your interest!",
      description: "You'll be redirected to our signup form.",
    });
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-black">𝐉𝐨𝐢𝐧 𝐭𝐡𝐞 𝐌𝐚𝐢𝐥𝐢𝐧𝐠 𝐋𝐢𝐬𝐭</h2>
      <p className="text-black text-center">
        𝑺𝒕𝒂𝒚 𝒖𝒑𝒅𝒂𝒕𝒆𝒅 𝒂𝒃𝒐𝒖𝒕 𝑳𝒆𝒏𝒚 𝒂𝒏𝒅 𝑭𝒓𝒊𝒆𝒏𝒅𝒔 𝒄𝒐𝒏𝒄𝒆𝒓𝒕𝒔 𝒂𝒏𝒅 𝒈𝒆𝒕 𝒆𝒙𝒄𝒍𝒖𝒔𝒊𝒗𝒆 𝒄𝒐𝒏𝒕𝒆𝒏𝒕!
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  );
};

export default EmailSignup;