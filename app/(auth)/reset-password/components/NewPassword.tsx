"use client";
import LoadingSpinner from '@/components/Loader';
import { useSession } from "next-auth/react"
import NewPasswordForm from './NewPasswordForm';

export default function NewPassword() {

    const { data: Session } = useSession()

    const userEmail = Session?.user?.email

    return (
        <>
            {
                Session ? <NewPasswordForm userEmail={userEmail} /> : <LoadingSpinner />
            }
        </>
    )
}
