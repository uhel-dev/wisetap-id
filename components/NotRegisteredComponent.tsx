import '../app/globals.css';
import Image from "next/image";
import { useRef, useState } from "react";
import Swal from 'sweetalert2'
import Link from "next/link";
import {validateEmail} from "@/utils/validateEmail";
import {red} from "next/dist/lib/picocolors";
import {validateUrl} from "@/utils/validateUrl";

export default function NotRegisteredComponent({id, callHandleRedirectRegister}: any) {
    const [registerUser, setRegisterUser] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validRedirectUrl, setValidRedirectUrl] = useState(false);
    // const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
    const [emailError, setEmailError] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);

    const [activeStage, setActiveStage] = useState('stage1');
    const getRequestBody = (link:string) => {
        const body = { id, redirectUrl: link, email, password, fullName: getFullName() }
        return JSON.stringify(body)
    }






    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        setEmailError(false);

        if(e.target.value === '') {
            setEmailSuccess(false);
            return;
        }

        setEmailSuccess(validateEmail(e.target.value))
    }

    const handleSubmit = async (event: any) => {
        const link = validateUrl(redirectUrl)

        if(link === 'Invalid URL') {
            Swal.fire({
                title: 'Error',
                text: 'Please enter a valid link',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        event.preventDefault();
        // if (!registerUser) {
        //     alert('Please check the register box if you want to register.');
        //     return;
        // }
        // Submit data to the server-side API
        const response = await fetch('/api/set-redirect-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: getRequestBody(link),
        });
        const result = await response.text();
        if (response.status === 200) {
            await sendEmail()
            callHandleRedirectRegister()
        }
        // alert(result);
    };

    const sendEmail = async () => {
        const response = await fetch('/api/send-welcoming-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                first_name: firstName,
                qr_code: id
            }),
        });
        if (response.status === 200) {
            await Swal.fire({
                title: 'Success',
                text: 'An email has been sent to you with the details of your account.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }

    const getFullName = () => {
        const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        return `${capitalizedFirstName} ${capitalizedLastName}`
    }

    const nextStage = (event: any, activeStage: string) => {
        const stageSplit = activeStage.split('')
        let stageNumber = parseInt(stageSplit[stageSplit.length - 1])
        if(firstName === '') {
            setActiveStage('stage1')
            Swal.fire({
                title: 'Error',
                text: 'Please enter your first name',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        if(email === '' && !emailError && activeStage !== 'stage1') {
            setActiveStage('stage2')
            Swal.fire({
                title: 'Error',
                text: 'Please enter your email address',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }

        if(activeStage === 'stage2' && !validateEmail(email)) {
            setEmailError(true)
            return
        }

        if(redirectUrl === '' && activeStage !== 'stage2' && activeStage !== 'stage1') {
            setActiveStage('stage3')
            Swal.fire({
                title: 'Error',
                text: 'Please enter your review page link',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        if(stageNumber === 3 && firstName !== ''  && email !== '') {
            const response = handleSubmit(event)
            return;
        }
        if (stageNumber < 3) {
            stageNumber += 1
        }
        setActiveStage(`stage${stageNumber}`)
    }


    return (
        <>
            <style>{inputFieldCSS}</style>
            {/* TABLET / DESKTOP*/}
            <div
                className={`hidden md:flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-200 to-slate-100 p-24`}>
                <div
                    className={`bg-white p-8 rounded-xl w-full min-w-[480px] md:min-w-[780px] xl:min-w-[1040px] xl:max-w-[1280px] flex flex-col gap-8`}>
                    <div>
                        <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo"
                               className="dark:invert" width={100} height={24} priority/>
                    </div>
                    <div className={`grid grid-cols-2 gap-4`}>
                        {activeStage === `stage1` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-center items-start`}>
                                    <h1 className={`text-3xl font-semibold`}>Create a Wisetap Account</h1>
                                    <div className={`w-full md:w-3/5`}>
                                        {`Looks like it's your first time using WiseTap 🎉. Please enter your name to continue.`}
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
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                            />
                                            <span>First name</span>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="text-field w100p w-full">
                                            <input
                                                className="text-base w100p w-full"
                                                type="text"
                                                required
                                                placeholder=" "
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                            />
                                            <span>Last name (optional)</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage2` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-3xl font-semibold text-center `}>Enter Your Email</h1>
                                    <div className={`w-full lg:w-4/6`}>
                                        {`We'll send you confirmation email, with link to edit page
                                        that allows you to update your link at anytime.`}
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-center items-center`}>
                                    <div className="w-full">
                                        <div className="text-field w100p w-full">
                                            <input
                                                className="text-base w100p w-full"
                                                type="text"
                                                required
                                                placeholder=" "
                                                value={email}
                                                onChange={e => handleEmailChange(e)}
                                            />
                                            <span>Email address</span>
                                        </div>
                                        { emailError && (
                                            <div>
                                                <div
                                                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                                    role="alert">
                                                    <span className="font-medium">{`Something doesn't look right!`}</span> Please provide your valid email.
                                                </div>
                                            </div>
                                        )}
                                        {emailSuccess && (
                                            <div>
                                                <div
                                                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                                                    role="alert">
                                                    <span className="font-medium">Looks good!</span> Thank you for providing your email, hit next to proceed.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage3` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-3xl font-semibold text-center `}>Link to Your Review Page</h1>
                                    <div className={`w-full lg:w-4/6`}>
                                        {`Please enter the link to your review page. This link will be used to redirect your customers to your review page when they`} <strong>scan</strong> or <strong>tap</strong> {`WiseTap.`}
                                    </div>
                                    {/*<p className={`text-center`}>e.g. https://g.page/r/CYMJEiP2IJocEBM/review</p>*/}
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
                                            <span>Review link</span>
                                        </div>
                                        <div className={`w-full flex justify-start pt-1`}>
                                            <p className={`justify-start text-center`}>e.g.
                                                https://g.page/r/CYMJEiP2IJocEBM/review</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className={`col-span-2 flex flex-col items-end justify-end`}>
                            <div className={`flex gap-2`}>
                                <button
                                    onClick={(e) => nextStage(e, activeStage)}
                                    className={`bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl`}>{activeStage === 'stage3' ? 'Save' : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-full min-w-[480px] md:min-w-[780px] xl:min-w-[1040px] xl:max-w-[1280px] py-2 flex gap-2 items-end justify-end mr-4`}>
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
                        {activeStage === `stage1` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-xl font-semibold`}>Create a Wisetap Account</h1>
                                    <div className={`w-[85%]`}>
                                        {`Looks like it's your first time using WiseTap 🎉. Please enter your name to continue.`}
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
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                            />
                                            <span>First name</span>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="text-field w100p w-full">
                                            <input
                                                className="text-base w100p w-full"
                                                type="text"
                                                required
                                                placeholder=" "
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                            />
                                            <span>Last name (optional)</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage2` && (
                            <>
                                <div className={`flex flex-col gap-2 justify-start items-start`}>
                                    <h1 className={`text-xl font-semibold text-center `}>Enter Your Email</h1>
                                    <div>
                                        {`We'll send you confirmation email, with link to edit page
                                        that allows you to update your link at anytime.`}
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
                                                value={email}
                                                onChange={e => handleEmailChange(e)}
                                            />
                                            <span>Email address</span>
                                        </div>
                                        {emailError && (
                                            <div>
                                                <div
                                                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                                    role="alert">
                                                    <span className="font-medium">{`Something doesn't look right!`}</span> Please provide your valid email.
                                                </div>
                                            </div>
                                        )}
                                        {emailSuccess && (
                                            <div>
                                                <div
                                                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                                                    role="alert">
                                                    <span className="font-medium">Looks good!</span> Thank you for providing your email, hit next to proceed.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage3` && (
                            <>
                                <div className={`flex flex-col gap-2 justify-start items-start`}>
                                    <h1 className={`text-xl font-semibold `}>Link to Your Review Page</h1>
                                    <div>
                                        {`Please enter the link to your review page. This link will be used to redirect your customers to your review page when they `}
                                        <strong>scan</strong> or <strong>tap</strong> {`WiseTap.`}
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
                                            <span>Review link</span>
                                        </div>
                                        <div className={`w-full flex justify-start pt-1`}>
                                            <p className={`justify-start text-sm`}>e.g. https://g.page/r/CYMJEiP2IJocEBM/review</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <button
                                onClick={(e) => nextStage(e, activeStage)}
                                className={`w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl`}>{activeStage === 'stage3' ? 'Save' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col w-full`}>
                    <div className={`py-4 flex gap-2 items-center justify-center`}>
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
            </div>
        </>
    );
}


export const inputFieldCSS=  `
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