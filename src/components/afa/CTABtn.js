export default function CTABtn({
    text = "Click me",
    variant = "text",
    direction = "right",
  }) {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all font-ambit-regular text-white overflow-hidden border border-black"; // ✅ added border-black here
  
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
        <button
          className={`${baseStyles} w-20 h-14 rounded-[100px]`}
          style={backgroundStyle}
          aria-label="Go"
        >
          <img src="/images/arrow-icon.png" alt="Arrow" className={arrowClass} />
        </button>
      );
    }
  
    // Default: Text + Arrow
    return (
      <button
        className={`${baseStyles} px-6 py-4 rounded-full min-w-[180px]`}
        style={backgroundStyle}
      >
        <span className="mr-2">{text}</span>
        <img src="/images/arrow-icon.png" alt="Arrow" className={arrowClass} />
      </button>
    );
  }
  