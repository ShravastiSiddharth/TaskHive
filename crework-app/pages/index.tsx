import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

    return <div>Loading...</div>;
};

export default Home;
