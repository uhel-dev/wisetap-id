import { sql } from "@vercel/postgres";



export default async function handler(req, res) {
    try {
        const filters = req.body.filter

        let wherePartOfQuery = ''
        if(filters) {
            if(filters.registered === true) {
                wherePartOfQuery = 'WHERE registered = true'
            }
            else if(filters.registered === false ) {
                wherePartOfQuery = 'WHERE registered = false'
            }
            else if(filters.all === true) {
                wherePartOfQuery = ''
            }
        }
        else {
            return res.status(500).send("Pass filters in the request mate")
        }

        if (wherePartOfQuery !== '') {
            const { rows } = await sql`SELECT * FROM qrcodes ${wherePartOfQuery}`;
            return res.status(200).send(rows.map(row => {
                return {
                    ...row,
                    full_url: `https://id.wisetap.co.uk/${row.id}`
                }
            }));
        }
        else {
            const { rows } = await sql`SELECT * FROM qrcodes`;
            const data = rows.map(row => {
                return {
                    ...row,
                    id: row.id,
                    redirectUrl: row.redirect_url,
                    baseUrl: `https://id.wisetap.co.uk/${row.id}`,
                    registered: `${row.registered ? 'Registered' : 'Free'}`

                }
            })
            return res.status(200).send(data);
        }





    }
    catch (e) {
        console.log(e);
        return res.status(500).send('Failed to fetch QR codes from DB');
    }
}
