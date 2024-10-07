'use client'

import { useState, useEffect } from "react";
import debounce from "lodash.debounce";


const useDebouncedResize = () => {

    const [size, setSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {

        if(typeof window !== "undefined") {
            const handleResize = debounce(() => {
                setSize({ width: window.innerWidth, height: window.innerHeight });
            }, 300);
    
            window.addEventListener('resize', handleResize);
            handleResize();
    
            return () => window.removeEventListener('resize', handleResize);        
        }

    }, []);


    return size;

}

export default useDebouncedResize;
