import '../app/globals.css';
import Image from "next/image";
import { useRef, useState } from "react";
import Swal from 'sweetalert2'

export default function NotRegisteredComponent({id, callHandleRedirectRegister}: any) {
    const [registerUser, setRegisterUser] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number

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
            callHandleRedirectRegister()
        }
        alert(result);
    };

    return (
        <main className="flex min-h-screen flex-col items-center md:p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                {/* Header Text */}
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {`Not registered yet? Let's`}&nbsp; <code className="font-mono font-bold">fix</code>&nbsp;it.
                </p>
                {/* Logo Link */}
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                    <a className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0" href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
                        <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo" className="dark:invert" width={100} height={24} priority />
                    </a>
                </div>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center w-full py-24 px-8 md:p-24">
                <form className="mx-auto md:w-1/2 p-8" onSubmit={handleSubmit}>
                    {/* Redirect URL Input */}
                    <div className="mb-5">
                        <label htmlFor="redirect_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What URL you want to load to customers when they scan your code?</label>
                        <input type="text" id="redirect_url" value={redirectUrl} onChange={e => setRedirectUrl(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://wisetap.co.uk" required />
                    </div>
                    {/* Register Checkbox */}
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="registerUser" type="checkbox" checked={registerUser} onChange={(e) => setRegisterUser(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="registerUser" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Register me</label>
                    </div>
                    {/* Conditional Fields */}
                    {registerUser && (
                        <>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="info@wisetap.co.uk" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            {/*<div className="mb-5">*/}
                            {/*    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone number</label>*/}
                            {/*    <input type="text" id="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your phone number" />*/}
                            {/*</div>*/}
                        </>
                    )}
                    {/* Submit Button */}
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>


        </main>
    );
}
