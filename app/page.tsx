'use client'
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {inputFieldCSS} from "@/components/NotRegisteredComponent";

export default function Home() {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const h = async () => {

  }

  const handleSubmit = async () => {
      const res = await fetch(`/api/get-redirect-url?code=${code}`)
      if (res.status === 200) {
          window.location.href = `/qr/${code}?edit=true`
      }
      else {
          setCodeError(true)
      }
  }

  const handleCodeChange = (val: string) => {
    setCodeError(false);
    setCode(val);
  }

  return (
      <>
          <style>{inputFieldCSS}</style>

          {/* TABLET / DESKTOP*/}
          <div
              className={`hidden md:flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-200 to-slate-100`}>
              <div
                  className={`bg-white p-8 rounded-xl min-w-[480px] md:min-w-[780px] xl:min-w-[1040px] xl:max-w-[1280px]  flex flex-col gap-8`}>
                  <div>
                      <Image src="/wise-tap-rectangle-logo-black-no-padding.svg" alt="WiseTap Logo"
                             className="dark:invert" width={100} height={24} priority/>
                  </div>
                  <div className={`grid grid-cols-2 gap-4`}>
                      <div className={`flex flex-col gap-4 justify-start items-start`}>
                          <h1 className={`text-3xl font-semibold `}>Search by code</h1>
                          <div className={`w-full lg:w-4/6`}>
                              {`Search your WiseTap by code from the email we've sent you. You can update link to your review page at anytime.`}
                          </div>
                      </div>
                      <div className={`flex flex-col justify-center items-start`}>
                          <div className="w-full">
                              <div className="text-field w100p w-full">
                                  <input
                                      className="text-base w100p w-full"
                                      type="text"
                                      required
                                      placeholder=" "
                                      value={code}
                                      onChange={e => handleCodeChange(e.target.value)}
                                  />
                                  <span>WiseTap code</span>
                              </div>
                          </div>
                          {codeError && (
                              <div>
                                  <div
                                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                      role="alert">
                                      <span className="font-medium">{`Something doesn't look right!`}</span> {`We were unable to find the code you entered. Please use the code from the email we've sent.`}
                                  </div>
                              </div>
                          )}
                      </div>
                      <div className={`col-span-2 flex flex-col items-end justify-end`}>

                          <div className={`flex gap-2`}>
                              {/*<button*/}
                              {/*    onClick={(e) => handleSubmit(e)}*/}
                              {/*    className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl`}>Reset*/}
                              {/*</button>*/}
                              <button
                                  onClick={handleSubmit}
                                  className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl`}>Search
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
                      <div className={`flex flex-col gap-4`}>
                          <h1 className={`text-xl font-semibold`}>Edit Link to Your Review Page</h1>
                          <div className={`flex flex-col`}>
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
                                      value={code}
                                      onChange={e => handleCodeChange(e.target.value)}
                                  />
                                  <span>WiseTap code</span>
                              </div>
                          </div>
                          {codeError && (
                              <div>
                                  <div
                                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                      role="alert">
                                      <span className="font-medium">{`Something doesn't look right!`}</span> {`We were unable to find the code you entered. Please use the code from the email we've sent.`}
                                  </div>
                              </div>
                          )}
                      </div>
                      <div>
                          <button
                              onClick={handleSubmit}
                              className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl`}>Search
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
  );
}
