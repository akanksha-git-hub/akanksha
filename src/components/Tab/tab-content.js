import { memo } from "react";

const TabContent = memo(function TabContent({ children }) {
    console.log('B')
    return <>{children}</>
});


export default TabContent;