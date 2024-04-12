import { sql } from "@vercel/postgres";

export async function insertOrUpdate(id, redirectUrl) {
    return await sql`INSERT INTO qrcodes (id, redirect_url) VALUES (${id}, ${redirectUrl}) ON CONFLICT (id) DO UPDATE SET redirect_url = ${redirectUrl};
`
}


export default async function handler(req, res) {
    if(req.body.id && req.body.redirectUrl) {
        try {
            const id = req.body.id;
            const redirectUrl = req.body.redirectUrl;
            await insertOrUpdate(id, redirectUrl)
            console.log('Redirect successfully added to the database.')
            res.status(200)
        }
        catch (e) {
            console.log(e)
            res.status(500)
        }
    }
}
