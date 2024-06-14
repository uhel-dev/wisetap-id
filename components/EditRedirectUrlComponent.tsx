import {useState} from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function EditRedirectUrlComponent({id, callHandleRedirectRegister, assignedUrl}: any) {
    const [redirectUrl, setRedirectUrl] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(redirectUrl === '') {
            Swal.fire({
                title: 'Error',
                text: 'Please enter your redirect URL',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        const x = { id, redirectUrl}
        console.log('---x---')
        console.log(x)
        console.log('---x---')
        const response = await fetch('/api/update-redirect-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(x),
        });
        await response.text();
        if (response.status === 200) {
            callHandleRedirectRegister()
        }
    };


    return (
        <>
            {/* TABLET / DESKTOP*/}
            <div
                className={`hidden md:flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-200 to-slate-100`}>
                <div
                    className={`bg-white p-8 rounded-xl min-w-[480px] md:min-w-[780px] xl:min-w-[1040px] flex flex-col gap-8`}>
                    <div>
                        <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo"
                               className="dark:invert" width={100} height={24} priority/>
                    </div>
                    <div className={`grid grid-cols-2 gap-4`}>
                        <div className={`flex flex-col gap-4 justify-start items-start`}>
                            <h1 className={`text-3xl font-semibold text-center `}>Link to Your Review Page</h1>
                            <p className={`text-center`}>Your current link: <span className={`text-blue-600`}><Link
                                href={assignedUrl}>{assignedUrl}</Link></span></p>
                        </div>
                        <div className={`flex flex-col justify-start items-start`}>
                            <div className="mb-5 w-full">
                                <label htmlFor="url"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                    your new URL</label>
                                <input type="text" id="url" value={redirectUrl}
                                       onChange={e => setRedirectUrl(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="e.g. https://g.page/r/CYMJEiP2IJocEBM/review" required/>
                            </div>
                        </div>
                        <div className={`col-span-2 flex flex-col items-end justify-end`}>

                            <div className={`flex gap-2`}>
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl`}>Update
                                    URL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`min-w-[480px] md:min-w-[780px] xl:min-w-[1040px] py-2 flex gap-2 items-end justify-end mr-4`}>
                    <Link href={`https://wisetap.co.uk/pages/frequently-asked-questions`}>
                        <div className={`text-gray-800 hover:text-blue-600`}>
                            Help
                        </div>
                    </Link>
                    <Link href={`https://wisetap.co.uk/policies/privacy-policy`}>
                        <div className={`text-gray-800 hover:text-blue-600`}>
                            Privacy
                        </div>
                    </Link>
                    <Link href={`https://wisetap.co.uk/policies/terms-of-service`}>
                        <div className={`text-gray-800 hover:text-blue-600`}>
                            Terms
                        </div>
                    </Link>
                </div>
            </div>



            {/* MOBILE */}

            <div className={`md:hidden flex flex-col items-center justify-between h-screen`}>
                <div className={`bg-white p-8 rounded-xl flex flex-col gap-8`}>
                    <div>
                        <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo"
                               className="dark:invert" width={100} height={24} priority/>
                    </div>
                    <div className={`flex flex-col gap-4`}>
                        <div className={`flex flex-col gap-4`}>
                            <h1 className={`text-xl font-semibold`}>Edit Link to Your Review Page</h1>
                            <div className={`flex flex-col`}>
                                <p className={``}>Current link</p>
                                <Link
                                    target={`_blank`}
                                    href={assignedUrl}><span className={`text-blue-600`}>{assignedUrl}</span></Link>
                            </div>
                        </div>
                        <div className={`flex flex-col justify-start items-start`}>
                            <div className="mb-5 w-full">
                            <label htmlFor="url"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                    your new link</label>
                                <input type="text" id="url" value={redirectUrl}
                                       onChange={e => setRedirectUrl(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="e.g. https://g.page/r/CYMJEiP2IJocEBM/review" required/>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={(e) => handleSubmit(e)}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl`}>Update
                                URL
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`py-4 flex gap-2 items-end justify-end`}>
                    <Link href={`https://wisetap.co.uk/pages/frequently-asked-questions`}>
                        <div className={`text-gray-800 hover:text-blue-600`}>
                            Help
                        </div>
                    </Link>
                    <Link href={`https://wisetap.co.uk/policies/privacy-policy`}>
                        <div className={`text-gray-800 hover:text-blue-600`}>
                            Privacy
                        </div>
                    </Link>
                    <Link href={`https://wisetap.co.uk/policies/terms-of-service`}>
                        <div className={`text-gray-800 hover:text-blue-600`}>
                            Terms
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
;
}