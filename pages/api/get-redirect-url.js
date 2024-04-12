import {sql} from "@vercel/postgres";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            const redirectUrl = await sql`SELECT redirect_url from qrcodes WHERE id=${id}`

            if (redirectUrl && redirectUrl.rows) {
                res.status(200).json(redirectUrl.rows[0].redirect_url);
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
