import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface CountdownTimerProps {
  initialDate: Date;
}

const CountdownTimer = ({ initialDate }: CountdownTimerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = initialDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialDate, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">05-07-25 𝑪𝒐𝒏𝒄𝒆𝒓𝒕 𝑪𝒐𝒖𝒏𝒕𝒅𝒐𝒘𝒏</h2>
        
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="bg-black/20 p-2 md:p-4 rounded-lg">
          <div className="text-2xl md:text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-xs md:text-sm text-white/80">Days</div>
        </div>
        <div className="bg-black/20 p-2 md:p-4 rounded-lg">
          <div className="text-2xl md:text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs md:text-sm text-white/80">Hours</div>
        </div>
        <div className="bg-black/20 p-2 md:p-4 rounded-lg">
          <div className="text-2xl md:text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs md:text-sm text-white/80">Minutes</div>
        </div>
        <div className="bg-black/20 p-2 md:p-4 rounded-lg">
          <div className="text-2xl md:text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs md:text-sm text-white/80">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;