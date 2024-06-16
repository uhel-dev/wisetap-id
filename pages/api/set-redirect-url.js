import { sql } from "@vercel/postgres";

export async function setRedirectUrl(id, redirectUrl, email, fullName) {
    // Use parameterized query to prevent SQL injection
    return await sql`
        UPDATE qrcodes 
        SET redirect_url = ${redirectUrl}, registered = TRUE, email = ${email}, full_name = ${fullName}
        WHERE code = ${id} AND registered = FALSE;
    `;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.body.id && req.body.redirectUrl) {
            try {
                const id = req.body.id;
                const redirectUrl = req.body.redirectUrl;
                const email = req.body.email;
                const fullName = req.body.fullName;

                const result = await setRedirectUrl(id, redirectUrl, email, fullName);
                if (result.rowCount === 0) {
                    console.log('No records updated.');
                    return res.status(404).send('No eligible records found.');
                }
                console.log('Redirect successfully added to the database.');
                res.status(200).send('Update successful.');
            } catch (e) {
                console.error(e);
                res.status(500).send('Server error');
            }
        } else {
            res.status(400).send('Missing data in request.');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).send(`Method ${req.method} Not Allowed`);
    }
}
