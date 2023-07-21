import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import NavbarUserOptions from './NavbarUserOptions';
import NavbarDropdown from './NavbarDropdown'
import ContactModal from './ContactModal';
import useWindowWidth from '../../custom_hooks/useWindowWidth';


const Navbar = () => {

    const [userOptions, setUserOptions] = useState(false)
    const [contactShowing, setContactShowing] = useState(false)

    const router = useRouter()

    const { user } = useUser()

    const windowWidth = useWindowWidth()


    if (windowWidth > 1200) {
        return (
            <>

                <div
                    onClick={() => router.push('/')}
                    style={{ position: "fixed", top: "8px", left: "4px", zoom: "0.72", cursor: "pointer", marginTop: "8px" }}
                >
                    <img src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/5cf24fcb-d5dc-44b2-a321-b28ee3d3e00d/lbm_new_logo.png?format=500w" />
                </div>

                <div>
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

            </>
        )
    } else {

        return (
            <div style={{ width: "100vw", position: "fixed", bottom: "0px", left: "0px", backgroundColor: "white", zIndex: "400", display: "flex", justifyContent: "space-around", alignItems: "center", boxShadow: "0px 0px 40px 8px black", padding: "8px" }}>

                <div style={{ width: "calc(100% / 3)" }}>
                    <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                            if (user !== undefined) {
                                router.push('/')
                            } else {
                                router.push("/api/auth/login")
                            }

                        }}
                    >
                        <svg width="40px" height="40px" viewBox="0 0 2365 2365">
                            <g id="LBM_button_home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <circle id="Oval" stroke="#1F1F1F" stroke-width="80" cx="1182.5" cy="1182.5" r="1142.5"></circle>
                                <g id="Group-2" transform="translate(513.000000, 539.000000)">
                                    <path d="M118.676747,1463.19598 C138.063174,1206.61386 150.378351,1044.38933 155.62228,976.522402 C157.756178,948.905499 151.188848,917.809392 135.920292,883.234082 L173.34314,811.419708 L131.865323,724.373511 C166.49038,686.596267 184.728622,661.804083 186.58005,649.996959 C191.066773,621.383755 195.516281,598.395769 199.928574,581.033002 C238.644298,428.683146 688.559395,163.158834 532.002301,83.1744804 C375.445208,3.19012708 59.7060964,107.238122 20.9903716,259.587977 C-4.82011155,361.154548 27.7420136,762.357215 118.676747,1463.19598 Z" id="Oval-Copy" fill="#ABB5A4" transform="translate(288.695956, 759.352386) rotate(1.000000) translate(-288.695956, -759.352386) "></path>
                                    <path d="M1175.43237,1433.69039 C1122.42379,1096.55368 1089.98981,890.531036 1078.13045,815.622468 C1074.70645,793.995104 1089.58491,770.440666 1122.76581,744.959154 L1058.00322,689.786369 L1089.05599,635.891281 C1058.8152,615.130429 1042.92202,600.425076 1041.37646,591.775221 C1029.74651,526.687182 1020.49743,479.693707 1013.62922,450.794796 C977.252581,297.73518 674.201497,297.731259 778.556315,140.283222 C882.911134,-17.1648141 1222.27173,164.470696 1258.64837,317.530313 C1282.89947,419.570057 1255.1608,791.623418 1175.43237,1433.69039 Z" id="Oval-Copy-2" fill="#9DB28D" transform="translate(1011.968105, 756.678765) rotate(1.000000) translate(-1011.968105, -756.678765) "></path>
                                    <path d="M554.545314,1463.54789 C574.137352,1216.08529 587.374615,1045.54917 594.257103,951.939531 C595.061931,940.992952 582.820679,924.464449 557.533346,902.354022 L600.363353,867.635374 L555.661861,819.775552 L606.51552,779.334389 L553.677748,732.227477 C592.293071,712.273689 611.890817,697.665294 612.470987,688.402292 C618.619266,590.238756 621.693181,523.859646 621.692734,489.264962 C621.690924,349.245372 764.470132,134.338329 621.687445,80.1164449 C478.904758,25.8945604 332.142104,193.621003 332.142104,333.640593 C332.142104,426.986985 406.276507,803.622751 554.545314,1463.54789 Z" id="Oval" fill="#8E9986" transform="translate(508.644745, 766.609975) rotate(1.000000) translate(-508.644745, -766.609975) "></path>
                                    <g id="Group-4" transform="translate(625.000000, 0.000000)">
                                        <path d="M214.895148,510.661981 C320.605099,510.661981 525.318029,297.776535 525.318029,208.683361 C525.318029,119.590187 297.119967,0.327053602 191.410017,0.327053602 C85.7000669,0.327053602 0.00522049606,72.5513414 0.00522049606,161.644516 C0.00522049606,250.73769 109.185198,510.661981 214.895148,510.661981 Z" id="Oval" fill="#C6AF83"></path>
                                        <path d="M393.211346,379.222301 C465.887985,309.476717 490.808428,256.263542 490.808428,215.814219 C490.808428,175.364896 377.58221,245.774839 325.578701,286.224162 C273.575193,326.673485 207.062824,430.587351 207.062824,471.036674 C207.062824,511.485997 320.534707,448.967886 393.211346,379.222301 Z" id="Oval" fill="#6A6963"></path>
                                    </g>
                                    <g id="Group-3" transform="translate(49.000000, 0.000000)">
                                        <path d="M215.337579,510.661981 C321.047529,510.661981 525.76046,297.776535 525.76046,208.683361 C525.76046,119.590187 297.562398,0.327053602 191.852448,0.327053602 C86.1424977,0.327053602 0.447651272,72.5513414 0.447651272,161.644516 C0.447651272,250.73769 109.627629,510.661981 215.337579,510.661981 Z" id="Oval-Copy-3" fill="#B19A6C" transform="translate(263.104055, 255.494517) scale(-1, 1) translate(-263.104055, -255.494517) "></path>
                                        <path d="M212.153164,377.137982 C284.964275,308.032135 307.199656,254.430476 307.199656,214.352172 C307.199656,174.273868 174.512573,225.820225 122.412844,265.898529 C70.3131144,305.976833 27.2884517,435.803308 27.2884517,475.881612 C27.2884517,515.959916 139.342053,446.243829 212.153164,377.137982 Z" id="Oval-Copy-4" fill="#6A6963" transform="translate(167.244054, 343.747926) scale(-1, 1) translate(-167.244054, -343.747926) "></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div style={{ textAlign: "center" }}>home</div>
                </div>


                <div style={{ width: "calc(100% / 3)" }}>
                    <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                            if (user !== undefined) {
                                router.push('/new')
                            } else {
                                router.push("/api/auth/login")
                            }
                        }}
                    >
                        <svg width="40px" height="40px" viewBox="0 0 2365 2365">
                            <g id="LBM_button_new" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M1182.5,0 C1835.57672,0 2365,529.423283 2365,1182.5 C2365,1835.57672 1835.57672,2365 1182.5,2365 C529.423283,2365 0,1835.57672 0,1182.5 C0,529.423283 529.423283,0 1182.5,0 Z M1182,275 C1114.62126,275 1060,329.621261 1060,397 L1060,397 L1060,1061 L396,1061 C328.621261,1061 274,1115.62126 274,1183 C274,1250.37874 328.621261,1305 396,1305 L396,1305 L1060,1305 L1060,1969 C1060,2036.37874 1114.62126,2091 1182,2091 C1249.37874,2091 1304,2036.37874 1304,1969 L1304,1969 L1304,1305 L1968,1305 C2035.37874,1305 2090,1250.37874 2090,1183 C2090,1115.62126 2035.37874,1061 1968,1061 L1968,1061 L1304,1061 L1304,397 C1304,329.621261 1249.37874,275 1182,275 Z" id="Combined-Shape" fill="#1F1F1F"></path>
                            </g>
                        </svg>
                    </div>
                    <div style={{ textAlign: "center" }}>new</div>
                </div>


                <div style={{ width: "calc(100% / 3)" }}>
                    <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                            if (user !== undefined) {
                                router.push('/api/auth/logout')
                            } else {
                                router.push("/api/auth/login")
                            }
                        }}
                    >
                        {user !== undefined ? (
                            <svg width="40px" height="40px" viewBox="0 0 2365 2365">
                                <g id="LBM_button_signout" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <circle id="Oval" stroke="#1F1F1F" stroke-width="80" cx="1182.5" cy="1182.5" r="1142.5"></circle>
                                    <g id="Group" transform="translate(542.000000, 700.000000)" stroke="#C3C3C3" stroke-linecap="round" stroke-width="111">
                                        <polyline id="Line" points="885 0 0 0 0 905 885 905"></polyline>
                                        <line x1="442.5" y1="452.5" x2="1346.5" y2="453.5" id="Line-2"></line>
                                        <polyline id="Line-4" points="1164 181 1399 442.998326 1164 700"></polyline>
                                    </g>
                                    <g id="Group" transform="translate(502.000000, 730.000000)" stroke="#D97777" stroke-linecap="round" stroke-width="111">
                                        <polyline id="Line" points="885 0 0 0 0 905 885 905"></polyline>
                                        <line x1="442.5" y1="452.5" x2="1346.5" y2="453.5" id="Line-2"></line>
                                        <polyline id="Line-4" points="1164 181 1399 442.998326 1164 700"></polyline>
                                    </g>
                                </g>
                            </svg>
                        ) : (
                            <svg width="40px" height="40px" viewBox="0 0 2365 2365">
                                <g id="LBM_button_signin" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <circle id="Oval" stroke="#1F1F1F" stroke-width="80" cx="1182.5" cy="1182.5" r="1142.5"></circle>
                                    <g id="Group" transform="translate(1123.000000, 1167.500000) scale(-1, 1) translate(-1123.000000, -1167.500000) translate(520.000000, 715.000000)" stroke="#C3C3C3" stroke-linecap="round" stroke-width="111">
                                        <polyline id="Line" points="339 0 0 0 0 905 339 905"></polyline>
                                        <line x1="301.5" y1="452.5" x2="1205.5" y2="453.5" id="Line-2" transform="translate(753.500000, 453.000000) scale(-1, 1) translate(-753.500000, -453.000000) "></line>
                                        <polyline id="Line-4" transform="translate(400.500000, 440.500000) scale(-1, 1) translate(-400.500000, -440.500000) " points="283 181 518 442.998326 283 700"></polyline>
                                    </g>
                                    <g id="Group" transform="translate(1095.500000, 1197.500000) scale(-1, 1) translate(-1095.500000, -1197.500000) translate(480.000000, 745.000000)" stroke="#77A9D9" stroke-linecap="round" stroke-width="111">
                                        <polyline id="Line" points="339 3.69482223e-12 0 3.69482223e-12 0 905 339 905"></polyline>
                                        <line x1="326.5" y1="452.5" x2="1230.5" y2="453.5" id="Line-2" transform="translate(778.500000, 453.000000) scale(-1, 1) translate(-778.500000, -453.000000) "></line>
                                        <polyline id="Line-4" transform="translate(425.500000, 440.500000) scale(-1, 1) translate(-425.500000, -440.500000) " points="308 181 543 442.998326 308 700"></polyline>
                                    </g>
                                </g>
                            </svg>
                        )}

                    </div>
                    <div style={{ textAlign: "center" }}>
                        {user !== undefined ? (
                            "sign out"
                        ) : (
                            "sign in"
                        )}
                    </div>
                </div>

            </div>
        )
    }


}

export default Navbar;