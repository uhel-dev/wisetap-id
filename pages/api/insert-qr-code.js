import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    if (req.body.id) {
        try {
            const id = req.body.id;
            const { rows } = await sql`INSERT INTO qrcodes (id) VALUES (${id}) RETURNING id`;
            console.log('Successfully added into DB');
            return res.status(200).send('Successfully added into DB');
        }
        catch (e) {
            console.log(e);
            return res.status(500).send('Failed to add to DB');
        }
    } else {
        console.log('ID not provided');
        return res.status(400).send('ID is required');
    }
}
