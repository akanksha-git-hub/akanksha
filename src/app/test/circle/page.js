'use client'

import useDebouncedResize from "@/hooks/useDebouncedResize";
import { useEffect, useState } from "react";

export default function Page() {

  // const [tickAngle, setTickAngle] = useState({ angle: 0, moved: false });

  // const dummyX = 100 * Math.cos(10);
  // const dummyY = 100 * Math.sin(10);

  // const [circle, setCircle] = useState({
  //   x: dummyX,
  //   y: dummyY,
  //   angle: 10,
  //   diameter: 200,
  //   rad: 100
  // });


  // useEffect(() => {
  //   console.log('INSIDE effect');
  //   if(circle.angle <= 360) {
  //     setTimeout(() => {
        
  //       console.log('INSIDE timeout');
  //       setCircle(prevState => {
          
  //         console.log('INSIDE state');
  //         let x, y, angle;
  
  //         x = prevState.rad * Math.cos(prevState.angle);
  //         y = prevState.rad * Math.sin(prevState.angle);
  
  //         angle = prevState.angle + 0.1; 
  
  //         return {
  //           ...prevState,
  //           x,
  //           y,
  //           angle
  //         }
  
  //       });
  //     }, 200);
  //   }

  // }, [circle.angle]);

  const [test, setTest] = useState({ dia: 300, rotate: 360 });

  const { width } = useDebouncedResize();

  let keyItems = 20;

  let dummyData = [];

  for(let j=0; j <= keyItems; j++) {
    dummyData.push(j);
  }

  // let dia = 50;
  const n = dummyData.length;

  // if(width < 1000) dia = 0;
  
  useEffect(() => {

    if(test.dia === 300) {
      setTimeout(() => {
        setTest(prevState => ({ ...prevState, rotate: 0, dia: 100 }));
      }, 2200)
    } else {
      setTimeout(() => {
        setTest(prevState => ({ ...prevState, rotate: 360, dia: 300 }));
      }, 2200);
    }

  }, [test.dia]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
        <div className="border border-red-500 rounded-full h-[300px] w-[300px]"
          style={{
            position: 'relative', 
            transformOrigin: 'center', 
            transition: 'all 2s ease', 
            transform: `rotate(${test.rotate}deg)`
          }}
        >
          <div 
            className="absolute border border-red-500 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full"
          />
          <div 
            className="absolute border border-red-500 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-full"
          />
          <div 
            className="absolute border border-red-500 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-full rotate-45"
          />
          <div 
            className="absolute border border-red-500 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-full -rotate-45"
          />
            {dummyData.map((item, index) => {

              const sectorAngle = 360 / n;

              const radians = sectorAngle * (Math.PI/180);

              let secAngle = radians;
              let arrowAngle = sectorAngle;

              let i = index + 1;
              for(i; i <= n; i++) {
                secAngle = secAngle + radians;
                arrowAngle = arrowAngle + sectorAngle;
              }

              /* 
                height = 200px
                actual height to calc rad = 200/10;
              */

              const diaCalc = test.dia/10;

              const radius = (diaCalc * 50);

              const x = (Math.cos(secAngle) * (radius)) - 50;
              const y = (Math.sin(secAngle) * (radius)) - 50;

              const red = Math.floor(Math.random() * 100);
              const blue = Math.floor(Math.random() * 50);
              const green = Math.floor(Math.random() * 160);


              return(
                <li 
                  className="list-none"
                  key={index}
                  style={{
                      position: 'absolute', 
                      height: '10px', 
                      width: '10px', 
                      top: '50%',
                      left: '50%',
                      bottom: '50%',
                      right: '50%',
                      transformOrigin: 'center',
                      transform: `translate(${x}%, ${y}%)`,
                      background: `rgb(${red}, ${blue}, ${green})`, 
                      borderRadius: '100%',
                      transition: 'all 1s ease',
                  }}
                >
                  {/* <div className="h-full w-full border border-red-500 relative">
                    <div 
                      className={`
                        h-[50px] w-[10px] bg-deep-green absolute bottom-full left-2/4 -translate-x-2/4 origin-center
                        `}
                    />
                  </div> */}
                </li>
              )

            })}
        </div>
    </div>
  )
}
