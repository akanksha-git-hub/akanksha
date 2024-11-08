'use client'
import { createContext, useContext } from "react";
import ClientSliceZoneWrapper from "./ClientSliceZoneWrapper";

const SliceContext = createContext();

export function useSliceContext() {

    const ctx = useContext(SliceContext);

    if(!ctx) throw new Error('Can only be used under <ClientSliceZoneContext');

    return ctx;

}

export default function ClientSliceZoneContext({ children, slices, className }) {

    const ctxValues = {
        slices
    }

    return(
        <SliceContext.Provider value={ctxValues}>
            <ClientSliceZoneContext.Wrapper className={className}>
                {children}
            </ClientSliceZoneContext.Wrapper>
        </SliceContext.Provider>
    )

}


ClientSliceZoneContext.Wrapper = ClientSliceZoneWrapper;