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
import '../css/modals.css';

function MyApp({ Component, pageProps }) {

    const [nameChange, setNameChange] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('');
    const [contactsShowing, setContactsShowing] = useState(false)
    const [documentsShowing, setDocumentsShowing] = useState(false)
    const [accountShowing, setAccountShowing] = useState(false)


    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>LBM</title>
            </Head>
            <UserProvider>
                <Layout
                    nameChange={nameChange}
                    setNameChange={setNameChange}
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                    contactsShowing={contactsShowing}
                    setContactsShowing={setContactsShowing}
                    documentsShowing={documentsShowing}
                    setDocumentsShowing={setDocumentsShowing}
                    accountShowing={accountShowing}
                    setAccountShowing={setAccountShowing}
                >
                    <Component
                        {...pageProps}
                        nameChange={nameChange}
                        setNameChange={setNameChange}
                        paymentStatus={paymentStatus}
                        setPaymentStatus={setPaymentStatus}
                        contactsShowing={contactsShowing}
                        setContactsShowing={setContactsShowing}
                        documentsShowing={documentsShowing}
                        setDocumentsShowing={setDocumentsShowing}
                        accountShowing={accountShowing}
                        setAccountShowing={setAccountShowing}
                    />
                </Layout>
            </UserProvider>
        </>
    )

}

export default MyApp