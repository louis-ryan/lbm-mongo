import { useState } from 'react';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';

import '../css/style.css';
import '../css/new.css';
import '../css/nav.css';
import '../css/buttons.css';
import '../css/inputs.css';
import '../css/effect.css';
import '../css/datepicker.css';
import '../css/filter.css';
import '../css/loaders.css';

function MyApp({ Component, pageProps }) {

    const [mobilePromoState, setMobilePromoState] = useState("NONE")

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>LBM</title>
            </Head>
            <UserProvider>
                <Layout>
                    <Component {...pageProps} setMobilePromoState={setMobilePromoState} />
                </Layout>
            </UserProvider>
        </>
    )

    /**
     * 
     * Bring this back once there are ads  vvvvvvvvvvv
     */

    return (
        <>
            <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: "-1" }} />


            <div style={{ display: mobilePromoState === "PROMO_INIT" || mobilePromoState === "PROMO" ? "" : "none" }}>
                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: "0px", left: "0px", zIndex: "600", backgroundColor: "black", overflow: "hidden" }}>

                    {/* <div style={{ position: "absolute", color: "blue", marginLeft: "720px", marginTop: "520px", fontSize: "16px", fontWeight: "800" }}>{"quick ad"}</div> */}

                    <a
                        href="https://www.redbubble.com/i/throw-pillow/Surreal-Suburban-Landscape-by-billbayer89/148450601.5X2YF"
                        target="_blank"
                        style={{ height: "100%" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/67ac49fa-ce0b-414a-9859-b96968745ff5/throw_pillow_promo.png?format=2500w"
                            style={{ height: "100%" }}
                        />
                    </a>
                </div>
                <div style={{ position: "fixed", zIndex: "601", bottom: "8px", height: "8px", width: mobilePromoState !== "PROMO" ? "0%" : "100%", backgroundColor: "#00F2C4", transition: "linear 10s", borderRadius: "8px", marginTop: "4px" }} />
            </div>


            <UserProvider>
                <Layout>
                    <Component {...pageProps} setMobilePromoState={setMobilePromoState} />
                </Layout>
            </UserProvider>
        </>
    )

}

export default MyApp