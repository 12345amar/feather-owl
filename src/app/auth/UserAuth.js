'use client';
import React, { useEffect } from 'react'
import { login } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname  } from 'next/navigation'
import { decryptToken, encryptKey } from '@/utils/constants';


const UserAuth = () => {
    const { loading, user, error = '' } = useSelector((state) => state.auth)
    const router = useRouter();
    const userPath = usePathname()
    const dispatch = useDispatch()

    useEffect(() => {
        const byPassAuth = ['/login', '/signup', 'developerLogin']
        if (byPassAuth.includes(userPath)) {
            router.push(userPath) 
        }
        if (!userPath && (!loading && !user || !user?.error?.message)) {
            const ecryptedAccessToken = sessionStorage.getItem('afo')
            if (ecryptedAccessToken) {
                const accessToken = decryptToken(ecryptedAccessToken, encryptKey.LOGIN_SECRET)
                dispatch(login({ accessToken, isDeveloper: true, isAuthCheck: true }))
            }
            router.push("/login") 
        }
    }, [userPath])
    
}

export default UserAuth