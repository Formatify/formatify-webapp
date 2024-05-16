'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/Loader';
import Success from './components/Success';
import Failure from './components/Failure';
import Error from './components/Error';

const VerifyEmailPage = () => {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
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

    return (
        <>
            {isLoading && <LoadingSpinner message='Verifying Email...' />}
            <div className='text-center '>
                {verificationStatus === 'success' && <Success />}
                {verificationStatus === 'failure' && <Failure />}
                {verificationStatus === 'error' && <Error />}
            </div>
        </>
    );
};

export default VerifyEmailPage;
