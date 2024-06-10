import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';


const PaymentSuccess = (props) => {

    console.log("props: ", props)

    const { user } = useUser()
    console.log("user: ", user)
    const router = useRouter()

    const handleCheckStatus = async () => {
        const response = await fetch(`/api/tier/${user.email}`);
        const data = await response.json();
        console.log("data: ", data)
        props.setPaymentStatus(data.status);
    };

    useEffect(() => {
        if (!user) return
        if (!props) return
        handleCheckStatus()
    }, [props, user])

    return (
        <div style={{ width: "100%", height: "calc(100vh - 40px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "400px", border: "1px solid lightgrey", borderRadius: "8px", textAlign: "center", padding: "16px" }}>
                <img src={'/LBM_logo_no_bg.svg'} height="120px" alt="LBM logo" />
                <div style={{ height: "24px" }} />
                <h1>{"You have successfully upgraded your account to full access"}</h1>
                <div style={{ height: "40px" }} />
                <div
                    onClick={() => router.push(`/${router.query.id}`)}
                    className='button primary'
                >
                    {"RETURN TO LISTING"}
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess;