import { useState, useEffect } from 'react';
import Navbar from './Nav/Navbar';
import useWindowWidth from '../custom_hooks/useWindowWidth';


const Layout = ({ children }) => {

    const [facebookBrowser, setFacebookBrowser] = useState(false)

    const windowWidth = useWindowWidth()

    const imgSrc = "https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w"

    function isFacebookBrowser() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        return /FBA[NV]/.test(userAgent);
    }

    useEffect(() => {
        if (!isFacebookBrowser()) return
        setFacebookBrowser(true)
    }, [])

    if (windowWidth > 800 || !windowWidth) {
        return (
            <>
                <Navbar setNameChange={children.props.setNameChange} />

                {children}

                <div style={{ position: "fixed", bottom: "0px", width: "100%", height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: "120px", textAlign: "center" }}>
                        LBM v1.2.0
                    </div>
                    <div style={{ width: "120px", textAlign: "center" }}>
                        2023
                    </div>
                </div>
            </>
        )
    }

    if (windowWidth <= 800) {
        return (
            <>
                {facebookBrowser && (
                    <div style={{ position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "80%", padding: "24px", backgroundColor: "white", boxShadow: "0px 0px 40px black", borderRadius: "8px" }}>
                            <h2>{"It looks like you are trying to access this platform using Facebook's mobile browser."}</h2>
                            <h6>{"Unfortunately Facebook will not allow you to authenticate yourself using Google."}</h6>
                            <h6>{"For best results, use Chrome or your preferred browser on Desktop or Mobile"}</h6>
                            <div style={{ height: "40px" }} />
                            <button
                                onClick={() => setFacebookBrowser(false)}
                                style={{ width: "100%", height: "40px", backgroundColor: "black", color: "white", border: "none" }}>
                                {"I understand"}
                            </button>
                        </div>
                    </div>
                )}

                <div id="mobile-container">
                    <div style={{ zIndex: "-1", position: "fixed" }}>
                        <img src={imgSrc} style={{ height: "100vh", filter: "blur(2px) brightness(0.6)" }} />
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