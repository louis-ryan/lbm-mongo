import Navbar from './Nav/Navbar';
import useWindowWidth from '../custom_hooks/useWindowWidth';


const Layout = ({ children }) => {

    const windowWidth = useWindowWidth()


    if (windowWidth > 800 || !windowWidth) {
        return (
            <>
                <Navbar nameChange={children.props.nameChange} setNameChange={children.props.setNameChange} />

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