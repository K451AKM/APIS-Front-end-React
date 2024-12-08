import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function AuthComponent(props: P) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/login');
            }
        }, [loading, user, router]);

        if (loading) {
            return <div>Cargando...</div>;
        }

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}

