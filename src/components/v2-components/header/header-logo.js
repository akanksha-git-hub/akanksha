import { useHeaderDropDownContext } from "./header"


export default function HeaderLogo({ children, className }) {

    const { setDropdownId } = useHeaderDropDownContext();

    return(
        <div 
            onClick={() => setDropdownId(null)}
            className={className}>
            { children }
        </div>
    )

}