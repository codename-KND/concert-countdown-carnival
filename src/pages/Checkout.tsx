
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const [ticketName, setTicketName] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [admits, setAdmits] = useState<number>(1);

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

  const totalPrice = ticketPrice * quantity;
  const totalPeople = quantity * admits;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cee7e6] to-[#7dc95e] py-20 px-4">
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

              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total:</span>
                <span>KSh {totalPrice}</span>
              </div>
              
              <div className="pt-4">
                <p className="text-center text-sm text-gray-600">
                  This is a demo checkout page. In a real application, payment processing would be implemented here.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Complete Purchase
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
