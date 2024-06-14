import { parseAsync } from 'json2csv';
import {sql} from "@vercel/postgres";
import {baseQRUrl} from "../../types";

export default async function handler(req, res) {
    try {
        // Retrieve quantity from the query string
        const { quantity } = req.query;

        // Simulate fetching data from the database
        // Here you would have your actual database fetching logic
        const data = await fetchDataFromDatabase(parseInt(quantity));

        // Define the fields for the CSV
        // const fields = ['Card #', 'QR Image', 'URL'];
        const fields = ['card', 'qr', 'url']; // adjust these fields based on your actual data structure
        const opts = { fields };

        // Convert JSON to CSV
        const csv = await parseAsync(data, opts);

        // Set headers to prompt download on client-side
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="download.csv"`);

        // Send the CSV file
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function fetchDataFromDatabase(quantity) {
    // Simulated database response
    const { rows } = await sql`SELECT * FROM qrcodes WHERE used = false LIMIT ${quantity}`;

    if(rows.length > 0) {
        try {
            const codes = rows.map(r => r.code)
            const result = await sql`UPDATE qrcodes SET used = TRUE WHERE code = ANY(${codes})`;
            if(result.rowCount > 0) {
                console.log(`Successfully updated ${result.rows} rows.`)
            }
            if(result.rowCount === 0) {
                console.log(`Unable to update ${result.rows} rows.`)
                return [];
            }

            const data = rows.map(v => ({
                card: v.id,
                qr: `${v.encoded_qr_image}`,
                url: `${baseQRUrl}/${v.code}`
            }));


            return data
        }
        catch (e) {
            console.log('Unable to update cards `used` attribute')
            console.log(e)
        }
    }
}
