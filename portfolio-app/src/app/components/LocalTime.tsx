"use client";

import React, { useState, useEffect } from "react";
import styles from "./LocalTime.module.css";

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

const LocalTime: React.FC = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const greeting = getGreeting(now.getHours());
  const time = formatTime(now);

  return (
    <div className={styles.container}>
      <span className={styles.greeting}>{greeting}</span>
      <span className={styles.time}>{time}</span>
    </div>
  );
};

export default LocalTime;
