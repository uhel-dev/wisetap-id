import Link from "next/link";

export default function FooterLinks() {
    return (
        <>
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
        </>
    )
}