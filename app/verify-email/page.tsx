'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/utils/constant';
import LoadingSpinner from '@/components/Loader';

const VerifyEmailPage = () => {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const token = searchParams.get('token')
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

    useEffect(() => {

        const verifyEmail = async () => {
            try {
                setIsLoading(true)
                if (typeof token === 'string') {
                    const response = await fetch(`/api/verify-email?token=${token}`);
                    if (response.ok) {
                        setVerificationStatus('success');
                    } else {
                        setVerificationStatus('failure');
                    }
                } else {
                    setVerificationStatus('error');
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerificationStatus('error');
            } finally {
                setIsLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    if (verificationStatus === 'success') {
        setTimeout(() => {
            router.push(ROUTES.LOGIN)
        }, 3000);
    }

    return (
        <>
            {isLoading && <LoadingSpinner message='Verifying Email...' />}
            <div className='text-center '>
                {verificationStatus === 'success' && <p>Email verified successfully!</p>}
                {verificationStatus === 'failure' && <p>Failed to verify email. Please try again later.</p>}
                {verificationStatus === 'error' && <p>An error occurred while verifying email. Please try again later.</p>}
            </div>
        </>
    );
};

export default VerifyEmailPage;
