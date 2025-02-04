import CountdownTimer from "@/components/CountdownTimer";
import BandCard from "@/components/BandCard";
import EmailSignup from "@/components/EmailSignup";

const Index = () => {
  const bands = [
    {
      name: "Charity-Qwikiza",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
      bio: "Bringing soulful melodies and powerful vocals to the stage.",
      socialLinks: {
        instagram: "https://instagram.com/charity",
        spotify: "https://spotify.com/charity"
      }
    },
    {
      name: "Frequency Friends",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c",
      bio: "A collective of musical talents bringing harmony and rhythm together.",
      members: ["John Doe", "Jane Smith", "Mike Johnson"],
      socialLinks: {
        youtube: "https://youtube.com/frequency",
        spotify: "https://spotify.com/frequency"
      }
    },
    {
      name: "Mugambi",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      bio: "Blending traditional and modern sounds in a unique musical experience.",
      socialLinks: {
        instagram: "https://instagram.com/mugambi"
      }
    },
    {
      name: "Jayd",
      image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
      bio: "Creating atmospheric soundscapes that transport listeners to another world.",
      socialLinks: {
        spotify: "https://spotify.com/jayd"
      }
    },
    {
      name: "Jesse David",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
      bio: "Bringing raw energy and passion to every performance.",
      socialLinks: {
        instagram: "https://instagram.com/jesse",
        youtube: "https://youtube.com/jesse"
      }
    },
    {
      name: "Leny",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      bio: "The mastermind behind this incredible lineup, bringing artists together.",
      socialLinks: {
        instagram: "https://instagram.com/leny",
        spotify: "https://spotify.com/leny"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cee7e6] to-[#7dc95e]">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#648767] to-[#7cdf64] text-white">
        <div className="container mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            Leny and Friends
          </h1>
          <CountdownTimer initialDate={new Date('2025-07-05')} />
        </div>
      </section>

      {/* Bands Section */}
      <section className="py-20 px-4 section-fade">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">The Friends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bands.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-20 px-4 bg-[#bfc0c0]/50 section-fade">
        <div className="container mx-auto">
          <EmailSignup />
        </div>
      </section>
    </div>
  );
};

export default Index;