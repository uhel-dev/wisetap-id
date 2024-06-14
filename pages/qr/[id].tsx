import { useRouter } from 'next/router';
import {useEffect, useState} from "react";
import NotRegisteredComponent from "../../components/NotRegisteredComponent";
import CodeNotFoundComponent from "@/components/CodeNotFoundComponent";
import EditRedirectUrlComponent from "@/components/EditRedirectUrlComponent";

const RedirectPage = () => {
    const router = useRouter();
    const [registered, setRegistered] = useState(true)
    const [codeNotFound, setCodeNotFound] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [redirectUrl, setRedirectUrl] = useState('')

    const handleRedirectRegister = () => {
        setRegistered(true)
    }

    const disableEditMode = (url: string) => {
        setEditMode(false)
        window.location.href = url
    }

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            const res = await fetch(`/api/get-redirect-url?code=${router.query.id}`);

            if (res.status === 200) {
                const { redirectUrl, registered } = await res.json();
                if(router.query.edit && registered) {
                    setEditMode(true)
                    setRedirectUrl(redirectUrl)
                    return;
                }
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

    if(editMode) {
        return <EditRedirectUrlComponent
            id={router.query.id}
            callDisableEditMode={(url: string) => disableEditMode(url)}
            assignedUrl={redirectUrl}
        />
    }
    if(codeNotFound) {
        return <CodeNotFoundComponent/>
    }
    else if(!registered) {
        return <NotRegisteredComponent id={router.query.id} callHandleRedirectRegister={handleRedirectRegister}/>;
    }
    // return <p>Redirecting...</p>;
};

export default RedirectPage;
