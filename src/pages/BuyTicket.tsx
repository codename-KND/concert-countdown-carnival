
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket, Star, Info } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import poster from "../assets/Poster.jpg";
import { toast } from "@/hooks/use-toast";

const BuyTicket = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showDreamer, setShowDreamer] = useState(false);
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
      buyStartDate: new Date('2025-05-01T00:00:00Z')
    },
    {
      id: "earlyBird",
      name: "Early Bird",
      price: 1200,
      description: "Early birds don't just catch worms — they catch fire sets",
      startDate: new Date('2025-05-07T00:00:00Z'),
      endDate: new Date('2025-06-07T23:59:59Z')
    },
    {
      id: "duoLipa",
      name: "Duo-lipa",
      price: 2700,
      description: "Good things come in pairs. It's double the fun with Duo-Lipa.",
      startDate: new Date('2025-06-08T00:00:00Z'),
      endDate: new Date('2025-06-27T23:59:59Z')
    },
    {
      id: "regular",
      name: "Regular",
      price: 1500,
      description: "No rush, just vibes",
      startDate: new Date('2025-05-06T00:00:00Z'),
      endDate: new Date('2025-07-04T23:59:59Z')
    },
    {
      id: "gate",
      name: "Gate",
      price: 1700,
      description: "I found the doors open",
      startDate: new Date('2025-05-06T00:00:00Z'),
      endDate: new Date('2025-12-31T23:59:59Z') // End of year as fallback
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
      duoLipa: isTicketAvailable("duoLipa", now),
      regular: isTicketAvailable("regular", now),
      gate: isTicketAvailable("gate", now)
    });

    // Update availability every minute
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTicketAvailability({
        dreamer: false, // Dreamer is only shown via special link
        earlyBird: isTicketAvailable("earlyBird", currentTime),
        duoLipa: isTicketAvailable("duoLipa", currentTime),
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

  const isBuyButtonEnabled = (ticket: any) => {
    const now = new Date();
    return ticket.id === "dreamer" 
      ? now >= ticket.buyStartDate && now <= ticket.endDate
      : true;
  };

  const handleBuyNow = (ticket: { id: string, name: string, price: number }) => {
    if (ticket.id === "dreamer" && !isBuyButtonEnabled(tickets[0])) {
      toast({
        title: "Not Available Yet",
        description: "Dreamer tickets will be available for purchase starting May 1st, 2025.",
      });
      return;
    }
    navigate(`/checkout?ticket=${encodeURIComponent(ticket.name)}&price=${ticket.price}`);
  };
  
  const renderTicketCard = (ticket: any, isAvailable: boolean, isDreamer: boolean = false) => {
    return (
      <div 
        className={`relative transition-all duration-500 ${
          isAvailable ? "animate-fade-in opacity-100" : "opacity-70"
        } ${isDreamer ? "animate-pulse-slow" : ""}`}
      >
        <Card key={ticket.name} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
          isDreamer ? "border-2 border-yellow-400" : ""
        }`}>
          <CardHeader className="bg-[#648767]/10 pb-2">
            <CardTitle className="text-2xl flex items-center justify-between">
              {ticket.name}
              {isDreamer && <Star className="h-5 w-5 text-yellow-400 animate-pulse-slow" />}
              <Ticket className="h-6 w-6" />
            </CardTitle>
          </CardHeader>
          <div className="relative h-48 overflow-hidden">
            <img 
              src={poster} 
              alt="Jazz Event" 
              className="w-full h-full object-cover"
            />
            {!isAvailable && !isDreamer && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center">
                <Info className="h-8 w-8 text-gray-500 mb-2" />
                <p className="font-semibold text-lg text-gray-700">Coming Soon</p>
                <p className="text-sm text-gray-500">
                  Available from {ticket.startDate.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold mb-2">KSh {ticket.price}</p>
            <p className="text-gray-600">{ticket.description}</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleBuyNow(ticket)}
              disabled={!isAvailable || (ticket.id === "dreamer" && !isBuyButtonEnabled(ticket))}
              className={`w-full ${
                isDreamer 
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                  : "bg-[#648767] hover:bg-[#4c6c4c]"
              }`}
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
      <section className="py-20 px-4 bg-gradient-to-r from-[#648767] to-[#7cdf64] text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            𝙻𝚎𝚗𝚢 𝚊𝚗𝚍 𝙵𝚛𝚒𝚎𝚗𝚍𝚜
          </h1>
          <h2 className="text-2xl md:text-3xl">
            𝑨 𝑱𝒂𝒛𝒛 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆 𝒍𝒊𝒌𝒆 𝒏𝒐 𝒐𝒕𝒉𝒆𝒓
          </h2>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">𝚃𝚒𝚌𝚔𝚎𝚝𝚜</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showDreamer && renderTicketCard(tickets[0], true, true)}
            
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
