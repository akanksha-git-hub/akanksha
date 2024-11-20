'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FilterSelector({ handleChange, data }) {

  const [selectedData, setSelectedData] = useState({ month: 'Month', year: 'Year' });
  const { months, years } = data;

  const monthCheckBox = useRef(null);
  const yearCheckBox = useRef(null);

  function handleClick(name, value) {
    handleChange(name, value)
    if(name === 'month') {
      setSelectedData(prevState => ({ ...prevState, month: value }));
      monthCheckBox.current.click();
    }
    if(name === 'year') {
      yearCheckBox.current.click();
      setSelectedData(prevState => ({ ...prevState, year: value }));
    }
  }

  // function handleClickOutside(e) {
  //   if((monthCheckBox.current && !monthCheckBox.current.contains(e.target)) || (yearCheckBox.current && yearCheckBox.current.contains(e.target))) {
  //     if(monthCheckBox.current.checked) monthCheckBox.current.click();
  //     if(yearCheckBox.current.checked) yearCheckBox.current.click();
  //   }
  // }

  // useEffect(() => {

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  // }, []);

  return (
    <div data-lenis-prevent className="flex gap-12">
      <div className="group relative">
        <div 
          className="flex items-center gap-2 py-1 px-2 border border-deep-green rounded-full cursor-pointer transition-all group-hover:opacity-60"
        >
          <p className="select-none">{selectedData.month}</p>
          <Image 
            className="relative top-[2px]"
            src='/drop-down-arrow.svg'
            height={14}
            width={14}
            alt="drop-down-arrow"
          />
        </div>
        <input
          ref={monthCheckBox} 
          type="checkbox" 
          className="peer/dropdown absolute top-0 left-0 h-full w-full cursor-pointer opacity-0" 
        />
        <ul 
          className="absolute space-y-2 py-2 px-2 z-50 bg-off-white border border-deep-green rounded
          top-[110%] left-2/4 -translate-x-2/4 peer peer-checked/dropdown:block hidden h-[400px] overflow-y-scroll green-scroll-bar"
        >
          {months.map(item => (
            <li 
              key={item} 
              onClick={() => handleClick('month', item)}
              className="mx-1 rounded px-3 py-1 cursor-pointer flex items-center justify-start transition-all hover:bg-deep-green hover:text-off-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="group relative">
        <div 
          className="flex items-center gap-2 py-1 px-2 border border-deep-green rounded-full cursor-pointer transition-all group-hover:opacity-60"
        >
          <p className="select-none">{selectedData.year}</p>
          <Image 
            className="relative top-[2px]"
            src='/drop-down-arrow.svg'
            height={14}
            width={14}
            alt="drop-down-arrow"
          />
        </div>
        <input     
          ref={yearCheckBox}     
          type="checkbox" 
          className="peer/dropdown absolute top-0 left-0 h-full w-full cursor-pointer opacity-0" 
        />
        <ul 
          className="absolute space-y-2 py-2 px-2 z-50 bg-off-white border border-deep-green rounded
          top-[110%] left-2/4 -translate-x-2/4 peer peer-checked/dropdown:block hidden h-[400px] overflow-y-scroll green-scroll-bar"
        >
          {years.map(item => (
            <li 
              key={item} 
              onClick={() => handleClick('year', item)}
              className="mx-1 rounded px-3 py-1 cursor-pointer flex items-center justify-start transition-all hover:bg-deep-green hover:text-off-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
