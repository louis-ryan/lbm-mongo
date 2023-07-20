import Head from 'next/head';
import Navbar from './Nav/Navbar';
import useWindowWidth from '../custom_hooks/useWindowWidth';

const Layout = ({ children }) => {

    const windowWidth = useWindowWidth()

    if (windowWidth > 1200) {
        return (
            <>
                <Navbar />
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <title>LBM</title>
                </Head>

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
    } else {
        return (
            <>

                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <title>LBM</title>
                </Head>

                <div style={{ width: "100vw", height: "calc(100vh - 78.5px)", backgroundColor: "pink", position: "fixed", top: "0px", overflow: "scroll", overscrollBehavior: "none" }}>
                    <div style={{ zIndex: "-1", position: "fixed" }}>
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w"
                            style={{ width: "100%", }}
                        />
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w"
                            style={{ width: "100%", }}
                        />
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/60149970-ce98-49e7-8b04-5739ee538798/LBM_hero_img.png?format=2500w"
                            style={{ width: "100%", }}
                        />
                    </div>
                    <div
                        id="content-card"
                        style={{ marginTop: "80px", backgroundColor: "rgb(241, 241, 241)", borderRadius: "16px 16px 0px 0px", boxShadow: "0px 0px 24px 0px black" }}
                    >
                        {children}
                    </div>
                </div>

                <Navbar />

            </>
        )
    }

}

export default Layout;