
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jazzImage from "../assets/lovable-uploads/e9385710-3f5d-47ad-99a6-1acdcff398a5.png";

const BuyTicket = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      name: "Dreamer",
      price: 1000,
      description: "Dreamers move first — catch your vibe early. Thank you for believing in the dream"
    },
    {
      name: "Early Bird",
      price: 1200,
      description: "Early birds don't just catch worms — they catch fire sets"
    },
    {
      name: "Duo-lipa",
      price: 2700,
      description: "Good things come in pairs. It's double the fun with Duo-Lipa."
    },
    {
      name: "Regular",
      price: 1500,
      description: "No rush, just vibes"
    },
    {
      name: "Gate",
      price: 1700,
      description: "I found the doors open"
    }
  ];

  const handleBuyNow = (ticket: { name: string, price: number }) => {
    navigate(`/checkout?ticket=${encodeURIComponent(ticket.name)}&price=${ticket.price}`);
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
            {tickets.map((ticket) => (
              <Card key={ticket.name} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-[#648767]/10 pb-2">
                  <CardTitle className="text-2xl flex items-center justify-between">
                    {ticket.name}
                    <Ticket className="h-6 w-6" />
                  </CardTitle>
                </CardHeader>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={jazzImage} 
                    alt="Jazz Event" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold mb-2">KSh {ticket.price}</p>
                  <p className="text-gray-600">{ticket.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleBuyNow(ticket)} 
                    className="w-full bg-[#648767] hover:bg-[#4c6c4c]"
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyTicket;
