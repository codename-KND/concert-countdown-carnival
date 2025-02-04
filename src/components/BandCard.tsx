import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Music, Youtube } from "lucide-react";

interface SocialLinks {
  instagram?: string;
  spotify?: string;
  youtube?: string;
}

interface BandCardProps {
  name: string;
  image: string;
  bio: string;
  members?: string[];
  socialLinks?: SocialLinks;
}

const BandCard = ({ name, image, bio, members, socialLinks }: BandCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 rounded-xl">
      <div className="aspect-video overflow-hidden rounded-t-xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base">{bio}</CardDescription>
        
        {members && members.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Members:</h4>
            <ul className="list-disc list-inside">
              {members.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        )}

        {socialLinks && (
          <div className="flex gap-4 mt-4">
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                className="text-pink-600 hover:text-pink-700">
                <Instagram className="w-6 h-6" />
              </a>
            )}
            {socialLinks.spotify && (
              <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700">
                <Music className="w-6 h-6" />
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700">
                <Youtube className="w-6 h-6" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BandCard;