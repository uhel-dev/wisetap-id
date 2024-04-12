import '../app/globals.css'
import React, {useEffect, useState} from "react";
import Image from "next/image";

interface QRCodeEntity {
    id: string,
    redirectUrl: string,
    baseUrl: string,
    registered: boolean;
}

export default function ListQRCodes() {

    const [qrcodes,setQrcodes] = useState([])

    useEffect(() => {
        fetchQRCodes().then(r =>
            setQrcodes(r)
        )
    }, [])

    const fetchQRCodes = async () => {
        try {
            const response = await fetch('/api/list-all-qr-codes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
             {
                        filter: {
                            all: true
                        }
                    }
                ),
            });

            if (!response.ok) {
                throw new Error('Failed to insert QR code');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        View all
                        <code className="font-mono font-bold">&nbsp;QR</code>
                        &nbsp;codes
                    </p>
                    <div
                        className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                        <a
                            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/wise-tap-rectangle-logo-black-no-padding.svg"
                                alt="WiseTap Logo"
                                className="dark:invert"
                                width={100}
                                height={24}
                                priority
                            />
                        </a>
                    </div>
                </div>
                <div className={`bg-white mt-8`}>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Redirect URL
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    QR Code Base Url
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Registered
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            { qrcodes && qrcodes.length > 0 && qrcodes.map((qrcode: QRCodeEntity) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {qrcode.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {qrcode.redirectUrl}
                                        </td>
                                        <td className="px-6 py-4">
                                            {qrcode.baseUrl}
                                        </td>
                                        <td className="px-6 py-4">
                                            {qrcode.registered}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>

            </main>
        </>

    )
}