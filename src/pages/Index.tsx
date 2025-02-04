import CountdownTimer from "@/components/CountdownTimer";
import BandCard from "@/components/BandCard";
import EmailSignup from "@/components/EmailSignup";

const Index = () => {
  const bands = [
    {
      name: "The Electric Echoes",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      bio: "Blending electronic beats with rock undertones, The Electric Echoes create an unforgettable sonic experience that will keep you dancing all night long."
    },
    {
      name: "Midnight Pulse",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      bio: "With their signature blend of synth-wave and indie rock, Midnight Pulse delivers heart-pounding performances that leave audiences breathless."
    },
    {
      name: "Neon Horizon",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bio: "Progressive rock meets modern electronica in this groundbreaking ensemble, pushing the boundaries of contemporary music."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            Summer Music Festival 2024
          </h1>
          <CountdownTimer />
        </div>
      </section>

      {/* Bands Section */}
      <section className="py-20 px-4 section-fade">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bands.map((band) => (
              <BandCard key={band.name} {...band} />
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-20 px-4 bg-secondary/50 section-fade">
        <div className="container mx-auto">
          <EmailSignup />
        </div>
      </section>
    </div>
  );
};

export default Index;