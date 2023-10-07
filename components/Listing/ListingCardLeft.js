
const Address = ({ note }) => (
    <div className='note-tag' >
        <svg width="24px" height="24px" viewBox="0 0 40 40">
            <g id="Location" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
                <path d="M8.5,14 C8.5,10.8243627 9.78718134,7.94936269 11.868272,5.86827202 C13.9493627,3.78718134 16.8243627,2.5 20,2.5 C23.1756373,2.5 26.0506373,3.78718134 28.131728,5.86827202 C30.2128187,7.94936269 31.5,10.8243627 31.5,14 C31.5,18.2947181 27.6325211,25.9965025 19.9995546,37.1176651 C12.3669984,25.9955456 8.5,18.2944513 8.5,14 Z" id="Oval" stroke="white"></path>
                <circle id="Oval" stroke="white" cx="20" cy="13" r="6.5"></circle>
            </g>
        </svg>
        <div style={{ width: "8px" }} />
        <div style={{ transform: "translateY(4px)", marginRight: "16px" }}>{note.address && note.address}</div>
    </div>
)

const Rent = ({ note }) => (
    <div className='note-tag'>
        <svg width="24px" height="24px" viewBox="0 0 40 40">
            <g id="Rent" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
                <ellipse id="Oval-Copy-5" stroke="white" cx="20" cy="23.5" rx="14.5" ry="2"></ellipse>
                <path d="M33.6774381,25.9921909 C32.9416449,26.2882512 31.8625403,26.551547 30.5244022,26.77457 C27.8309728,27.2234749 24.1099621,27.5 20.0020815,27.5000043 C15.5813995,27.4816007 11.9547671,27.1992414 9.33648516,26.7510736 C8.0412418,26.5293685 6.99832008,26.2694729 6.28771729,25.9780366 C5.99011378,25.8559818 5.75657805,25.7331378 5.60172232,25.6004738 C5.7187161,25.3204411 5.83608144,25.2331693 5.98965142,25.1563524 C6.45841274,24.9218741 7.14226145,24.7073183 8.00038949,24.5123066 C10.6916178,25.0948083 14.875414,25.4785396 19.6003104,25.4991301 C24.792711,25.4999971 29.070288,25.1256281 31.8421532,24.5457505 C32.7654055,24.7225198 33.4834288,24.9258477 33.974059,25.1529285 C34.2305846,25.7416599 33.9874087,25.8674684 33.6774381,25.9921909 Z" id="Combined-Shape" stroke="white"></path>
                <path d="M33.6774381,27.9921313 C32.9416449,28.2881916 31.8625403,28.5514873 30.5244022,28.7745103 C27.8309728,29.2234152 24.1099621,29.4999404 20.0020815,29.4999447 C15.5813995,29.4815411 11.9547671,29.1991818 9.33648516,28.7510139 C8.0412418,28.5293088 6.99832008,28.2694133 6.28771729,27.977977 C5.99011378,27.8559222 5.75657805,27.7330782 5.60172232,27.6004142 C5.7187161,27.3203815 5.83608144,27.2331097 5.98965142,27.1562927 C6.45841274,26.9218145 7.14226145,26.7072587 8.00038949,26.5122469 C10.6916178,27.0947486 14.875414,27.47848 19.6003104,27.4990704 C24.792711,27.4999374 29.070288,27.1255685 31.8421532,26.5456909 C32.7654055,26.7224601 33.4834288,26.9257881 33.974059,27.1528688 C34.2305846,27.7416003 33.9874087,27.8674087 33.6774381,27.9921313 Z" id="Combined-Shape-Copy" stroke="white"></path>
                <path d="M33.6774381,29.9921313 C32.9416449,30.2881916 31.8625403,30.5514873 30.5244022,30.7745103 C27.8309728,31.2234152 24.1099621,31.4999404 20.0020815,31.4999447 C15.5813995,31.4815411 11.9547671,31.1991818 9.33648516,30.7510139 C8.0412418,30.5293088 6.99832008,30.2694133 6.28771729,29.977977 C5.99011378,29.8559222 5.75657805,29.7330782 5.60172232,29.6004142 C5.7187161,29.3203815 5.83608144,29.2331097 5.98965142,29.1562927 C6.45841274,28.9218145 7.14226145,28.7072587 8.00038949,28.5122469 C10.6916178,29.0947486 14.875414,29.47848 19.6003104,29.4990704 C24.792711,29.4999374 29.070288,29.1255685 31.8421532,28.5456909 C32.7654055,28.7224601 33.4834288,28.9257881 33.974059,29.1528688 C34.2305846,29.7416003 33.9874087,29.8674087 33.6774381,29.9921313 Z" id="Combined-Shape-Copy-2" stroke="white"></path>
                <path d="M33.6774381,31.9921313 C32.9416449,32.2881916 31.8625403,32.5514873 30.5244022,32.7745103 C27.8309728,33.2234152 24.1099621,33.4999404 20.0020815,33.4999447 C15.5813995,33.4815411 11.9547671,33.1991818 9.33648516,32.7510139 C8.0412418,32.5293088 6.99832008,32.2694133 6.28771729,31.977977 C5.99011378,31.8559222 5.75657805,31.7330782 5.60172232,31.6004142 C5.7187161,31.3203815 5.83608144,31.2331097 5.98965142,31.1562927 C6.45841274,30.9218145 7.14226145,30.7072587 8.00038949,30.5122469 C10.6916178,31.0947486 14.875414,31.47848 19.6003104,31.4990704 C24.792711,31.4999374 29.070288,31.1255685 31.8421532,30.5456909 C32.7654055,30.7224601 33.4834288,30.9257881 33.974059,31.1528688 C34.2305846,31.7416003 33.9874087,31.8674087 33.6774381,31.9921313 Z" id="Combined-Shape-Copy-3" stroke="white"></path>
                <ellipse id="Oval-Copy-4" stroke="white" transform="translate(21.000000, 14.500000) rotate(20.000000) translate(-21.000000, -14.500000) " cx="21" cy="14.5" rx="14.5" ry="2"></ellipse>
            </g>
        </svg>
        <div style={{ width: "8px" }} />
        <div style={{ transform: "translateY(4px)", marginRight: "16px" }}>${note.rent && note.rent}pw</div>
    </div>
)

