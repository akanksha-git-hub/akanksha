import { memo } from "react";

const TabContent = memo(function TabContent({ children, className }) {
    return <ul className={className}>{children}</ul>
});


export default TabContent;