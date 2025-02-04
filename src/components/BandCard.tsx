import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BandCardProps {
  name: string;
  image: string;
  bio: string;
}

const BandCard = ({ name, image, bio }: BandCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{bio}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default BandCard;