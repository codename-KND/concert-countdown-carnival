
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket, Star, Info, MinusCircle, PlusCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import len from "../assets/len.jpg";
import { toast } from "@/hooks/use-toast";

const BuyTicket = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showDreamer, setShowDreamer] = useState(false);
  const [ticketQuantities, setTicketQuantities] = useState({
    dreamer: 1,
    earlyBird: 1,
    duoLipa: 1,
    regular: 1,
    gate: 1
  });
  const [ticketAvailability, setTicketAvailability] = useState({
    dreamer: false,
    earlyBird: false,
    duoLipa: false,
    regular: false,
    gate: false
  });

  const tickets = [
    {
      id: "dreamer",
      name: "Dreamer",
      price: 1000,
      description: "Dreamers move first — catch your vibe early. Thank you for believing in the dream",
      startDate: new Date('2025-04-30T00:00:00Z'),
      endDate: new Date('2025-05-20T23:59:59Z'),
      buyStartDate: new Date('2025-05-01T00:00:00Z'),
      color: "from-yellow-400 to-amber-500",
      maxQuantity: 1
    },
    {
      id: "earlyBird",
      name: "Early Bird",
      price: 1200,
      description: "Early birds don't just catch worms — they catch fire sets",
      startDate: new Date('2025-05-07T00:00:00Z'),
      endDate: new Date('2025-06-07T23:59:59Z'),
      color: "from-green-400 to-teal-500",
      maxQuantity: 10
    },
    {
      id: "duoLipa",
      name: "Duo-lipa",
      price: 2700,
      description: "Good things come in pairs. It's double the fun with Duo-Lipa.",
      viewStartDate: new Date('2025-06-05T00:00:00Z'), // Can be viewed from June 5th
      startDate: new Date('2025-06-08T00:00:00Z'),     // Buyable from June 8th
      endDate: new Date('2025-06-27T23:59:59Z'),
      color: "from-green-400 to-teal-500",
      admitsText: "Admits 2 people",
      maxQuantity: 5
    },
    {
      id: "regular",
      name: "Regular",
      price: 1500,
      description: "No rush, just vibes",
      startDate: new Date('2025-05-06T00:00:00Z'),
      endDate: new Date('2025-07-04T23:59:59Z'),
      color: "from-green-400 to-teal-500",
      maxQuantity: 10
    },
    {
      id: "gate",
      name: "Gate",
      price: 1700,
      description: "I found the doors open",
      startDate: new Date('2025-05-06T00:00:00Z'),
      endDate: new Date('2025-07-07T23:59:59Z'),
      color: "from-green-400 to-teal-500",
      maxQuantity: 10
    }
  ];

  useEffect(() => {
    // Check for Dreamer special link
    const dreamerParam = searchParams.get("dreamer");
    if (dreamerParam) {
      // Check if dreamer ticket is still available based on date
      const now = new Date();
      const dreamerTicket = tickets.find(t => t.id === "dreamer");
      
      if (dreamerTicket && now >= dreamerTicket.startDate && now <= dreamerTicket.endDate) {
        setShowDreamer(true);
      } else {
        toast({
          title: "Dreamer Tickets Unavailable",
          description: "Looks like you missed out, but lucky for you we still have more tickets!",
          variant: "destructive"
        });
      }
    }

    // Check ticket availability based on current UTC time
    const now = new Date();
    setTicketAvailability({
      dreamer: false, // Dreamer is only shown via special link
      earlyBird: isTicketAvailable("earlyBird", now),
      duoLipa: isDuoLipaVisible(now),
      regular: isTicketAvailable("regular", now),
      gate: isTicketAvailable("gate", now)
    });

    // Update availability every minute
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTicketAvailability({
        dreamer: false, // Dreamer is only shown via special link
        earlyBird: isTicketAvailable("earlyBird", currentTime),
        duoLipa: isDuoLipaVisible(currentTime),
        regular: isTicketAvailable("regular", currentTime),
        gate: isTicketAvailable("gate", currentTime)
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [searchParams]);

  const isTicketAvailable = (ticketId: string, currentTime: Date) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return false;
    
    return currentTime >= ticket.startDate && currentTime <= ticket.endDate;
  };

  // Special check for Duo-lipa to make it visible from June 5th but buyable from June 8th
  const isDuoLipaVisible = (currentTime: Date) => {
    const duoLipaTicket = tickets.find(t => t.id === "duoLipa");
    if (!duoLipaTicket) return false;
    
    // Check if it's past the view date and before end date
    return currentTime >= duoLipaTicket.viewStartDate && currentTime <= duoLipaTicket.endDate;
  };

  // Check if Duo-lipa is buyable
  const isDuoLipaBuyable = (currentTime: Date) => {
    const duoLipaTicket = tickets.find(t => t.id === "duoLipa");
    if (!duoLipaTicket) return false;
    
    return currentTime >= duoLipaTicket.startDate && currentTime <= duoLipaTicket.endDate;
  };

  const isBuyButtonEnabled = (ticket: any) => {
    const now = new Date();
    if (ticket.id === "dreamer") {
      return now >= ticket.buyStartDate && now <= ticket.endDate;
    }
    if (ticket.id === "duoLipa") {
      return isDuoLipaBuyable(now);
    }
    return true;
  };

  const handleBuyNow = (ticket: any, quantity: number) => {
    if (ticket.id === "dreamer" && !isBuyButtonEnabled(tickets[0])) {
      toast({
        title: "Not Available Yet",
        description: "Dreamer tickets will be available for purchase starting May 1st, 2025.",
      });
      return;
    }
    
    if (ticket.id === "duoLipa" && !isDuoLipaBuyable(new Date())) {
      toast({
        title: "Not Available Yet",
        description: "Duo-lipa tickets will be available for purchase starting June 8th, 2025.",
      });
      return;
    }
    
    navigate(`/checkout?ticket=${encodeURIComponent(ticket.name)}&price=${ticket.price}&quantity=${quantity}${ticket.admitsText ? "&admits=2" : ""}`);
  };
  
  const increaseQuantity = (id: string) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    
    setTicketQuantities(prev => ({
      ...prev,
      [id]: Math.min(prev[id as keyof typeof prev] + 1, ticket.maxQuantity)
    }));
  };

  const decreaseQuantity = (id: string) => {
    setTicketQuantities(prev => ({
      ...prev,
      [id]: Math.max(prev[id as keyof typeof prev] - 1, 1)
    }));
  };

  const renderTicketCard = (ticket: any, isAvailable: boolean, isDreamer: boolean = false) => {
    const quantity = ticketQuantities[ticket.id as keyof typeof ticketQuantities];
    const now = new Date();
    const isBuyable = ticket.id === "duoLipa" ? isDuoLipaBuyable(now) : true;
    
    return (
      <div 
        className={`relative transition-all duration-500 ${
          isAvailable ? "animate-fade-in opacity-100" : "opacity-70"
        } ${isDreamer ? "animate-pulse-slow" : ""}`}
      >
        <Card 
          key={ticket.name} 
          className={`overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            isDreamer ? "border-2 border-yellow-400" : ""
          } ${!isAvailable ? "bg-white/80" : ""}`}
        >
          <CardHeader className={`bg-gradient-to-r ${ticket.color} text-white`}>
            <CardTitle className="flex items-center justify-between">
              {ticket.name}
              {isDreamer && <Star className="h-5 w-5 text-yellow-200 animate-pulse-slow" />}
              <Ticket className="h-6 w-6" />
            </CardTitle>
          </CardHeader>
          <div className="relative h-32 overflow-hidden">
            <img 
              src={len} 
              alt="Jazz Event" 
              className="w-full h-full object-cover"
            />
            {(!isAvailable || (ticket.id === "duoLipa" && !isBuyable)) && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center">
                <Info className="h-8 w-8 text-gray-500 mb-2" />
                <p className="font-semibold text-lg text-gray-700">
                  {ticket.id === "duoLipa" && isAvailable ? "Coming June 8th" : "Coming Soon"}
                </p>
              </div>
            )}
          </div>
          <CardContent className="pt-4">
            {isAvailable && (
              <p className="text-2xl font-bold mb-2">KSh {ticket.price}</p>
            )}
            <p className="text-gray-600 text-sm">{ticket.description}</p>
            {ticket.admitsText && (
              <p className="text-sm font-medium text-purple-600 mt-2">{ticket.admitsText}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 pt-0">
            {isAvailable && (
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-sm">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => decreaseQuantity(ticket.id)}
                    disabled={ticketQuantities[ticket.id as keyof typeof ticketQuantities] <= 1}
                    className="rounded-full h-7 w-7 p-0"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  
                  <span className="font-bold text-base w-6 text-center">{quantity}</span>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => increaseQuantity(ticket.id)}
                    disabled={ticketQuantities[ticket.id as keyof typeof ticketQuantities] >= ticket.maxQuantity}
                    className="rounded-full h-7 w-7 p-0"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <Button 
              onClick={() => handleBuyNow(ticket, ticketQuantities[ticket.id as keyof typeof ticketQuantities])}
              disabled={!isAvailable || !isBuyButtonEnabled(ticket)}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cee7e6] to-[#7dc95e]">
      {/* Header Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#648767] to-[#7cdf64] text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            𝙻𝚎𝚗𝚢 𝚊𝚗𝚍 𝙵𝚛𝚒𝚎𝚗𝚍𝚜
          </h1>
          <h2 className="text-xl md:text-2xl">
            𝑨 𝑱𝒂𝒛𝒛 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆 𝒍𝒊𝒌𝒆 𝒏𝒐 𝒐𝒕𝒉𝒆𝒓
          </h2>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">𝚃𝚒𝚌𝚔𝚎𝚝𝚜</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showDreamer && (
              renderTicketCard(tickets[0], true, true)
            )}
            
            {tickets.slice(1).map((ticket, index) => (
              <div key={ticket.id}>
                {renderTicketCard(ticket, ticketAvailability[ticket.id as keyof typeof ticketAvailability])}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyTicket;
