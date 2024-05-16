"use client";

import React from 'react';
import { signOut } from 'next-auth/react';

export default function Signoutbtn() {
    return (
        <button className="bg-green-600 text-white px-6 py-2 rounded-full"
            onClick={() => signOut()}>
            Sign Out
        </button>
    )
}
