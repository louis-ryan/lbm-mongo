import Head from 'next/head';
import Navbar from './Nav/Navbar';

const Layout = ({ children }) => {

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
}

export default Layout;