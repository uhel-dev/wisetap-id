import '../app/globals.css';
import Image from "next/image";
import { useRef, useState } from "react";
import Swal from 'sweetalert2'
import Link from "next/link";

export default function NotRegisteredComponent({id, callHandleRedirectRegister}: any) {
    const [registerUser, setRegisterUser] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number

    const [activeStage, setActiveStage] = useState('stage1');
    const getRequestBody = () => {
        const body = { id, redirectUrl, email, password }
        return JSON.stringify(body)
    }

    const handleSubmit = async (event: any) => {
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
            body: getRequestBody(),
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
        if(firstName === '' || lastName === '' ) {
            setActiveStage('stage1')
            Swal.fire({
                title: 'Error',
                text: 'Please enter your first and last name',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        if(email === '' && activeStage !== 'stage1') {
            setActiveStage('stage2')
            Swal.fire({
                title: 'Error',
                text: 'Please enter your email address',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        if(redirectUrl === '' && activeStage !== 'stage2' && activeStage !== 'stage1') {
            setActiveStage('stage3')
            Swal.fire({
                title: 'Error',
                text: 'Please enter your redirect URL',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        if(stageNumber === 3 && firstName !== '' && lastName !== '' && email !== '') {
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
            {/* TABLET / DESKTOP*/}
            <div
                className={`hidden md:flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-200 to-slate-100`}>
                <div
                    className={`bg-white p-8 rounded-xl min-w-[480px] md:min-w-[780px] xl:min-w-[1040px] xl:max-w-[1280px] flex flex-col gap-8`}>
                    <div>
                        <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo"
                               className="dark:invert" width={100} height={24} priority/>
                    </div>
                    <div className={`grid grid-cols-2 gap-4`}>
                        {activeStage === `stage1` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-3xl font-semibold text-center `}>Create a Wisetap Account</h1>
                                    <div className={`w-3/5`}>
                                        {`Looks like it's your first time using WiseTap 🎉. Please enter your name to continue.`}
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-start items-start`}>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="first_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your first name</label>
                                        <input type="text" id="first_name" value={firstName}
                                               onChange={e => setFirstName(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="John" required/>
                                    </div>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="last_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your last name</label>
                                        <input type="text" id="last_name" value={lastName}
                                               onChange={e => setLastName(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="Kowalsky" required/>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage2` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-3xl font-semibold text-center `}>Enter Your Email</h1>
                                    <div className={`w-3/5`}>
                                        {`We'll only send you confirmation email, and link to edit page
                                        that allows you to change your redirect URL at anytime.`}
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-center items-center`}>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="first_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your email address</label>
                                        <input type="text" id="first_name" value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="support@wisetap.co.uk" required/>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage3` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-3xl font-semibold text-center `}>Link to Your Review Page</h1>
                                    <p className={`text-center`}>e.g. https://g.page/r/CYMJEiP2IJocEBM/review</p>
                                </div>
                                <div className={`flex flex-col justify-start items-start`}>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="url"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your URL</label>
                                        <input type="text" id="url" value={redirectUrl}
                                               onChange={e => setRedirectUrl(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="https://g.page/r/CYMJEiP2IJocEBM/review" required/>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className={`col-span-2 flex flex-col items-end justify-end`}>

                            <div className={`flex gap-2`}>
                                <button
                                    onClick={(e) => nextStage(e, activeStage)}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl`}>{activeStage === 'stage3' ? 'Save' : 'Next'}
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
                        {activeStage === `stage1` && (
                            <>
                                <div className={`flex flex-col gap-4 justify-start items-start`}>
                                    <h1 className={`text-xl font-semibold`}>Create a Wisetap Account</h1>
                                    <div>
                                        {`Ops! Looks like it's your first time using WiseTap 🎉. Please enter your name to continue.`}
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-start items-start`}>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="first_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your first name</label>
                                        <input type="text" id="first_name" value={firstName}
                                               onChange={e => setFirstName(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="John" required/>
                                    </div>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="last_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your last name</label>
                                        <input type="text" id="last_name" value={lastName}
                                               onChange={e => setLastName(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="Kowalsky" required/>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage2` && (
                            <>
                                <div className={`flex flex-col gap-2 justify-start items-start`}>
                                    <h1 className={`text-xl font-semibold text-center `}>Enter Your Email</h1>
                                    <div>
                                        {`We'll only send you confirmation email, and link to edit page
                                        that allows you to change your redirect URL at anytime.`}
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-start items-start`}>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="first_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your email address</label>
                                        <input type="text" id="first_name" value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="support@wisetap.co.uk" required/>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeStage === `stage3` && (
                            <>
                                <div className={`flex flex-col gap-2 justify-start items-start`}>
                                    <h1 className={`text-xl font-semibold `}>Link to Your Review Page</h1>
                                    <div>
                                        This link will be used to redirect your customers to your review page.
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-start items-start`}>
                                    <div className="mb-5 w-full">
                                        <label htmlFor="url"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                            your URL</label>
                                        <input type="text" id="url" value={redirectUrl}
                                               onChange={e => setRedirectUrl(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="https://g.page/r/CYMJEiP2IJocEBM/review" required/>
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <button
                                onClick={(e) => nextStage(e, activeStage)}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl`}>{activeStage === 'stage3' ? 'Save' : 'Next'}
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
