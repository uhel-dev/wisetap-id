import { sql } from "@vercel/postgres";
import QRCode from 'qrcode';
import { Buffer } from 'buffer';
import sharp from 'sharp';
import {baseQRUrl} from "../../types";

export default async function handler(req, res) {
    if (req.body.code) {
        try {
            const id = req.body.code;
            const qrCode = `${baseQRUrl}/${id}`

            // Generate QR code as data URL
            // const qrDataURL = await QRCode.toDataURL(qrCode);
            const qrDataURL = await QRCode.toDataURL(qrCode,
                {
                    margin: 0,
                    color: {
                        dark: '#000000',
                        light: '#0000'
                    },
                    width: 100,
                    version: 5,
                });

            // Convert data URL to Buffer
            const data = qrDataURL.split(',')[1];
            console.log(data)
            const buffer = Buffer.from(data, 'base64');

            // Convert to PNG and get the Buffer of the PNG image
            const pngBuffer = await sharp(buffer)
                .png()
                .toBuffer();

            // Convert to Base64 string
            const base64PNG = pngBuffer.toString('base64');
            const base64CODE = qrDataURL.split(',')[1];




            const { rows } = await sql`INSERT INTO qrcodes (code, encoded_qr_image) VALUES (${id}, ${base64CODE}) RETURNING id`;
            console.log('Successfully added into DB');
            return res.status(200).send(JSON.stringify('Successfully added into DB'));
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
