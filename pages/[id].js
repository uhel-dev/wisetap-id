import { useRouter } from 'next/router';
import {useEffect} from "react";

const RedirectPage = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            const res = await fetch(`/api/get-redirect-url?id=${router.query.id}`);
            if (res.status === 200) {
                window.location.href = await res.json();
            } else {
                console.error('Failed to retrieve redirect URL');
            }
        };

        if (router.isReady) {
            fetchRedirectUrl();
        }
    }, [router.isReady, router.query.id]);

    // Optionally add loading UI
    // return <p>Redirecting...</p>;
};

export default RedirectPage;
