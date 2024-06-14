import {sql} from "@vercel/postgres";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { code } = req.query;

        try {
            const redirectUrl = await sql`SELECT redirect_url, registered from qrcodes WHERE code=${code}`

            if (redirectUrl && redirectUrl.rowCount > 0) {
                res.status(200).json({
                    redirectUrl: redirectUrl.rows[0].redirect_url,
                    registered: redirectUrl.rows[0].registered
                });
            } else {
                res.status(404).json({ error: 'No redirect URL found for this ID' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Database error', details: error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
