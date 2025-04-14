import CountdownTimer from "@/components/CountdownTimer";
import BandCard from "@/components/BandCard";
import EmailSignup from "@/components/EmailSignup";
import jb from "../assets/JB.jpg";
import chat from "../assets/chat.jpg";
import gambz from "../assets/gambz.jpg";
import ff from "../assets/ff.jpg";
import leny from "../assets/len.jpg";

const Index = () => {
  const bands = [
    {
      name: "Kevin Mugambi - Violinist",
      image: gambz ,
      bio: "A passionate violinist from Nairobi, Mugambi captivates audiences with soulful melodies and dynamic performances. With a unique blend of classical influence , jazz, improvisation and creative artistry, they are on a journey to make a global mark in the music world. Prepare to be enchanted by music that speaks directly to the heart .",
      socialLinks: {
        instagram: "https://www.instagram.com/_mugambik?igsh=N3J2OTlreWw0czdo"
      }
    },
    {
      name: "Charity",
      image: chat,
      bio: "Blending flute and voice to create a sound that’s both soulful and expressive. Music has always been my way of taping into quietude through the warm tones of my voice or the fluid melodies of my flute. Whether I’m performing solo or collaborating with others, I aim to create moments that transport listeners and make them feel something real.",
      socialLinks: {
        instagram: "https://www.instagram.com/qwikiza?igsh=bW5tYzJ2Z3J2Y3Jo",
      }
    },
    {
      name: "Frequency Friends",
      image: ff,
      bio: " We take you on a live music sonic journey of a symphony that creates harmony for hearts, echoing Earth's imperative call. Immerse yourself in a fusion of melodies that awaken the soul, blending rhythm and resonance into an unforgettable experience",
      socialLinks: {
       instagram: "https://www.instagram.com/frequencyfriendsband?igsh=MTdtZTdtaXVwbzRvdA==",
      }
    },
    {
      name: "JB Wangiha",
      image: jb,
      bio: "John 'JB' Wangiha is an outstanding musician based in Nairobi, Kenya. He is a multi-instrumentalist, music producer and music arranger, keen on working on jazz music and experimental genres.His main instrument of proficiency is the bass guitar, which he has been playing professionally for more than four years. He has extensively played with musicians from a variety of genres, from afro-fusion to contemporary jazz fusion.Be on the lookout for his breakout for his musically-inspired project dubbed Bass-ically Speaking.",
      socialLinks: {
        instagram: "https://www.instagram.com/jb_wangiha/#"
      }
    },
    {
      name: "Leny",
      image: leny,
      bio: "Your local air-bender. I do what I love, and music happens to be on the list",
      socialLinks: {
        instagram: "https://www.instagram.com/lenysmusic?igsh=MWRvY2d5eDlwZXhxdA==",
        spotify: "https://open.spotify.com/album/0KbGfoylJ1U0MfdJUuvPlt?si=vjhPmqJoTNictAYQKLe33g"
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
          <h2 className="text-4xl font-bold text-center mb-12">Friends</h2>
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