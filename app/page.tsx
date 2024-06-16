'use client'
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {inputFieldCSS} from "@/components/NotRegisteredComponent";

export default function Home() {
  const [code, setCode] = useState('');

  const h = async () => {
      const res = await fetch(`/api/get-redirect-url?code=${code}`)
      if (res.status === 200) {
          window.location.href = `/qr/${code}?edit=true`
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <style jsx>
        {inputFieldCSS}
      </style>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by entering&nbsp;
          <code className="font-mono font-bold">code</code>
          &nbsp;from the email.
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
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

        <div className={`flex flex-col justify-center items-center gap-4`}>
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/wise-tap-rectangle-logo-black-no-padding.svg"
                alt="WiseTap Logo"
                width={240}
                height={60}
                priority
            />
            <div className="flex items-center gap-2 min-w-[480px]">
                <div className="text-field w100p w-full">
                    <input
                        className="text-base w100p w-full"
                        type="text"
                        required
                        placeholder=" "
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <span>WiseTap code</span>
                </div>
                <button onClick={h} className={`px-4 py-2 text-white rounded-[4px] bg-blue-600 hover:bg-blue-700 h-[48px] flex items-center`}>
                    Search
                </button>
            </div>
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        </div>
    </main>
  );
}
