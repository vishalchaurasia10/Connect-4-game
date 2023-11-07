'use client'
import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import { toast, Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const AuthState = (props) => {

    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    const register = async (credentials) => {
        console.log('register', credentials);
        setUser({
            name: credentials.name,
            email: credentials.email,
        });
        toast.success('Registered successfully');
        router.push('/');
    }

    useEffect(() => {
        if (!user) {
            router.push('/auth')
        }
    }, [pathname])

    return (
        <>
            <Toaster />
            <AuthContext.Provider
                value={{
                    user,
                    setUser,
                    register
                }}
            >
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState;