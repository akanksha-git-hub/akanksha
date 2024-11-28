'use client'

import { useEffect, useState } from "react";

export default function Page() {

  const [tickAngle, setTickAngle] = useState({ angle: 0, moved: false });

  const dummyX = 100 * Math.cos(10);
  const dummyY = 100 * Math.sin(10);

  const [circle, setCircle] = useState({
    x: dummyX,
    y: dummyY,
    angle: 10,
    diameter: 200,
    rad: 100
  });

  // const dia = 200;
  // const radius = dia / 2;

  // const x = radius * Math.cos(tickAngle.angle);
  // const y = radius * Math.sin(tickAngle.angle); 

  useEffect(() => {
    console.log('INSIDE effect');
    if(tickAngle.angle !== 360) {
      setTimeout(() => {
        
        console.log('INSIDE timeout');
        setCircle(prevState => {
          
          console.log('INSIDE state');
          let x, y, angle;
  
          x = prevState.rad * Math.cos(prevState.angle);
          y = prevState.rad * Math.sin(prevState.angle);
  
          angle = prevState.angle + 1; 
  
          return {
            ...prevState,
            x,
            y,
            angle
          }
  
        });
      }, 2000);
    }

  }, [circle.angle]);



  return (
    <div className="h-screen w-full flex items-center justify-center">
        <div className="h-[200px] w-[200px] flex items-center justify-center rounded-full border border-red-500 relative"
          style={{position: 'relative'}}
        >
            <div 
              className="transition-all"
                style={{
                    position: 'relative',
                    height: '10px',
                    width: '10px',
                    transform: `translate(${circle.x}px, ${circle.y}px)`,
                    borderRadius: '100%',
                    background: 'green'
                }}
            />
            {/* <div 
                style={{
                    position: 'relative',
                    height: '10px',
                    width: '10px',
                    transform: `translate(${xB}px, ${yB}px)`,
                    borderRadius: '100%',
                    background: 'red'
                }}
            /> */}
        </div>
    </div>
  )
}
