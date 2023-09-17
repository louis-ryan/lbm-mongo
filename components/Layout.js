
import Navbar from './Nav/Navbar';
import useWindowWidth from '../custom_hooks/useWindowWidth';

const Layout = ({ children }) => {

    const windowWidth = useWindowWidth()

    const imgSrc = "https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w"

    if (windowWidth > 1200 || !windowWidth) {
        return (
            <>
                <Navbar />

                {children}

                <div style={{ position: "fixed", bottom: "0px", width: "100%", height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: "120px", textAlign: "center" }}>
                        LBM v0.0.1
                    </div>
                    <div style={{ width: "120px", textAlign: "center" }}>
                        2023
                    </div>
                </div>
            </>
        )
    }

    if (windowWidth <= 1200) {
        return (
            <>
                <div id="mobile-container">
                    <div style={{ zIndex: "-1", position: "fixed" }}>
                        <img src={imgSrc} style={{ width: "100%" }} />
                        <img src={imgSrc} style={{ width: "100%" }} />
                        <img src={imgSrc} style={{ width: "100%" }} />
                    </div>
                    <div id="mobile-content-card">
                        {children}
                    </div>
                </div>

                <Navbar />
            </>
        )
    }

}

export default Layout;