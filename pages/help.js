import Link from 'next/link';
import magpie from '../public/Magpie.svg';
import logo from '../public/LBM_logo.svg';
import download from '../public/Download.svg';
import useWindowWidth from '../custom_hooks/useWindowWidth';


const Help = () => {

    const windowWidth = useWindowWidth()


    const wrapper = { width: "100%", display: "flex", justifyContent: "center", paddingTop: "120px" }
    const magpieStyle = { position: "absolute", transform: "translateX(720px) translateY(80px)", display: windowWidth <= 800 && "none" }
    const logoStyle = { position: "absolute", transform: "translateX(-80px) translateY(-8px)", display: windowWidth <= 800 && "none" }


    return (
        <div style={wrapper}>
            <div style={{ padding: "24px", maxWidth: "800px" }}>

                <img src={magpie} alt="magpie" style={magpieStyle} />
                <header>
                    <h1>Guide to Swapping a Rental Contract in the state of Victoria</h1>
                </header>

                <div style={{ fontSize: "24px", fontWeight: "800", opacity: "0.5", fontStyle: "italic", padding: "24px" }}>
                    <div>"The rental provider must give their consent to transfer the rental agreement, unless there is a good reason to refuse."</div>
                    <div style={{ fontSize: "16px", marginTop: "16px" }}>- consumer.vic.gov.au</div>
                </div>

                <section>
                    <p>Swapping or transferring a rental contract is also commonly known as a lease transfer. Below are the steps you need to follow if you want to swap a rental contract in Victoria.</p>

                    <ol>
                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Check the lease agreement:</strong>
                            <p>Before making any move, review your current lease agreement to ensure you are allowed to transfer the lease. Some agreements may have restrictions on this.</p>
                            <a href="https://www.consumer.vic.gov.au/housing/renting/starting-and-changing-rental-agreements/people-moving-in-and-out/transferring-a-rental-agreement" target="_blank">Learn more about Lease Agreements at vic.gov</a>
                            <div style={{ height: "24px" }} />
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Find a suitable tenant:</strong>
                            <p>It's your responsibility to find someone who will take over the lease. Ensure they are reliable and can meet the terms of the lease.</p>
                            <a style={{ textDecoration: "none" }} href={`/new`} target="_blank">
                                <div
                                    className="button primary"
                                    onClick={() => localStorage.setItem("redirect_to", `/new`)}
                                    style={{ maxWidth: "400px" }}
                                >
                                    List your rental property here to find a tennant
                                </div>
                            </a>
                            <div style={{ height: "24px" }} />
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Obtain consent from the landlord:</strong>
                            <p>Written consent from the landlord or property manager is essential before any transfer can occur. Typically, they will want to vet the new tenant to ensure they're suitable.</p>
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Complete the necessary paperwork:</strong>
                            <div>
                                <div style={{ margin: "24px 0px" }}>
                                    <div>• Fill out a 'Tenant Transfer' application form. We have prepared one for you below.</div>
                                    <div style={{ height: "16px" }} />
                                    <Link href="/api/downloadPdf">
                                        <a download>
                                            <div style={{ width: "80px", height: "120px", border: "1px solid grey", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                                <div style={{ textAlign: "center" }}>
                                                    <img src={download} alt="download_icon" />
                                                    <div style={{ textAlign: "center" }}>download pdf</div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div style={{ height: "24px" }} />
                                <div style={{ margin: "24px 0px" }}>
                                    <div>• Ensure the incoming tenant completes a rental application form and provides any necessary supporting documentation.</div>
                                    <div style={{ height: "16px" }} />
                                    <div>We are currently working on bringing document exchange into the platform so hold tight!</div>
                                </div>
                            </div>
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Pay any associated fees:</strong>
                            <p>There may be administrative fees associated with transferring a lease. It's important to clarify who (either outgoing or incoming tenant) will be responsible for these fees.</p>
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Transfer bond:</strong>
                            <p>If a bond was paid at the beginning of the lease, the incoming tenant might need to reimburse the outgoing tenant. Enter your details at the state goverment link below to begin the bond transfer process.</p>
                            <a href="https://rentalbonds.vic.gov.au/" target="_blank">https://rentalbonds.vic.gov.au/</a>
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Update details with utility providers:</strong>
                            <p>Ensure you notify utility companies (e.g., water, electricity, gas) about the change in tenancy so that accounts can be correctly adjusted.</p>
                        </li>

                        <img src={logo} alt="logo" style={logoStyle} />
                        <li>
                            <strong>Finalise the process:</strong>
                            <p>Once all the paperwork is complete and both the outgoing and incoming tenant and the landlord or property manager are satisfied, you can finalize the process. Ensure all keys and other property-related items are handed over to the new tenant.</p>
                        </li>
                    </ol>

                    <p><strong>Note:</strong> This guide provides general information about the process. For specific legal advice or further information, consider consulting the Victorian Civil and Administrative Tribunal (VCAT) or a legal expert familiar with Victorian tenancy laws.</p>
                </section>
            </div>
        </div>
    )
}

export default Help;