export default function ThinArrow({ strokeColor, dimension }) {
    return (
        <svg width={dimension} height={dimension}  viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.3153 42.7162L43.8046 22.2267L23.3153 1.7373" stroke={strokeColor} stroke-width="2.21225" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M43.8055 22.2153H1.97339" stroke={strokeColor} stroke-width="2.21225" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

  