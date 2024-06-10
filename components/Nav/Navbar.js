import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Hamburger from 'hamburger-react'
import logo from '../../public/LBM_rounded.svg'
import NavbarUserOptions from './NavbarUserOptions';
import NavbarDropdown from './NavbarDropdown'
import ContactModal from './ContactModal';
import DocumentsModal from './DocumentsModal';
import useWindowWidth from '../../custom_hooks/useWindowWidth';
import homeButton from '../../public/icons/LBM_button_home.svg';
import newButton from '../../public/icons/LBM_button_new.svg';
import signInButton from '../../public/icons/LBM_button_signin.svg';
import signOutButton from '../../public/icons/LBM_button_signout.svg';


const Navbar = (props) => {

    const [userOptions, setUserOptions] = useState(false)
    const [myListings, setMyListings] = useState([])
    const [myApplications, setMyApplications] = useState([])

    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    const router = useRouter()
    const { user } = useUser()
    const windowWidth = useWindowWidth()


    const listingApplicationObj = myApplications.listingArr && myApplications.listingArr.reduce((acc, item) => {
        acc[item.noteId] = {
            totalApplications: item.totalApplications,
            totalNewApplications: item.totalNewApplications
        };
        return acc;
    }, {});


    const handleCheckStatus = async () => {
        const response = await fetch(`/api/tier/${user.email}`);
        const data = await response.json();
        props.setPaymentStatus(data.status);
    };


    const getApplicationSummary = async () => {
        if (!user) return
        try {
            const res = await fetch(`api/applications/toMe/${user.sub}/summary`);
            const { data } = await res.json();

            setMyApplications(data)

        } catch (error) {
            console.log("get application summary error: ", error)
        }
    }


    const getMyNotes = async () => {
        try {
            const res = await fetch(`api/notes/mine/${user.sub}`);
            const { data } = await res.json();
            setMyListings(data)
        } catch (error) {
            console.log("get notes from navbar error: ", error)
        }
    }


    useEffect(() => {
        if (!user) return
        getMyNotes()
        getApplicationSummary()
        handleCheckStatus()
    }, [user])



    if (windowWidth > 800 || !windowWidth) {
        return (
            <>
                <div
                    onClick={() => router.push('/')}
                    style={{ position: "fixed", zIndex: "30", top: "4px", left: "4px", cursor: "pointer", marginTop: "8px" }}
                >
                    <img src={logo} alt="logo" style={{ height: "60px" }} />
                </div>

                <div>
                    <NavbarUserOptions
                        setUserOptions={setUserOptions}
                        myApplications={myApplications}
                    />
                </div>

                {userOptions && (
                    <NavbarDropdown
                        setUserOptions={setUserOptions}
                        setContactsShowing={props.setContactsShowing}
                        setDocumentsShowing={props.setDocumentsShowing}
                        myListings={myListings}
                        listingApplicationObj={listingApplicationObj}
                        deviceSize={"DESKTOP"}
                    />
                )}

                {props.contactsShowing && (
                    <ContactModal
                        setContactShowing={props.setContactsShowing}
                        user={user}
                        setNameChange={props.setNameChange}
                        deviceSize={"DESKTOP"}
                    />
                )}

                {props.documentsShowing && (
                    <DocumentsModal
                        setDocumentsShowing={props.setDocumentsShowing}
                        user={user}
                        deviceSize={"DESKTOP"}
                    />
                )}
            </>
        )
    }

    if (windowWidth <= 800) {

        return (
            <>
                <div style={{ position: "fixed", zIndex: "20", top: "0px", right: "0px", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Hamburger toggled={mobileNavOpen} toggle={setMobileNavOpen} />
                </div>

                {mobileNavOpen && (
                    <div style={{ position: "fixed", zIndex: "10", top: "0px", left: "0px", width: "100vw", height: "100vh", backgroundColor: "white" }}>
                        <NavbarDropdown
                            setUserOptions={setUserOptions}
                            setContactsShowing={props.setContactsShowing}
                            setDocumentsShowing={props.setDocumentsShowing}
                            myListings={myListings}
                            listingApplicationObj={listingApplicationObj}
                            deviceSize={"MOBILE"}
                        />
                    </div>
                )}

                {props.contactsShowing && (
                    <ContactModal
                        setContactShowing={props.setContactsShowing}
                        user={user}
                        setNameChange={props.setNameChange}
                        deviceSize={"MOBILE"}
                    />
                )}

                {props.documentsShowing && (
                    <DocumentsModal
                        setDocumentsShowing={props.setDocumentsShowing}
                        user={user}
                        deviceSize={"MOBILE"}
                    />
                )}
            </>

            // <div style={{ width: "100vw", position: "fixed", bottom: "0px", left: "0px", backgroundColor: "white", zIndex: "400", display: "flex", justifyContent: "space-around", alignItems: "center", boxShadow: "0px 0px 40px 8px black", padding: "8px" }}>

            //     <div style={{ width: "calc(100% / 3)" }}>
            //         <div
            //             style={{ textAlign: "center" }}
            //             onClick={() => { if (user !== undefined) { router.push('/') } else { router.push("/api/auth/login") } }}
            //         >
            //             <img className="mobile-nav-button" src={homeButton} alt="home button" style={{ height: "40px", border: router.asPath === '/' && "4px solid pink" }} />
            //         </div>
            //         <div style={{ textAlign: "center" }}>home</div>
            //     </div>


            //     <div style={{ width: "calc(100% / 3)" }}>
            //         <div
            //             style={{ textAlign: "center" }}
            //             onClick={() => { if (user !== undefined) { router.push('/new') } else { router.push("/api/auth/login") } }}
            //         >
            //             <img className="mobile-nav-button" src={newButton} alt="new button" style={{ height: "40px", border: router.asPath === '/new' && "4px solid pink" }} />
            //         </div>
            //         <div style={{ textAlign: "center" }}>new</div>
            //     </div>


            //     <div style={{ width: "calc(100% / 3)" }}>
            //         <div
            //             style={{ textAlign: "center" }}
            //             onClick={() => { if (user !== undefined) { router.push('/api/auth/logout') } else { router.push("/api/auth/login") } }}
            //         >
            //             {user !== undefined ? (
            //                 <img className="mobile-nav-button" src={signOutButton} alt="sign out button" style={{ height: "40px" }} />
            //             ) : (
            //                 <img className="mobile-nav-button" src={signInButton} alt="sign in button" style={{ height: "40px" }} />
            //             )}
            //         </div>
            //         <div style={{ textAlign: "center" }}>
            //             {user !== undefined ? ("sign out") : ("sign in")}
            //         </div>
            //     </div>

            // </div>
        )
    }


}

export default Navbar;