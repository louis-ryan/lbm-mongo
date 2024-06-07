import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';


const NavbarUserOptions = ({ setUserOptions, myApplications }) => {

    const [optionHover, setOptionHover] = useState(null)

    const { user } = useUser()

    const router = useRouter()


    if (user !== undefined) {
        return (
            <div className='navbar-container'>

                <div
                    onMouseEnter={() => setOptionHover("ACCOUNT")}
                    onMouseLeave={() => setOptionHover(null)}
                    onClick={() => setUserOptions(true)}
                >
                    <div style={{ height: "40px", cursor: "pointer" }}>
                        <img
                            width="40px"
                            src={user.picture}
                            referrerPolicy="no-referrer"
                            alt="profile picture"
                            style={{
                                borderRadius: "50%",
                                outline: optionHover === "ACCOUNT" && "2px solid rgba(173, 55, 112, 0.378)"
                            }}
                        />
                    </div>

                    {myApplications.totalNewApplications > 0 && (
                        <div style={{ fontSize: "12px", color: "black", textDecoration: "none", backgroundColor: "pink", padding: "4px", textAlign: "center", width: "48px", fontWeight: "bold", borderRadius: "4px", position: "absolute", transform: "translateX(-44px) translateY(-14px)" }}>
                            {myApplications.totalNewApplications + "new!"}
                        </div>
                    )}
                </div>

                <div style={{ width: "4px" }} />

                <div
                    onMouseEnter={() => setOptionHover("NEW")}
                    onMouseLeave={() => setOptionHover(null)}
                    onClick={() => router.push("/new")}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" style={{ cursor: "pointer" }}>
                        <g id="New" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <circle
                                id="Oval"
                                fill={(optionHover === "NEW" || router.asPath === "/new") ? "rgba(173, 55, 112, 0.378)" : "black"}
                                cx="20"
                                cy="20"
                                r="20"
                            >
                            </circle>
                            <path d="M20,7.56521739 L20,32.4347826 M7,19.9999824 L33,20.0000176" id="Combined-Shape" stroke="#FFFFFF" strokeLinecap="round"></path>
                        </g>
                    </svg>
                </div>
            </div>
        )
    } else {
        return (
            <div className='navbar-container'>

                <div
                    onClick={() => router.push("/api/auth/login")}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
                        <g id="Account" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Group"> <circle id="Oval" fill="#000000" cx="20" cy="20" r="20"></circle> <path d="M27.9330882,24.7713876 C28.8375663,26.1408975 29.3967846,27.7584327 29.4870708,29.5 L10.5129292,29.5 C10.6032182,27.7583879 11.1624682,26.1408159 12.0670443,24.7713058 C13.0886661,23.2245909 14.5503878,21.9940627 16.2739355,21.2584141 C16.5988891,21.1197167 16.9301066,20.9999093 17.2654079,20.8989454 C16.9503588,20.7522181 16.6468514,20.5803175 16.3581843,20.3846624 C14.6333402,19.2155839 13.5,17.2401915 13.5,15 C13.5,13.2050746 14.2275373,11.5800746 15.4038059,10.4038059 C16.5800746,9.22753728 18.2050746,8.5 20,8.5 C21.7949254,8.5 23.4199254,9.22753728 24.5961941,10.4038059 C25.7724627,11.5800746 26.5,13.2050746 26.5,15 C26.5,17.2401872 25.3666741,19.2155852 23.6423169,20.3844775 C23.353626,20.5801728 23.0500713,20.7521083 22.7353303,20.8989212 C23.0708709,20.9997944 23.4018379,21.1195635 23.726543,21.2581935 C25.4498887,21.9939607 26.9115206,23.2245874 27.9330882,24.7713876 Z" id="Combined-Shape" stroke="#FFFFFF"></path> <rect id="Rectangle" fill="#000000" x="8" y="29" width="24" height="2"></rect></g></g>
                    </svg>
                </div>

                <div style={{ width: "4px" }} />

                <div
                    onClick={() => {
                        localStorage.setItem("redirect_to", `/new`)
                        router.push("/api/auth/login")
                    }}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
                        <g id="New" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle> <path d="M20,7.56521739 L20,32.4347826 M7,19.9999824 L33,20.0000176" id="Combined-Shape" stroke="#FFFFFF" strokeLinecap="round"></path></g>
                    </svg>
                </div>
            </div>
        )
    }


}

export default NavbarUserOptions;