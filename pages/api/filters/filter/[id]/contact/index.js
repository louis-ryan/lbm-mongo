import dbConnect from '../../../../../../utils/dbConnect';
import Filter from '../../../../../../models/Filter';

dbConnect();



export default async (req, res) => {

    const { query: { id } } = req;

    const filter = await Filter.findById(id);

    try {

        async function sendEmail() {


            const content = (
                `
                <table width="100%" border="0" cellspacing="0" cellpadding="0">  
                    <tr> 
                        <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > 
                            <img src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/5cf24fcb-d5dc-44b2-a321-b28ee3d3e00d/lbm_new_logo.png?format=2500w" alt="LBM logo"/>
                            <h2> Hi, ${filter.userName} You have the filter for your property search</h2>
                    
                            <div> You will be notified by email whenever a new property is listed that meets your new search paramters.</div>
                        
                            <h2> Click below to return to the platform</h2>

                            <a href="https://lbm-property.vercel.app/">
                                <div style=" background-color: black; text-align: center; padding: 16px; color: white; cursor: pointer; text-decoration: none; "> 
                                    To the Lease Breakers platform
                                </div>
                            </a>
                        </td>
                    </tr>
                </table> 
            `
            )


            await fetch(`${process.env.AUTH0_BASE_URL}/api/contact`, {
                method: "POST",
                body: JSON.stringify({
                    name: filter.userName,
                    email: filter.userEmail,
                    subject: 'You have updated your search parameters.',
                    content: "hellooo"
                }),
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            }).then((res) => {
                if (!res.ok) throw new Error("Failed to send message");
                return res.json();
            })

        };

        setTimeout(() => {
            sendEmail()
        }, 2000)


        res.status(201).json({ message: "Email notifying of updated filter successful" })
    } catch (error) {
        res.status(400).json({ message: "oh no! Email notifying of updated filter has failed" });
    }
}