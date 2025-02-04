import CountdownTimer from "@/components/CountdownTimer";
import BandCard from "@/components/BandCard";
import EmailSignup from "@/components/EmailSignup";

const Index = () => {
  const bands = [
    {
      name: "𝐂𝐡𝐚𝐫𝐢𝐭𝐲-𝐐𝐰𝐢𝐤𝐢𝐳𝐚",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
      bio: "𝘉𝘳𝘪𝘯𝘨𝘪𝘯𝘨 𝘴𝘰𝘶𝘭𝘧𝘶𝘭 𝘮𝘦𝘭𝘰𝘥𝘪𝘦𝘴 𝘢𝘯𝘥 𝘱𝘰𝘸𝘦𝘳𝘧𝘶𝘭 𝘷𝘰𝘤𝘢𝘭𝘴 𝘵𝘰 𝘵𝘩𝘦 𝘴𝘵𝘢𝘨𝘦.",
      socialLinks: {
        instagram: "https://instagram.com/charity",
        spotify: "https://spotify.com/charity"
      }
    },
    {
      name: "𝐅𝐫𝐞𝐪𝐮𝐞𝐧𝐜𝐲 𝐅𝐫𝐢𝐞𝐧𝐝𝐬",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c",
      bio: "𝘈 𝘤𝘰𝘭𝘭𝘦𝘤𝘵𝘪𝘷𝘦 𝘰𝘧 𝘮𝘶𝘴𝘪𝘤𝘢𝘭 𝘵𝘢𝘭𝘦𝘯𝘵𝘴 𝘣𝘳𝘪𝘯𝘨𝘪𝘯𝘨 𝘩𝘢𝘳𝘮𝘰𝘯𝘺 𝘢𝘯𝘥 𝘳𝘩𝘺𝘵𝘩𝘮 𝘵𝘰𝘨𝘦𝘵𝘩𝘦𝘳.",
      members: ["John Doe", "Jane Smith", "Mike Johnson"],
      socialLinks: {
        youtube: "https://youtube.com/frequency",
        spotify: "https://spotify.com/frequency"
      }
    },
    {
      name: "𝐌𝐮𝐠𝐚𝐦𝐛𝐢",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      bio: "𝘉𝘭𝘦𝘯𝘥𝘪𝘯𝘨 𝘵𝘳𝘢𝘥𝘪𝘵𝘪𝘰𝘯𝘢𝘭 𝘢𝘯𝘥 𝘮𝘰𝘥𝘦𝘳𝘯 𝘴𝘰𝘶𝘯𝘥𝘴 𝘪𝘯 𝘢 𝘶𝘯𝘪𝘲𝘶𝘦 𝘮𝘶𝘴𝘪𝘤𝘢𝘭 𝘦𝘹𝘱𝘦𝘳𝘪𝘦𝘯𝘤𝘦.",
      socialLinks: {
        instagram: "https://instagram.com/mugambi"
      }
    },
    {
      name: "𝐉𝐚𝐲𝐝",
      image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
      bio: "𝘊𝘳𝘦𝘢𝘵𝘪𝘯𝘨 𝘢𝘵𝘮𝘰𝘴𝘱𝘩𝘦𝘳𝘪𝘤 𝘴𝘰𝘶𝘯𝘥𝘴𝘤𝘢𝘱𝘦𝘴 𝘵𝘩𝘢𝘵 𝘵𝘳𝘢𝘯𝘴𝘱𝘰𝘳𝘵 𝘭𝘪𝘴𝘵𝘦𝘯𝘦𝘳𝘴 𝘵𝘰 𝘢𝘯𝘰𝘵𝘩𝘦𝘳 𝘸𝘰𝘳𝘭𝘥.",
      socialLinks: {
        spotify: "https://spotify.com/jayd"
      }
    },
    {
      name: "𝐉𝐞𝐬𝐬𝐞 𝐃𝐚𝐯𝐢𝐝",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
      bio: "𝘉𝘳𝘪𝘯𝘨𝘪𝘯𝘨 𝘳𝘢𝘸 𝘦𝘯𝘦𝘳𝘨𝘺 𝘢𝘯𝘥 𝘱𝘢𝘴𝘴𝘪𝘰𝘯 𝘵𝘰 𝘦𝘷𝘦𝘳𝘺 𝘱𝘦𝘳𝘧𝘰𝘳𝘮𝘢𝘯𝘤𝘦.",
      socialLinks: {
        instagram: "https://instagram.com/jesse",
        youtube: "https://youtube.com/jesse"
      }
    },
    {
      name: "𝐋𝐞𝐧𝐲",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      bio: "𝘛𝘩𝘦 𝘮𝘢𝘴𝘵𝘦𝘳𝘮𝘪𝘯𝘥 𝘣𝘦𝘩𝘪𝘯𝘥 𝘵𝘩𝘪𝘴 𝘪𝘯𝘤𝘳𝘦𝘥𝘪𝘣𝘭𝘦 𝘭𝘪𝘯𝘦𝘶𝘱, 𝘣𝘳𝘪𝘯𝘨𝘪𝘯𝘨 𝘢𝘳𝘵𝘪𝘴𝘵𝘴 𝘵𝘰𝘨𝘦𝘵𝘩𝘦𝘳.",
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
            𝙻𝚎𝚗𝚢 𝚊𝚗𝚍 𝙵𝚛𝚒𝚎𝚗𝚍𝚜
          </h1>
          <CountdownTimer initialDate={new Date('2025-07-05')} />
        </div>
      </section>

      {/* Bands Section */}
      <section className="py-20 px-4 section-fade">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">𝙵𝚛𝚒𝚎𝚗𝚍𝚜</h2>
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