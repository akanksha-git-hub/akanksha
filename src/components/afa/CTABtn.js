export default function CTABtn({
  text = "Click me",
  variant = "text",
  direction = "right",
  href = "#",
  onClick,
  
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all font-ambit-regular text-white overflow-hidden border border-black";

  const backgroundStyle = {
    backgroundImage: "url('/images/cta-bg-texture.png')",
    backgroundSize: "30%",
    backgroundPosition: "center",
    backgroundColor: "black",
  };

  const arrowClass =
    direction === "left" ? "w-6 h-4 transform rotate-180" : "w-6 h-4";

    if (variant === "arrow-only") {
      return (
        <div className="relative group inline-block w-20 h-14">
          {/* Hover Background */}
          <div
            className={`absolute w-full h-full rounded-[100px] z-0 border-2 border-black transition-transform duration-300 ease-in-out transform
              ${direction === "left"
                ? "group-hover:-translate-x-1 group-hover:translate-y-1"
                : "group-hover:translate-x-1 group-hover:translate-y-1"
              }`}
            style={{
              backgroundImage: 'url("/shading.svg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
    
          {/* Button */}
          <button
          onClick={onClick}
            className={`${baseStyles} relative z-10 w-full h-full rounded-[100px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-inner transition-transform duration-100`}
            style={backgroundStyle}
            aria-label="Go"
          >
            <img
              src="/images/arrow-icon.png"
              alt="Arrow"
              className={arrowClass}
            />
          </button>
        </div>
      );
    }
    

  // ✅ For variant="text", wrap in <a> for href support
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group inline-block"
    >
      {/* Hover Pattern Effect */}
      <div
        className="absolute w-full h-full rounded-full z-0 transition-transform duration-300 ease-in-out transform translate-y-0 translate-x-0 group-hover:translate-y-1 group-hover:translate-x-1"
        style={{
          backgroundImage: 'url("/shading.svg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* Styled Button */}
      <div
        className={`${baseStyles} relative z-10 px-6 py-4 rounded-full min-w-[180px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-inner transition-transform duration-100`}
        style={backgroundStyle}
      >
        <span className="mr-2">{text}</span>
        <img src="/images/arrow-icon.png" alt="Arrow" className={arrowClass} />
      </div>
    </a>
  );
}
