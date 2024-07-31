// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/login');
    }, [router]);

    return null; // This page does not render any content
};

export default IndexPage;
