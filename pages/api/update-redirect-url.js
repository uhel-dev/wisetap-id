import { sql } from "@vercel/postgres";

export async function updateRedirectUrl(id, redirectUrl) {
    // Use parameterized query to prevent SQL injection
    return await sql`
        UPDATE qrcodes 
        SET redirect_url = ${redirectUrl} 
        WHERE code = ${id};
    `;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.body.id && req.body.redirectUrl) {
            try {
                const id = req.body.id;
                const redirectUrl = req.body.redirectUrl;
                const result = await updateRedirectUrl(id, redirectUrl);
                if (result.rowCount === 0) {
                    console.log('No records updated.');
                    return res.status(404).send('No eligible records found.');
                }
                console.log('Redirect successfully updated in the database.');
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