const ContractEnds = ({ note, remainingMonths }) => (
    <div
        className='note-tag'
        style={{
            backgroundColor: remainingMonths < 2 && "red",
            opacity: remainingMonths < 2 && "0.5"
        }}
    >
        <div style={{ width: "8px" }} />
        <div style={{ transform: "translateY(4px)", marginRight: "16px" }}>{note.contractEnds && remainingMonths} months left on contract</div>
    </div>
)

const ListingCardLeft = ({ note, deviceSize }) => {

    const oneUnixMonth = 2592000
    const endOfContractToUnix = Math.floor(new Date(note.contractEnds).getTime() / 1000)
    const currentTimeToUnix = Math.floor(new Date().getTime() / 1000)
    const remainingUnixTimeOnContract = endOfContractToUnix - currentTimeToUnix
    const remainingMonths = Math.floor(remainingUnixTimeOnContract / oneUnixMonth)

    if (deviceSize === "DESKTOP") {
        return (
            <div style={{ position: "absolute", zIndex: "2", padding: "16px", display: "flex", justifyContent: "space-between" }}>
                <Address note={note} />
                <Rent note={note} />
                <ContractEnds note={note} remainingMonths={remainingMonths} />
            </div>
        )
    }

    // if (deviceSize === "MOBILE") {
    //     return (
    //         <div style={{ position: "absolute", zIndex: "2", color: "white", transform: "translate(8px, 8px)", backgroundColor: "black", opacity: "0.6", padding: "16px", borderRadius: "4px" }}>
    //             <div>{`• ${note.address && note.address}`}</div>
    //             <div style={{ height: "4px" }} />
    //             <div>{`• $${note.rent && note.rent}pw`}</div>
    //             <div style={{ height: "4px" }} />
    //             <div>{`• ${note.contractEnds && remainingMonths} months left on contract`}</div>
    //         </div>
    //     )
    // }

}

export default ListingCardLeft;