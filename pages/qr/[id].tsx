import { useRouter } from 'next/router';
import {useEffect, useState} from "react";
import NotRegisteredComponent from "../../components/NotRegisteredComponent";
import CodeNotFoundComponent from "@/components/CodeNotFoundComponent";

const RedirectPage = () => {
    const router = useRouter();
    const [registered, setRegistered] = useState(true)
    const [codeNotFound, setCodeNotFound] = useState(false)

    const handleRedirectRegister = () => {
        setRegistered(true)
    }

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            const res = await fetch(`/api/get-redirect-url?code=${router.query.id}`);
            if (res.status === 200) {
                const { redirectUrl, registered } = await res.json();
                if(registered) {
                    setRegistered(true)
                    window.location.href = redirectUrl
                }
                else {
                    setRegistered(false)
                }
            } else {
                setCodeNotFound(true)
                console.error('Failed to retrieve redirect URL');
            }
        };

        if (router.isReady) {
            fetchRedirectUrl();
        }
    }, [router.isReady, registered]);

    if(codeNotFound) {
        return <CodeNotFoundComponent/>
    }
    else if(!registered) {
        return <NotRegisteredComponent id={router.query.id} callHandleRedirectRegister={handleRedirectRegister}/>;
    }
    // return <p>Redirecting...</p>;
};

export default RedirectPage;
