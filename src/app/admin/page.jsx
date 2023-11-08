'use client'
import React, { useState } from 'react'
import AdminPanelLogin from '../components/Layout/AdminPanelLogin'
import AdminPanel from '../components/Layout/AdminPanel'
import Head from 'next/head'

const Admin = () => {
    const [admin, setAdmin] = useState(false)
    return (
        <>
            {
                admin ? <AdminPanel /> : <AdminPanelLogin setAdmin={setAdmin} />
            }
        </>
    )
}

export default Admin
