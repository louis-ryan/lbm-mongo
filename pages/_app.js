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

    return (
        <>
            <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: "-1" }} />

            <UserProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserProvider>
        </>
    )
}

export default MyApp