import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import NavbarUserOptions from './NavbarUserOptions';
import NavbarDropdown from './NavbarDropdown'
import ContactModal from './ContactModal';


const Navbar = () => {

    const [userOptions, setUserOptions] = useState(false)
    const [contactShowing, setContactShowing] = useState(false)

    const { user } = useUser()


    return (
        <div style={{ position: "fixed", zIndex: "10", opacity: "0.95", top: "0px", right: "0px" }}>
            <div style={{ borderRadius: "1px solid grey", display: "flex", justifyContent: "right" }}>

                <NavbarUserOptions
                    userOptions={userOptions}
                    setUserOptions={setUserOptions}
                />
            </div>

            {userOptions && (
                <NavbarDropdown
                    setUserOptions={setUserOptions}
                    setContactShowing={setContactShowing}
                />
            )}

            {contactShowing && (
                <ContactModal
                    setContactShowing={setContactShowing}
                    user={user}
                />
            )}

        </div>
    )

}

export default Navbar;