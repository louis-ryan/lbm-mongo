import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import getStripe from '../../utils/getStripe';

const AccessPremium = ({ user, nameToContact, noteId }) => {

    const [hoverPremium, setHoverPremium] = useState(false)
    const [accessingStripe, setAccessingStripe] = useState(false)


    const handleCheckout = async () => {
        setAccessingStripe(true)
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email, noteId: noteId })
        });

        const data = await response.json();
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

        if (error) {
            console.error('Stripe checkout error:', error);
            setAccessingStripe(false)
        }
    };


    return (
        <div
            onMouseEnter={() => setHoverPremium(true)}
            onMouseLeave={() => setHoverPremium(false)}
            style={{ width: "100%", height: "400", backgroundColor: hoverPremium ? "white" : "lightgrey", display: "flex", padding: "24px", justifyContent: "center", alignItems: "center", cursor: "pointer", transition: "1s" }}
        >
            {accessingStripe ? (
                <div style={{height: "280px", display: "flex", alignItems: "center"}}>
                    <Oval visible={true} height="80" width="80" color="white" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" />
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>

                    <h1>{"Contact this user directly with full access!"}</h1>

                    <div style={{ height: "16px" }} />

                    <div style={{ width: "100%", height: "280px", transition: "1s", display: "flex", justifyContent: 'space-between', filter: hoverPremium ? "saturate(1)" : "saturate(0)" }}>
                        <div style={{ textAlign: "center", border: "1px solid grey", padding: "16px", opacity: hoverPremium ? "0.6" : "0.8", transition: "1s" }}>
                            <h2 style={{ transform: "scaleX(1.3)" }}>{"Free Tier"}</h2>
                            <h2 style={{ transform: "scaleX(1.3)" }}>{"$0 forever"}</h2>
                            <h3>{"✅ Communicate via platform"}</h3>
                            <h3>{"❌ Contact Directly"}</h3>
                            <div style={{ height: "8px" }} />
                            <h1>{"Current"}</h1>
                        </div>
                        <div style={{ width: "16px" }} />
                        <div
                            onClick={() => handleCheckout()}
                            className='tier-card-premium'
                            style={{ textAlign: "center", border: "1px solid grey", padding: "16px", opacity: hoverPremium ? "1" : "0.8" }}
                        >
                            <h2 style={{ transform: "scaleX(1.3)" }}>{"Premium"}</h2>
                            <h2 style={{ transform: "scaleX(1.3)" }}>{"$10 one-time"}</h2>
                            <h3>{"✅ Communicate via platform"}</h3>
                            <h3>{"✅ Contact Directly"}</h3>
                            <div style={{ height: "8px" }} />
                            <h1>{"Check it out!"}</h1>
                        </div>
                    </div>
                    <div style={{ height: "16px" }} />
                </div>
            )}


        </div>
    )
}


export default AccessPremium;