import Arrow from "../Arrow";

export default function SwiperArrow({ onClick, className, strokeColor }) {
  return (
    <div 
      className={`${className} rounded-full h-[3.1rem] w-[3.1rem] flex items-center justify-center cursor-pointer hover:opacity-80 active:scale-95`} 
      onClick={onClick}
      type="button"
    >
      <Arrow 
        strokeColor={strokeColor}
        dimension="40%"
      />
    </div>
  )
}
