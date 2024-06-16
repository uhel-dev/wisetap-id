import {useState} from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function EditRedirectUrlComponent({id, callDisableEditMode, assignedUrl}: any) {
    const [redirectUrl, setRedirectUrl] = useState('');
    const validateURL = (url: any) => {
        let givenURL;
        try {
            // Check if the URL has a scheme or 'www'
            if (!/^https?:\/\//i.test(url) && !/^www\./i.test(url)) {
                url = 'https://' + url;
            }
            // Ensure the URL contains at least one dot (".") after the scheme
            if (!/\./.test(url.split('/')[2])) {
                throw new Error("Invalid URL");
            }
            givenURL = new URL(url);
            setRedirectUrl(givenURL.href);
        } catch (error) {
            console.log("error is", error);
            return false;
        }
        return true;
    }

    const handleSubmit = async (event: any) => {
        if(!validateURL(redirectUrl)) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter a valid URL',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }

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
            callDisableEditMode(redirectUrl)
        }
    };

    const inputFieldCSS=  `
        .text-base {
          line-height: 1;
          margin: 0;
          height: 20px;
          padding: 5px 8px;
          border: 1px solid #1f1f1f;
          border-radius: 4px;
          transition: all .3s;
          height: 48px;
          width: 100%;
        }
        
        .text-base:focus {
          border: 2px solid #0074d9;
          outline: 0;
        }
        
        .text-field {
          position: relative;
        }
        
        .text-field input,
        .text-field textarea {
          display: inline-block;
          padding: 10px;
        }
        
        .text-field span {
          color: #1f1f1f;
          position: absolute;
          pointer-events: none;
          left: 10px;
          top: 23px;
          transition: 0.3s;
        }
        
        .text-field input:focus+span,
        .text-field input:not(:placeholder-shown)+span,
        .text-field textarea:focus+span,
        .text-field textarea:not(:placeholder-shown)+span {
          top: 2px;
          left: 10px;
          font-size: small;
          background-color: #fff;
          padding: 0 5px 0 5px;
        }
        
        .text-field input:focus:invalid+span,
        .text-field input:not(:placeholder-shown):invalid+span,
        .text-field textarea:focus:invalid+span,
        .text-field textarea:not(:placeholder-shown):invalid+span {
          color: #0074d9;
        }
        
        .w100p {
          padding: 10px 0;
        }
        
        .w100p textarea {
          height: 120px;
        }
`


    return (
        <>
            <style>{inputFieldCSS}</style>

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
                        <div className={`flex flex-col justify-center items-start`}>
                            <div className="w-full">
                                <div className="text-field w100p w-full">
                                    <input
                                        className="text-base w100p w-full"
                                        type="text"
                                        required
                                        placeholder=" "
                                        value={redirectUrl}
                                        onChange={e => setRedirectUrl(e.target.value)}
                                    />
                                    <span>Email address</span>
                                </div>
                            </div>
                        </div>
                        <div className={`col-span-2 flex flex-col items-end justify-end`}>

                            <div className={`flex gap-2`}>
                                {/*<button*/}
                                {/*    onClick={(e) => handleSubmit(e)}*/}
                                {/*    className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl`}>Reset*/}
                                {/*</button>*/}
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
                <div className={`w-full bg-white p-8 rounded-xl flex flex-col gap-8`}>
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
                            <div className="w-full">
                                <div className="text-field w100p w-full">
                                    <input
                                        className="text-base w100p w-full"
                                        type="text"
                                        required
                                        placeholder=" "
                                        value={redirectUrl}
                                        onChange={e => setRedirectUrl(e.target.value)}
                                    />
                                    <span>Email address</span>
                                </div>
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