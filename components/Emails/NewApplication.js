const newApplicationEmail = (note, user, urlForEmail) => (

    `<img src="https://leasebreakersmelbourne.s3.eu-central-1.amazonaws.com/LBM_hero_img.png" width="120px"/>` +

    `<h2>You have a new application to your property in ${note.address}</h2>` +
    
    `<table width="100%" border="0" cellspacing="0" cellpadding="0"> ` +
        `<tr> ` +
    
            `<td>`+
    
            `<td>`+
    
            `<td> ` +
                `<div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden;">` +
                    `<img src="${user.picture}" width="60px" height="60px"/>` +
                `</div>` +
            `</td>` +
    
            `<td> ` +
                `<div style="position: absolute; right: 0px; margin-bottom: 40px;">` +
                    `<div style="height: 20px;"/>`+
                    `<h3>Application from</h3>` +
                    `<h3>${user.name}</h3>` +
                `</div>` +
            `</td> ` +
        ` </tr>` +
    `</table> ` +
    
    `<div>` +
        `To see this most recent application, simply click the button below` +
    `</div>` +
    
    `<a href="${urlForEmail}/${note._id}">` +
        `<div style="width: 100%; padding: 24px; background-color: black; color: white; text-align: center; text-decoration: none; cursor: pointer; margin-top: 40px;">` +
            `VIEW APPLICATION` +
        `</div>` +
    `</a>`
) 

export default newApplicationEmail