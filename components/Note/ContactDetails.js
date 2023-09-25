import { useState } from "react";

const Action = ({ contactDetails, address }) => {


    const [copiedMessage, setCopiedMessage] = useState(false)


    function copyTextToClipboard(text) {
        const textarea = document.createElement('textarea')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        textarea.value = text
        document.body.appendChild(textarea)

        textarea.select()

        let success;
        try {
            success = document.execCommand('copy');
        } catch (err) {
            success = false;
            console.error('Failed to copy text to clipboard:', err);
        }

        document.body.removeChild(textarea);
        setCopiedMessage(true)
        setTimeout(() => { setCopiedMessage(false) }, 2000)
        return success;
    }


    return (

        <>
            <div style={{ fontWeight: "400" }}>{contactDetails.name}'s Contact Details</div>

            <div style={{ height: "40px" }} />

            {contactDetails.email && (
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div>Email:</div>
                    <div style={{ display: "flex" }}>
                        <div>{contactDetails.email}</div>
                        <div style={{ width: "8px" }} />
                        <a style={{ cursor: "pointer" }} onClick={() => copyTextToClipboard(contactDetails.email)}>
                            <svg width="40px" height="40px" viewBox="0 0 40 40">
                                <g id="Copy" stroke="none" stroke-width="3" fill="none" fill-rule="evenodd">
                                    <path d="M36.5,5.5 L36.5,25.5 C36.5,25.9142136 36.3321068,26.2892136 36.0606602,26.5606602 C35.7892136,26.8321068 35.4142136,27 35,27 L29.5,27 L29.5,13.5 C29.5,12.8434119 29.246857,12.2459624 28.832907,11.7998542 C28.4116751,11.3458984 27.8238211,11.0489084 27.1667598,11.005492 L12.5,11.000181 L12.5,5.5 C12.5,5.08578644 12.6678932,4.71078644 12.9393398,4.43933983 C13.2107864,4.16789322 13.5857864,4 14,4 L35,4 C35.4142136,4 35.7892136,4.16789322 36.0606602,4.43933983 C36.3321068,4.71078644 36.5,5.08578644 36.5,5.5 Z" id="Combined-Shape" stroke="white"></path>
                                    <rect id="Rectangle" stroke="white" x="3.5" y="11" width="26" height="25" rx="2"></rect>
                                </g>
                            </svg>
                        </a>
                        <div style={{ width: "4px" }} />
                        <a href={`mailto:${contactDetails.email}?subject=Inquiry%20About%20Property%20in%20${address}`}>
                            <svg width="40px" height="40px" viewBox="0 0 40 40">
                                <g id="Navigate" stroke="none" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="square">
                                    <path d="M34,15 L34,32.5 C34,33.6045695 33.1045695,34.5 32,34.5 L8,34.5 C6.8954305,34.5 6,33.6045695 6,32.5 L6,7.5 C6,6.3954305 6.8954305,5.5 8,5.5 L24,5.5 L24,5.5" id="Line-22" stroke="white"></path>
                                    <line x1="34" y1="10.5" x2="34" y2="5.5" id="Line-2" stroke="white"></line>
                                    <line x1="29.5" y1="5.5" x2="34" y2="5.5" id="Line-21" stroke="white"></line>
                                    <line x1="33.5" y1="6" x2="19.5" y2="20" id="Line-23" stroke="white"></line>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            )}

            <div style={{ height: "24px" }} />

            {contactDetails.phone && (
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div>Phone:</div>
                    <div>{contactDetails.phone}</div>
                </div>
            )}

            <div style={{ height: "24px" }} />

            {contactDetails.social && (
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div>Facebook:</div>
                    <a href={contactDetails.social} target="_blank" style={{ color: "white" }}>
                        {contactDetails.social.split('.com/')[1]}
                    </a>
                </div>
            )}

            {copiedMessage && (
                <div style={{ marginTop: "40px", fontSize: "24px", fontWeight: "400", position: "absolute" }}>
                    {`${contactDetails.name}'s email address copied to your clipboard!`}
                </div>
            )}
        </>

    )

}

export default Action;