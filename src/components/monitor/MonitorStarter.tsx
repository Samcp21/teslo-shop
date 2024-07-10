"use client";
import { useEffect } from "react";

const MonitorStarter: React.FC = () => {
  useEffect(() => {
    fetch("/api/monitor")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("Error starting database monitoring:", error)
      );
  }, []);

  return null;
};

export default MonitorStarter;
