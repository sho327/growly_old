'use client'

// Modules
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderSidebarComponent from '@/components/layout/header/header_sidebar';
// Constants
import AppName from '@/components/constants/AppName';
import PageRoutes from '@/components/constants/PageRoutes';
// Layouts
// Components
// import HeaderBellAnnounceComponent from './header_bell_announce';
// import HeaderMessageAnnounceComponent from './header_message_announce';
// import HeaderUserMenuComponent from './header_user_menu';
// import HeaderSidebarComponent from './header_sidebar';
// PageComponents
// Stores
// import { loginUserInfoStore } from '@/stores/localStorege/loginUserInfo';
// Containers
// Utils


import Link from 'next/link'
import useStore from '@/store'
import Image from 'next/image'
// import { useEffect } from 'react'
// import type { Session } from '@supabase/auth-helpers-nextjs'
// import type { Database } from '@/lib/database.types'
// type ProfileType = Database['public']['Tables']['profiles']['Row']

import { useSidebarStore } from '@/store/utils';

// レイアウト
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    // Constants
    const router = useRouter();
    return (
        <>
            {/* ヘッダー */}
            <header className='l-app-header l-header navbar navbar-dark bg-dark'>
                <Container fluid>
                    {/* アプリ名(ロゴ) */}
                    <Nav.Item className='nav-item d-none d-md-block'>
                        <Nav.Link 
                            href='#' 
                            className='navbar-brand d-flex align-items-center'
                            onClick={(e: any) => {
                                e.preventDefault();
                                router.push(PageRoutes.MAIN.HOME);
                            }}
                            >
                                <strong>{AppName}</strong>
                        </Nav.Link>
                    </Nav.Item>
                </Container>
            </header>
            {children}
        </>
    )
}

export default AuthLayout
