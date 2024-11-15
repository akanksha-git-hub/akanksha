'use client'
import { createContext, useContext, useState } from "react"

const INITIAL_VALUES = {
    activeTag: '',
    handleTag: () => {}
}

const TagContext = createContext(INITIAL_VALUES);


export function useTagContext() {

    const ctx = useContext(TagContext);

    if(!ctx) throw new Error('Can only be used under the <TagsContext>');

    return ctx;

}


export default function TagsContext({ children, className }) {

    const [activeTag, setActiveTag] = useState('recent');

    function handleTag(id) {
        setActiveTag(()=>  id);
    }

    const ctxValues = {
        activeTag,
        handleTag
    }

    return(
        <TagContext.Provider
            value={ctxValues}
        >
            <ul className={className}>
                {children}
            </ul>
        </TagContext.Provider>
    )

}