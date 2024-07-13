import dbConnect from '../../../../../../utils/dbConnect';
import Filter from '../../../../../../models/Filter';
import axios from 'axios';

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
                                <img src="https://leasebreakersmelbourne.s3.eu-central-1.amazonaws.com/LBM_logo_latest.png" alt="LBM logo"/>
                                <h2> Hi, ${filter.userName} You have updated the filter for your property search</h2>
                        
                                <div> You will be notified by email whenever a new property is listed that meets your new search paramters.</div>
                            
                                <h2> Click below to return to the platform</h2>

                                <a href="${process.env.AUTH0_BASE_URL}/">
                                    <div style=" background-color: black; text-align: center; padding: 16px; color: white; cursor: pointer; text-decoration: none; "> 
                                        To the Lease Breakers platform
                                    </div>
                                </a>
                            </td>
                        </tr>
                    </table> 
                `
            );

            try {
                const response = await axios.post(`${process.env.AUTH0_BASE_URL}/api/contact`, {
                    name: filter.userName,
                    email: filter.userEmail,
                    subject: 'You have updated your search parameters.',
                    content: content,
                }, {
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                });

                if (response.status !== 200) {
                    throw new Error("Failed to send message");
                }
            } catch (error) {
                console.log("send email err: ", error)
            }
        };

        setTimeout(() => {
            sendEmail()
        }, 2000)

        res.status(201).json({ message: "Email notifying of updated filter successful" })
    } catch (error) {
        res.status(400).json({ message: "oh no! Email notifying of updated filter has failed" });
    }
}