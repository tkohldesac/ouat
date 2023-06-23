import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axiosConfig from "../helpers/axiosConfig";

const defaultUserContext = {
    User: null,
    onSuccess: () => { },
    logout: () => { },
}

export const userContext = createContext(defaultUserContext);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const username = Cookies.get('MegaLoMartUser');
        setUser(username ?? null);
        const id = Cookies.get('userIdCookie');
        setUserId(id ?? null);
    }, []);


    const logout = async () => {
        await axiosConfig.get('/logout');
        googleLogout();
        setUser(null);
    }

    const onSuccess = async (googleResponse) => {
        const x = await axiosConfig.post('/login', { credential: googleResponse.credential })
        const username = Cookies.get('MegaLoMartUser');
        setUser(username ?? null);
    }



    const value = {
        user,
        userId,
        onSuccess,

        logout
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
}
