export default function Arrow({ strokeColor, dimension }) {
  return (
    <svg width={dimension} height={dimension} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.88867 12.5408L12.3966 7.03284L6.88867 1.5249" stroke={strokeColor} stroke-width="1.57435" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.3976 7.02954H1.15234" stroke={strokeColor} stroke-width="1.57435" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}
