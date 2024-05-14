"use client";


import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for HTTP requests
import LoadingSpinner from "./Loader";

const LoadingProviders = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use((config) => {
            setLoading(true);
            return config;
        });

        const responseInterceptor = axios.interceptors.response.use((response) => {
            setLoading(false);
            return response;
        }, (error) => {
            setLoading(false);
            throw error;
        });

        // Clean up interceptors when component unmounts
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Empty dependency array to run this effect only once on component mount

    return (
        <>
            {loading && <LoadingSpinner />}
            {children}
        </>
    );
};

export default LoadingProviders;

