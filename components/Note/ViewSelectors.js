import Link from 'next/link';
import { useRouter } from 'next/router';

const ViewSelector = ({ view, thisIsMyNote, commenterId, weAreLive, screenSize }) => {

    const router = useRouter();

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", border: "4px solid pink", borderRadius: "8px", padding: "16px 0px" }}>

                <Link href={`${router.query.id}`}>
                    <div className="view-selector-option">
                        <svg width="60px" height="60px" viewBox="0 0 40 40" style={{ filter: view === "Details" && "brightness(0)" }}>
                            <g id="Details" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <circle id="Oval" stroke="#979797" cx="6" cy="9" r="2.5"></circle>
                                <circle id="Oval-Copy" stroke="#979797" cx="6" cy="20" r="2.5"></circle>
                                <circle id="Oval-Copy-2" stroke="#979797" cx="6" cy="31" r="2.5"></circle>
                                <rect id="Rectangle" stroke="#979797" x="13.5" y="7.5" width="22" height="3" rx="1.5"></rect>
                                <rect id="Rectangle-Copy" stroke="#979797" x="13.5" y="18.5" width="22" height="3" rx="1.5"></rect>
                                <rect id="Rectangle-Copy-2" stroke="#979797" x="13.5" y="29.5" width="22" height="3" rx="1.5"></rect>
                            </g>
                        </svg>
                    </div>
                </Link>

                {/* <Link href={thisIsMyNote ? `${router.query.id}#Inbox` : `${router.query.id}#Conversation=${commenterId}`}>
                    <div>
                        <svg className="view-selector-option" width="60px" height="60px" viewBox="0 0 40 40" style={{ filter: view === `Conversation=${commenterId}` || view === "Inbox" ? "brightness(0)" : "brightness(1)" }}>
                            <g id="Comments" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path d="M17.7857143,20.9187798 L12.4695028,16.4 L4,16.4 C3.58578644,16.4 3.21078644,16.2321068 2.93933983,15.9606602 C2.66789322,15.6892136 2.5,15.3142136 2.5,14.9 L2.5,7 C2.5,6.58578644 2.66789322,6.21078644 2.93933983,5.93933983 C3.21078644,5.66789322 3.58578644,5.5 4,5.5 L18,5.5 C18.4142136,5.5 18.7892136,5.66789322 19.0606602,5.93933983 C19.3321068,6.21078644 19.5,6.58578644 19.5,7 L19.5,15.1857143 C19.5,15.52103 19.3640864,15.8246015 19.1443439,16.0443439 C18.8189255,16.3697624 18.3096628,16.5113365 17.7857143,16.2999079 L17.7857143,20.9187798 Z" id="Rectangle" stroke="#979797"></path>
                                <path d="M35.7857143,33.9187798 L30.4695028,29.4 L22,29.4 C21.5857864,29.4 21.2107864,29.2321068 20.9393398,28.9606602 C20.6678932,28.6892136 20.5,28.3142136 20.5,27.9 L20.5,20 C20.5,19.5857864 20.6678932,19.2107864 20.9393398,18.9393398 C21.2107864,18.6678932 21.5857864,18.5 22,18.5 L36,18.5 C36.4142136,18.5 36.7892136,18.6678932 37.0606602,18.9393398 C37.3321068,19.2107864 37.5,19.5857864 37.5,20 L37.5,28.1857143 C37.5,28.52103 37.3640864,28.8246015 37.1443439,29.0443439 C36.8189255,29.3697624 36.3096628,29.5113365 35.7857143,29.2999079 L35.7857143,33.9187798 Z" id="Rectangle-Copy" stroke="#979797" transform="translate(29.000000, 26.500000) scale(-1, 1) translate(-29.000000, -26.500000) "></path>
                            </g>
                        </svg>
                        {weAreLive && (<div style={{ position: "absolue", backgroundColor: "red", color: "white", textAlign: "center", transform: "translate(40px, -60px)" }}>Live</div>)}
                    </div>
                </Link> */}
            </div>

            {screenSize === "DESKTOP" &&
                <div
                    style={{
                        height: "16px",
                        width: "120px",
                        position: "absolute",
                        zIndex: "3",
                        transform: `
                                translateY(-20px)
                                translateX(
                                    ${view === "Details" ? "100px" : view === "Photos" ? "404px" : "712px"}
                                )
                            `,
                        transition: "500ms"
                    }}
                >
                    <svg width="120px" height="16px" viewBox="0 0 120 16">
                        <g id="View-Selector" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <rect id="Rectangle" x="1" y="4" width="120" height="16"></rect>
                            <path d="M32.9857728,0 L85.0224811,0 C93.1118656,-1.25024236e-06 100.775053,3.6270519 105.903388,9.88311403 C105.935275,9.92201256 105.967479,9.96097455 106,10 C109.333333,14 114,16 120,16 L0,16 C5.10820997,15.3049029 9.10820997,13.3049029 12,10 C12.0865064,9.90113553 12.1710216,9.80224563 12.2535456,9.70333028 C17.3834376,3.55451254 24.9780421,1.47099627e-15 32.9857728,0 Z" id="Rectangle" fill="pink"></path>
                        </g>
                    </svg>
                </div>
            }
        </>
    )
}

export default ViewSelector;