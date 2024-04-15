import './../app/globals.css'

import React, {useState} from "react";
import { useQRCode } from "next-qrcode";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import {baseQRUrl} from "@/types";


export default function CreateQRCode() {
    const [qrValue, setQrValue] = useState('');
    const [qrUniqueId, setQrUniqueId] = useState('');
    const [qrUrl, setQrUrl] = useState('')
    const { Canvas } = useQRCode();

    const generateUniqueQRCode = () => {
        const uniqueID = uuidv4();

        const qrUrl = `${baseQRUrl}/${uniqueID}`;
        setQrValue(qrUrl);
        setQrUrl(qrUrl)
        setQrUniqueId(uniqueID)
        handleClick(uniqueID, qrUrl).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    };

    const handleClick = async (id: string, qrUrl: string) => {
        try {
            const response = await fetch('/api/insert-qr-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: id, encoded: qrUrl }), // Replace 'your_id_here' with the ID you want to insert
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
                        Get started by adding new&nbsp;
                        <code className="font-mono font-bold">QR</code>
                        &nbsp;code
                    </p>
                    <div
                        className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                        <a
                            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
                <div className={`flex items-center justify-center`}>
                    <div className={`w-full`}>
                        <h3 className="text-xl font-bold mb-4">Generate Unique QR Code</h3>
                        <div className={`grid grid-cols-2`}>
                            <div>
                                <button onClick={generateUniqueQRCode}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                                    Generate QR Code
                                </button>
                                {qrValue && (
                                    <p>Unique ID: {qrUniqueId}</p>
                                )}
                                {qrUrl && qrUrl !== '' && (
                                    <span>
                                        Url: <Link href={`/qr/${qrUniqueId}`}>{qrUrl}</Link>
                                    </span>
                                )}
                                {qrValue && (
                                    <div className={`mt-2 p-4 bg-gray-900 w-full`}>
                                        <Canvas
                                            text={qrValue}
                                            options={{
                                                errorCorrectionLevel: 'M',
                                                margin: 3,
                                                scale: 4,
                                                width: 480,
                                                color: {
                                                    dark: '#020225',
                                                    light: '#ffffff',
                                                },
                                            }}
                                        />

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                    <Link
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Find QR{" "}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                        </h2>
                        <p className="m-0 max-w-[30ch] text-sm opacity-50">
                            Find QR code by <span className={`text-gray-95000`}>id</span>.
                        </p>
                    </Link>

                    <Link
                        href="/create-qr-code"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Create QR{" "}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                        </h2>
                        <p className="m-0 max-w-[30ch] text-sm opacity-50">
                            Create new QR code.
                        </p>
                    </Link>

                    <Link
                        href="/list-qr-codes"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            List QRs{" "}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                        </h2>
                        <p className="m-0 max-w-[30ch] text-sm opacity-50">
                            List all QR codes.
                        </p>
                    </Link>

                    <Link
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            QR Image{" "}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                        </h2>
                        <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
                            Instantly generate <strong>QR</strong> image.
                        </p>
                    </Link>
                </div>
            </main>
        </>
    )
}


