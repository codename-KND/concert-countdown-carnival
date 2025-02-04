import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface CountdownTimerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

const CountdownTimer = ({ initialDate = new Date('2024-12-31'), onDateChange }: CountdownTimerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [targetDate, setTargetDate] = useState(initialDate);
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
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isVisible]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setTargetDate(date);
      onDateChange?.(date);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="text-center p-6 rounded-lg bg-secondary/50 backdrop-blur-sm max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Concert Countdown</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-10 p-0">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={targetDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button 
            variant="outline"
            onClick={() => setIsVisible(false)}
            className="text-sm"
          >
            Hide
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-background/50 p-4 rounded-lg">
          <div className="text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-sm text-muted-foreground">Days</div>
        </div>
        <div className="bg-background/50 p-4 rounded-lg">
          <div className="text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm text-muted-foreground">Hours</div>
        </div>
        <div className="bg-background/50 p-4 rounded-lg">
          <div className="text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </div>
        <div className="bg-background/50 p-4 rounded-lg">
          <div className="text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm text-muted-foreground">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;