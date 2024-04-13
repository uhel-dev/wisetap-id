import '../app/globals.css'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

interface QRCodeEntity {
    id: string,
    redirectUrl: string,
    baseUrl: string,
    registered: boolean;
}

export default function ListQRCodes() {

    const MAX_PAGE_SIZE = 25

    const [qrcodes,setQrcodes] = useState<QRCodeEntity[]>([])
    const [pageableQrcodes, setPageableQrcodes] = useState<QRCodeEntity[]>([])
    const [page, setPage] = useState(0)


    useEffect(() => {
        fetchQRCodes().then((r: QRCodeEntity[]) => {
            setQrcodes(r)
            setPageableQrcodes(r.slice(0, MAX_PAGE_SIZE))
        })
    }, [])


    const refreshTable = async () =>  {
        fetchQRCodes().then((r: QRCodeEntity[]) => {
            setQrcodes(r)
            setPageableQrcodes(r.slice(0, MAX_PAGE_SIZE))
        })
    }

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
                <div className={`flex flex-col items-center w-full`}>
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

                    <div className={`mt-8 w-full max-w-5xl mx-auto`}>
                        <div className="relative overflow-x-auto">

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
                                {qrcodes && qrcodes.length > 0 && qrcodes.map((qrcode: QRCodeEntity) => {
                                    return (
                                        <tr key={qrcode.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {qrcode.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {qrcode.redirectUrl}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={qrcode.baseUrl}>
                                                    {qrcode.baseUrl}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                {qrcode.registered}
                                            </td>
                                        </tr>
                                    )
                                })}
                                { qrcodes && qrcodes.length === 0 && (
                                    <>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td colSpan={4}>No entries</td>
                                        </tr>
                                    </>
                                )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-5 lg:text-left">
                    <a
                        href=""
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
                    </a>

                    <a
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
                    </a>

                    <a
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
                    </a>

                    <a
                        href="/"
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
                            Generate <strong>QR</strong> image.
                        </p>
                    </a>

                    <a
                        href="/set"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Assign QR{" "}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                        </h2>
                        <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
                            Assign <strong>redirect</strong> to QR.
                        </p>
                    </a>
                </div>

            </main>
        </>

    )
}