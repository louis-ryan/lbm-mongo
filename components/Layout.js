import Navbar from './Nav/Navbar';
import useWindowWidth from '../custom_hooks/useWindowWidth';


const Layout = ({ children }) => {

    const windowWidth = useWindowWidth()


    if (windowWidth > 800 || !windowWidth) {
        return (
            <>
                <Navbar
                    nameChange={children.props.nameChange}
                    setNameChange={children.props.setNameChange}
                    paymentStatus={children.props.paymentStatus}
                    setPaymentStatus={children.props.setPaymentStatus}
                    contactsShowing={children.props.contactsShowing}
                    setContactsShowing={children.props.setContactsShowing}
                    documentsShowing={children.props.documentsShowing}
                    setDocumentsShowing={children.props.setDocumentsShowing}
                    accountShowing={children.props.accountShowing}
                    setAccountShowing={children.props.setAccountShowing}
                />

                {children}

                <div style={{ position: "fixed", bottom: "0px", width: "100%", height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: "120px", textAlign: "center" }}>
                        LBM v2.0.1
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