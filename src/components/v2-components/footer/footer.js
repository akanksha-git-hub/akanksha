import FooterContainer from "./footer-container";
import FooterHeader from "./footer-header";
import FooterInfo from "./footer-info";
import FooterNavigation from "./footer-navigation";


export default function Footer({ children, className }) {

    return(
        <footer className={`${className}`}>
            { children }
        </footer>
    )

}

Footer.Container = FooterContainer;
Footer.Header = FooterHeader;
Footer.Navigation = FooterNavigation;
Footer.Info = FooterInfo;