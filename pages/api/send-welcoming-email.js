import postmark from "postmark";
import { ServerClient} from "postmark";


export default async function handler(req, res) {
    let client = new ServerClient(process.env.POSTMARK_API_KEY);
    try {
        await client.sendEmailWithTemplate({
            "From": "info@wisetap.co.uk",
            "To": req.body.email,
            "TemplateId": 36268154,
            "TemplateModel": {
                "first_name": req.body.first_name,
                "qr_code": req.body.qr_code
            },
        });
        res.status(200).send('Email sent successfully');
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Failed to send email');
    }
}