"use client";

import { useState, useEffect } from "react";

export const MonitorStarter = () => {
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const checkDatabaseConnection = async () => {
    try {
      const response = await fetch("/api/monitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setState(data.message);
    } catch (error) {
      setState(`Failed to connect: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkDatabaseConnection();

    const interval = setInterval(() => {
      setIsLoading(true);
      checkDatabaseConnection();
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h2>Database Monitoring</h2>
      <p>{isLoading ? "Checking connection..." : state}</p>
    </div>
  );
};
