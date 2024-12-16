"use client"
import { createContext, useContext, useState } from "react";
import HeaderCTA from "./header-cta";
import HeaderLogo from "./header-logo"
import HeaderNavList from "./header-nav-list";
import HeaderContainer from "./header-container";

const INITIAL_CONTEXT = {
    dropDownState: {
        id: null,
        isActive: false
    },
    setDropdownId: (id) => {}
}

const HeaderContext = createContext(INITIAL_CONTEXT);

export const useHeaderDropDownContext = () => {
    const ctx = useContext(HeaderContext);

    if(!ctx) throw new Error('Must be used under <Header> component');

    return ctx;

}

export default function Header({ children, className }) {

    const [dropDownState, setDropDownState] = useState({ id: null, isActive: false });

    function setDropdownId(id) {

        setDropDownState(prevState => {

            if(id !== prevState.id) {
                return {
                    isActive: true,
                    id
                }
            }

            if(id === prevState.id) {
                return {
                    id: prevState.id,
                    isActive: !prevState.isActive
                }
            }

        })

    }

    const ctxValues = {
        dropDownState,
        setDropdownId
    }

    return(
        <HeaderContext.Provider value={ctxValues}>
            <header className={className}>
                {children}
            </header>
        </HeaderContext.Provider>
    )

}

Header.Container = HeaderContainer;
Header.Logo = HeaderLogo;
Header.NavList = HeaderNavList;
Header.CTA = HeaderCTA;

// https://www.mindpalace.ai/
// https://peekinsights.co/
// https://www.supclub.xyz/