import CTABtn from "./CTABtn";
import TapeTag from "./TapeTag";

export default function ProductCard({
  image,
  title,
  tagRotation = 12,
  tagPosition = "top-left",
  tagScale = 1,
  tagOffset = {}, // e.g., { top: "10px", left: "12px" }
  variant = "default", 
  cardRotation = 0,
  className = "",
  cardScale = 1,
}) {
  return (
    <div className={`relative w-full max-w-xs bg-white shadow-2xl p-4 pb-10 ${className}`}
    style={{
      transform: `rotate(${cardRotation}deg) scale(${cardScale})`,
    }}
    >
      {/* Tape image tag */}
      <TapeTag
        rotation={tagRotation}
        position={tagPosition}
        scale={tagScale}
        offset={tagOffset}
      />

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover"
      />

      {/* Optional Content */}
      {variant === "default" && (
        <div className=" pt-4 space-y-2 ">
          <h3 className="text-3xl font-ambit-regular">{title}</h3>
          <CTABtn text="get it now" variant="text" />
        </div>
      )}
    </div>
  );
}
