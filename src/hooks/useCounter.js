import { useState } from "react";
export const useCounter = (defaultValue) => {

    const [counter, setCounter] = useState(defaultValue)

    function incrementCounter() {
        setCounter(prevState => prevState + 1)
    }

    function decrementCounter() {
        setCounter(prevState => prevState - 1)
    }

    return {
        countValue: counter,
        incrementCounter,
        decrementCounter
    }

}