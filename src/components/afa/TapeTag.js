export default function TapeTag({
  src = "/images/tape.png",
  position = "top-left",
  rotation = -12,
  scale = 1,
  offset = {}, // e.g., { top: "1rem", left: "1.5rem" }
  className = "",
}) {
  // Tailwind-style base positions
  const defaultPositions = {
    "top-left": "absolute top-0 left-0",
    "top-right": "absolute top-0 right-0",
    "bottom-left": "absolute bottom-0 left-0",
    "bottom-right": "absolute bottom-0 right-0",
  };

  const transformStyle = `rotate(${rotation}deg) scale(${scale})`;

  return (
    <img
      src={src}
      alt="Tape"
      className={`
        ${defaultPositions[position]} 
        pointer-events-none z-10 
        ${className}
      `}
      style={{
        transform: transformStyle,
        ...offset,
      }}
    />
  );
}
