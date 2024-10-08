import '../../app/globals.css'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

interface QRCodeEntity {
    id: string,
    redirectUrl: string,
    baseUrl: string,
    registered: boolean;
    used: boolean;
    encodedImageUrl: string;
}

export default function ListQRCodes() {

    const MAX_PAGE_SIZE = 10

    const [qrcodes,setQrcodes] = useState<QRCodeEntity[]>([])
    const [pageableQrcodes, setPageableQrcodes] = useState<QRCodeEntity[]>([])
    const [page, setPage] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [filterRedirectUrlOrder, setFilterRedirectUrlOrder] = useState(true)


    const updatePageNumber = (pageNumber: number) => {
        setPage(pageNumber)
        setPageableQrcodes(qrcodes.slice(pageNumber * MAX_PAGE_SIZE, (pageNumber + 1) * MAX_PAGE_SIZE));
    }

    useEffect(() => {
        fetchQRCodes().then((r: QRCodeEntity[]) => {
            setQrcodes(r)
            setPageableQrcodes(r.slice(0, MAX_PAGE_SIZE))
            setNumberOfPages(Math.ceil(r.length / MAX_PAGE_SIZE))
        })
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
                throw new Error('Failed to list QR codes');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filterByRedirectURL = () => {
        setFilterRedirectUrlOrder(!filterRedirectUrlOrder)
        const sortedQRCodes = [...qrcodes].sort((a, b) => {
            if(filterRedirectUrlOrder) {
                if (a.redirectUrl === null && b.redirectUrl) return 1;
                if (a.redirectUrl && b.redirectUrl === null) return -1;
                if (a.redirectUrl && b.redirectUrl) return 0;
            }
            if(!filterRedirectUrlOrder) {
                if (a.redirectUrl === null && b.redirectUrl) return -1;
                if (a.redirectUrl && b.redirectUrl === null) return 1;
                if (a.redirectUrl && b.redirectUrl) return 0;
            }
            return a.redirectUrl?.length - b.redirectUrl?.length;
        });
        setQrcodes(sortedQRCodes);
        setPageableQrcodes(sortedQRCodes.slice(page * MAX_PAGE_SIZE, (page + 1) * MAX_PAGE_SIZE));
    }

    const showExportDialog = () => {
        Swal.fire({
            title: "How many codes do you want to export?",
            input: "number",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Export",
            showLoaderOnConfirm: true,
            preConfirm: async (quantity) => {
             await fetchCSV(quantity)
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }

    async function fetchCSV(quantity: number) {
        try {
            const backendUrl = `/api/generate-csv?quantity=${quantity}`;
            const response = await fetch(backendUrl, {
                method: 'GET', // or 'POST' if your API requires
                headers: {
                    'Content-Type': 'application/csv',
                    'Accept': 'application/csv'
                }
            });

            if (!response.ok) {
                // Handle non-200 responses
                const errorText = await response.text();
                return Swal.showValidationMessage(`Request failed with status: ${response.status}, Message: ${errorText}`);
            }
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const formattedDate = `${day}_${month}_${year}`;

            const fileName = `wisetap-${formattedDate}.csv`

            // Assuming the response is a Blob of type CSV
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            // Optional: Download the CSV file directly in the client
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            return Swal.fire({
                title: 'Success!',
                text: 'CSV file has been successfully downloaded.',
                icon: 'success'
            });
        } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
        }
    }


    return (
        <>
            <main>
                <div>
                    Opsss, this page is empty.
                </div>
            </main>
            {/*<main className="flex min-h-screen flex-col items-center justify-between p-24">*/}
            {/*    <div className={`flex flex-col items-center w-full`}>*/}
            {/*        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">*/}
            {/*            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">*/}
            {/*                View all*/}
            {/*                <code className="font-mono font-bold">&nbsp;QR</code>*/}
            {/*                &nbsp;codes*/}
            {/*            </p>*/}
            {/*            <div*/}
            {/*                className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">*/}
            {/*                <a*/}
            {/*                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"*/}
            {/*                    href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"*/}
            {/*                    rel="noopener noreferrer"*/}
            {/*                >*/}
            {/*                    <Image*/}
            {/*                        src="/wise-tap-rectangle-logo-black-no-padding.svg"*/}
            {/*                        alt="WiseTap Logo"*/}
            {/*                        className="dark:invert"*/}
            {/*                        width={100}*/}
            {/*                        height={24}*/}
            {/*                        priority*/}
            {/*                    />*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className={`mt-8 w-full max-w-5xl mx-auto`}>*/}
            {/*            <div className="relative overflow-x-auto">*/}

            {/*                <div className={`flex justify-end`}>*/}
            {/*                    <div className={`flex gap-2 py-4`}>*/}
            {/*                           <button onClick={() => showExportDialog()}>Export</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <table*/}
            {/*                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">*/}
            {/*                    <thead*/}
            {/*                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">*/}
            {/*                    <tr>*/}
            {/*                        <th scope="col" className="px-6 py-3">*/}
            {/*                            ID*/}
            {/*                        </th>*/}
            {/*                        <th scope="col" className="px-6 py-3">*/}
            {/*                            <button onClick={() => filterByRedirectURL()}>Redirect URL</button>*/}
            {/*                        </th>*/}
            {/*                        <th scope="col" className="px-6 py-3">*/}
            {/*                            QR Code Base Url*/}
            {/*                        </th>*/}
            {/*                        <th scope="col" className="px-6 py-3">*/}
            {/*                            Registered*/}
            {/*                        </th>*/}
            {/*                        <th>*/}
            {/*                            QR Code*/}
            {/*                        </th>*/}
            {/*                    </tr>*/}
            {/*                    </thead>*/}
            {/*                    <tbody>*/}
            {/*                    {qrcodes && qrcodes.length > 0 && pageableQrcodes.map((qrcode: QRCodeEntity) => {*/}
            {/*                        return (*/}
            {/*                            <tr key={qrcode.id}*/}
            {/*                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">*/}
            {/*                                <th scope="row"*/}
            {/*                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">*/}
            {/*                                    {qrcode.id}*/}
            {/*                                </th>*/}
            {/*                                <td className="px-6 py-4">*/}
            {/*                                    {qrcode.redirectUrl ? qrcode.redirectUrl : "None"}*/}
            {/*                                </td>*/}
            {/*                                <td className="px-6 py-4">*/}
            {/*                                    <Link href={qrcode.baseUrl}>*/}
            {/*                                        {qrcode.baseUrl}*/}
            {/*                                    </Link>*/}
            {/*                                </td>*/}
            {/*                                <td className="px-6 py-4">*/}
            {/*                                    {qrcode.registered}*/}
            {/*                                </td>*/}
            {/*                                <td className="px-6 py-4">*/}
            {/*                                    <button onClick={() => Swal.fire({*/}
            {/*                                        title: "Image Source",*/}
            {/*                                        text: `data:image/png;base64,${qrcode.encodedImageUrl}`,*/}
            {/*                                        icon: 'info'*/}
            {/*                                    })}>*/}
            {/*                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
            {/*                                             viewBox="0 0 24 24">*/}
            {/*                                            <path*/}
            {/*                                                d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm-5.189 12.5c0-.828.672-1.5 1.501-1.5.827 0 1.499.672 1.499 1.5s-.672 1.5-1.499 1.5c-.829 0-1.501-.672-1.501-1.5zm6.5.5l-2.093 2.968-1.31-.968-3.097 4h10l-3.5-6z"/>*/}
            {/*                                        </svg>*/}
            {/*                                    </button>*/}
            {/*                                </td>*/}
            {/*                            </tr>*/}
            {/*                        )*/}
            {/*                    })}*/}
            {/*                    {qrcodes && qrcodes.length === 0 && (*/}
            {/*                        <>*/}
            {/*                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">*/}
            {/*                                <td colSpan={5} className={`text-center p-2`}>Database did not return any*/}
            {/*                                    codes.*/}
            {/*                                </td>*/}
            {/*                            </tr>*/}
            {/*                        </>*/}
            {/*                    )}*/}
            {/*                    </tbody>*/}
            {/*                </table>*/}
            {/*                <div className={`flex justify-end`}>*/}
            {/*                    <div className={`flex gap-2 py-4`}>*/}
            {/*                        {numberOfPages !== 0 && [...Array(numberOfPages)].map((_, index) => (*/}
            {/*                            <button onClick={() => updatePageNumber(index)}*/}
            {/*                                    className={`border border-black px-2 py-1 ${page === index ? 'bg-black text-white' : ''}`}*/}
            {/*                                    key={index}>{index + 1}</button>*/}
            {/*                        ))}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-5 lg:text-left mt-8">*/}
            {/*        <Link*/}
            {/*            href=""*/}
            {/*            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            <h2 className="mb-3 text-2xl font-semibold">*/}
            {/*                Find QR{" "}*/}
            {/*                <span*/}
            {/*                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">*/}
            {/*  -&gt;*/}
            {/*</span>*/}
            {/*            </h2>*/}
            {/*            <p className="m-0 max-w-[30ch] text-sm opacity-50">*/}
            {/*                Find QR code by <span className={`text-gray-95000`}>id</span>.*/}
            {/*            </p>*/}
            {/*        </Link>*/}

            {/*        <Link*/}
            {/*            href="/admin/create-qr-code"*/}
            {/*            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            <h2 className="mb-3 text-2xl font-semibold">*/}
            {/*                Create QR{" "}*/}
            {/*                <span*/}
            {/*                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">*/}
            {/*  -&gt;*/}
            {/*</span>*/}
            {/*            </h2>*/}
            {/*            <p className="m-0 max-w-[30ch] text-sm opacity-50">*/}
            {/*                Create new QR code.*/}
            {/*            </p>*/}
            {/*        </Link>*/}

            {/*        <Link*/}
            {/*            href="/list-qr-codes"*/}
            {/*            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            <h2 className="mb-3 text-2xl font-semibold">*/}
            {/*                List QRs{" "}*/}
            {/*                <span*/}
            {/*                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">*/}
            {/*  -&gt;*/}
            {/*</span>*/}
            {/*            </h2>*/}
            {/*            <p className="m-0 max-w-[30ch] text-sm opacity-50">*/}
            {/*                List all QR codes.*/}
            {/*            </p>*/}
            {/*        </Link>*/}

            {/*        <Link*/}
            {/*            href="/public"*/}
            {/*            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            <h2 className="mb-3 text-2xl font-semibold">*/}
            {/*                QR Image{" "}*/}
            {/*                <span*/}
            {/*                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">*/}
            {/*  -&gt;*/}
            {/*</span>*/}
            {/*            </h2>*/}
            {/*            <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">*/}
            {/*                Generate <strong>QR</strong> image.*/}
            {/*            </p>*/}
            {/*        </Link>*/}

            {/*        <Link*/}
            {/*            href="/set"*/}
            {/*            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            <h2 className="mb-3 text-2xl font-semibold">*/}
            {/*                Assign QR{" "}*/}
            {/*                <span*/}
            {/*                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">*/}
            {/*  -&gt;*/}
            {/*</span>*/}
            {/*            </h2>*/}
            {/*            <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">*/}
            {/*                Assign <strong>redirect</strong> to QR.*/}
            {/*            </p>*/}
            {/*        </Link>*/}
            {/*    </div>*/}

            {/*</main>*/}
        </>

    )
}