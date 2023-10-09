import { useState, useEffect } from 'react';
import Navbar from './Nav/Navbar';
import useWindowWidth from '../custom_hooks/useWindowWidth';
import magpie from '../public/Magpie.svg';
import logo from '../public/LBM_logo.svg';
import { useRouter } from 'next/router';


const Layout = ({ children }) => {

    const windowWidth = useWindowWidth()
    const router = useRouter()


    if (windowWidth > 800 || !windowWidth) {
        return (
            <>
                <Navbar setNameChange={children.props.setNameChange} />

                {router.asPath !== "/help" && router.asPath !== "/new" && router.asPath.length < 15 && windowWidth > 1200 && (
                    <>
                        <div
                            className='help-widget'
                            onClick={() => router.push("/help")}
                            style={{ position: "fixed", zIndex: "20", padding: "24px", top: "100px", left: "8px", width: "160px", height: "200px", borderRadius: "4px", fontWeight: "800", overflow: "hidden", border: "1px solid black" }}
                        >
                            <img src="https://media.koelnmesse.io/artcologne/redaktionell/art-cologne/img/magazin/2022/article-6-aboriginal-art/johnny_warangkula_tjupurrula_water_and_tucker_(1972)_1200x675_m24_full_m36_1025.jpg" alt="art background" style={{ position: "absolute", zIndex: "-1", transform: "translateX(-120px) translateY(-240px)", filter: "blur(2px)", opacity: "0.4" }} />

                            <div style={{ height: "28px" }} />
                            <div>We are creating THE definitive guide to breaking lease</div>
                            <div style={{ textDecoration: "underline" }}>HERE!</div>
                        </div>
                        <img src={logo} alt="logo" style={{ position: "fixed", zIndex: "21", transform: "translateX(0px) translateY(80px)" }} />
                        <img src={magpie} alt="magpie" style={{ position: "fixed", zIndex: "21", height: "120px", transform: "translateX(100px) translateY(240px)" }} />
                    </>
                )}

                {children}

                <div style={{ position: "fixed", bottom: "0px", width: "100%", height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: "120px", textAlign: "center" }}>
                        LBM v1.2.2
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
                <div id="mobile-content-card">
                    {children}
                </div>
                <Navbar />
            </>
        )
    }

}

export default Layout;