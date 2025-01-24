import { useState } from "react";
import SparkleText from "./sparkle-text";

export default function SparkleContainer({ slice, onContentChange }) {
  const [activeComponent, setActiveComponent] = useState("mission");

  return (
    <div className="flex flex-col items-center justify-center space-y-8 950px:space-y-3">
      {/* First SparkleText */}
      <SparkleText
        slice={slice}
        onContentChange={onContentChange}
        isActive={activeComponent === "mission"}
        componentName="mission"
      />

      {/* Second SparkleText */}
      <SparkleText
        slice={slice}
        isRight
        onContentChange={onContentChange}
        isActive={activeComponent === "vision"}
        componentName="vision"
      />
    </div>
  );
}
