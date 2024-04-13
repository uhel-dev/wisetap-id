import '../app/globals.css';
import Image from "next/image";
import { useRef, useState } from "react";

export default function CodeNotFoundComponent() {
    const [registerUser, setRegisterUser] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                {/* Header Text */}
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Code does not exist in our database.
                </p>
                {/* Logo Link */}
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                    <a className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0" href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
                        <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo" className="dark:invert" width={100} height={24} priority />
                    </a>
                </div>
            </div>
        </main>
    );
}
