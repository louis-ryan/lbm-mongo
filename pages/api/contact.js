// import { transporter } from "../../utils/nodeMailer";

import nodemailer from "nodemailer";

const handler = async (req, res) => {

  if (req.method === "POST") {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info.leasebreakersmelbourne@gmail.com",
        pass: "wcybrggapbxoegrr"
      },
    });

    const data = req.body;

    if (!data) { return res.status(400).send({ message: "Bad request" }) }

    try {
      await transporter.sendMail({
        from: "info.leasebreakersmelbourne@gmail.com",
        to: 
        // data.email
        "louis.sw.ryan@gmail.com"
        ,
        subject: data.subject,
        html: "simple string"
      //   `
      //   <!DOCTYPE html>
      //   <html> 
      //     <head> 
      //       <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> 
      //     </head> 
      //     <body style="margin: 0 !important; padding: 0 !important; background: #fff"> 
      //       <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " >
      //         </div>
      //           <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
      //             <tr> 
      //               <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > 
      //                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > 
      //                   <tr> 
      //                     <td> 
      //                       <table width="100%" border="0" cellspacing="0" cellpadding="0"> 
      //                         <tr> 
      //                           <td> 
      //                             ${data.content}
      //                           </td>
      //                         </tr>
      //                       </table> 
      //                     </td>
      //                   </tr>
      //                 </table> 
      //               </td>
      //             </tr>
      //           </table> 
      //     </body>
      //   </html>
      // `
      });

      return res.status(200).json({ success: true, data: data });
    } catch (err) {
      console.log("send email err, ", err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;