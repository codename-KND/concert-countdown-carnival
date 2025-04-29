
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const [ticketName, setTicketName] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number>(0);

  useEffect(() => {
    const ticket = searchParams.get("ticket");
    const price = searchParams.get("price");
    
    if (ticket) setTicketName(ticket);
    if (price) setTicketPrice(Number(price));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cee7e6] to-[#7dc95e] py-20 px-4">
      <div className="container mx-auto max-w-md">
        <Card>
          <CardHeader className="bg-[#648767]/10">
            <CardTitle className="text-2xl text-center">Checkout</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Ticket Type:</span>
                <span className="font-bold">{ticketName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Price:</span>
                <span className="font-bold">KSh {ticketPrice}</span>
              </div>
              <div className="pt-4">
                <p className="text-center text-sm text-gray-600">
                  This is a demo checkout page. In a real application, payment processing would be implemented here.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button className="w-full bg-[#648767] hover:bg-[#4c6c4c]">
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
