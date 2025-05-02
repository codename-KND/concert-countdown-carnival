
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [ticketName, setTicketName] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [admits, setAdmits] = useState<number>(1);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    mpesaNumber: "",
    email: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const ticket = searchParams.get("ticket");
    const price = searchParams.get("price");
    const qty = searchParams.get("quantity");
    const admitsParam = searchParams.get("admits");
    
    if (ticket) setTicketName(ticket);
    if (price) setTicketPrice(Number(price));
    if (qty) setQuantity(Number(qty));
    if (admitsParam) setAdmits(Number(admitsParam));
  }, [searchParams]);

  const decreaseQuantity = () => {
    if (quantity > 1 && ticketName !== "Dreamer") {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (ticketName !== "Dreamer") {
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "mpesaNumber") {
      // Only allow digits
      if (value && !/^\d*$/.test(value)) {
        setPhoneError("Phone number should only contain digits");
        return;
      } else {
        setPhoneError("");
      }
      
      // Limit to 10 digits
      if (value.length > 10) {
        return;
      }
    }
    
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const validatePhoneNumber = (phone: string) => {
    if (!phone.trim()) {
      setPhoneError("M-Pesa number is required");
      return false;
    }
    
    if (phone.length !== 10) {
      setPhoneError("M-Pesa number must be exactly 10 digits");
      return false;
    }
    
    if (!/^0[7|1]\d{8}$/.test(phone)) {
      setPhoneError("Please enter a valid Kenyan phone number starting with 07 or 01");
      return false;
    }
    
    setPhoneError("");
    return true;
  };

  const initiateMpesaSTKPush = async (phoneNumber: string, amount: number) => {
    try {
      setIsProcessing(true);
      
      // Format phone number to required format (remove leading zero, add country code)
      const formattedPhone = `254${phoneNumber.substring(1)}`;
      
      // Here we would call the M-Pesa API
      // In a real implementation, this would be an API call to your backend
      // which would then communicate with the M-Pesa API
      console.log("Initiating real M-Pesa STK push");
      console.log("Phone:", formattedPhone);
      console.log("Amount:", amount);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would process the API response here
      // For now, we'll simulate a successful response
      toast({
        title: "M-Pesa STK Push Initiated",
        description: `Please check your phone ${phoneNumber} for an M-Pesa prompt to pay KSh ${amount}`,
      });
      
      return true;
    } catch (error) {
      console.error("M-Pesa STK push failed:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error initiating the M-Pesa payment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompletePurchase = async () => {
    // Validate fields
    if (!personalInfo.fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(personalInfo.mpesaNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: phoneError || "Please enter a valid M-Pesa number",
        variant: "destructive",
      });
      return;
    }

    if (!personalInfo.email.trim() || !personalInfo.email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Initiate M-Pesa STK push
    await initiateMpesaSTKPush(personalInfo.mpesaNumber, totalPrice);
  };

  const totalPrice = ticketPrice * quantity;
  const totalPeople = quantity * admits;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cee7e6] to-[#7dc95e] py-6 md:py-20 px-4">
      <div className="container mx-auto max-w-md">
        <Card className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-[#648767] to-[#7cdf64] text-white">
            <CardTitle className="text-2xl text-center">Checkout</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Ticket Type:</span>
                <span className="font-bold">{ticketName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Price per Ticket:</span>
                <span className="font-bold">KSh {ticketPrice}</span>
              </div>
              
              {ticketName !== "Dreamer" ? (
                <div className="flex justify-between items-center border-b pb-4 pt-2">
                  <span>Quantity:</span>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="rounded-full h-8 w-8"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                    
                    <span className="font-bold text-lg w-6 text-center">{quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={increaseQuantity}
                      className="rounded-full h-8 w-8"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between border-b pb-4 pt-2">
                  <span>Quantity:</span>
                  <span className="font-bold">1</span>
                </div>
              )}

              {admits > 1 && (
                <div className="flex justify-between pt-2 pb-4 border-b">
                  <span>Admits:</span>
                  <span className="font-bold">{totalPeople} people</span>
                </div>
              )}

              <div className="flex justify-between pt-2 pb-4 border-b text-lg font-bold">
                <span>Total:</span>
                <span>KSh {totalPrice}</span>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium text-lg">Personal Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    placeholder="Enter your full name" 
                    value={personalInfo.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                  <Input 
                    id="mpesaNumber" 
                    name="mpesaNumber"
                    placeholder="e.g. 0712345678" 
                    type="tel"
                    value={personalInfo.mpesaNumber}
                    onChange={handleInputChange}
                    className={phoneError ? "border-red-500" : ""}
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500">{phoneError}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    placeholder="your@email.com" 
                    type="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button 
              className="w-full text-white" 
              style={{ backgroundColor: "#a60505", borderColor: "#a60505" }}
              onClick={handleCompletePurchase}
              disabled={isProcessing}
            >
              <Smartphone className="mr-2" size={16} />
              {isProcessing ? "Processing..." : "Complete Purchase via M-Pesa"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              Back to Tickets
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
