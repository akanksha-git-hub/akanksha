"use client";

import useDebouncedResize from "@/hooks/useDebouncedResize";
import { useEffect, useState } from "react";

export default function Page() {
  const [test, setTest] = useState({ dia: 300, rotate: 360 });
  const { width } = useDebouncedResize();
  const keyItems = 20;
  const dummyData = Array.from({ length: keyItems }, (_, i) => i);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTest((prev) => ({
        dia: prev.dia === 300 ? 100 : 300,
        rotate: prev.rotate === 360 ? 0 : 360,
      }));
    }, 2200);

    return () => clearTimeout(timeout);
  }, [test.dia]);

  const radius = (test.dia / 10) * 50; // scale logic
  const n = dummyData.length;

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div
        className="relative border border-white rounded-full"
        style={{
          height: `${test.dia}px`,
          width: `${test.dia}px`,
          transformOrigin: "center",
          transform: `rotate(${test.rotate}deg)`,
          transition: "all 2s ease",
        }}
      >
        {/* cross lines */}
        {[0, 90, 45, -45].map((angle, i) => (
          <div
            key={i}
            className="absolute border border-white"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              width: angle % 90 === 0 ? "100%" : "1px",
              height: angle % 90 === 0 ? "1px" : "100%",
            }}
          />
        ))}

        {/* dots */}
        {dummyData.map((_, index) => {
          const sectorAngle = (360 / n) * index;
          const angleInRad = (sectorAngle * Math.PI) / 180;

          const x = Math.cos(angleInRad) * radius - 5;
          const y = Math.sin(angleInRad) * radius - 5;

          const color = `rgb(${Math.floor(Math.random() * 255)}, ${
            Math.floor(Math.random() * 255)
          }, ${Math.floor(Math.random() * 255)})`;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: color,
                borderRadius: "50%",
                transform: `translate(${x}px, ${y}px)`,
                transition: "all 1s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
