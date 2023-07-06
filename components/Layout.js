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
        </>
    )
}

export default Layout;