import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { store } from '@/redux/store'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    const [Mode, setMode] = useState(null)

    useEffect(() => {
        const mode = localStorage.getItem("mode")
        if (!mode) {
            setMode(true)
        }
        else {
            setMode(JSON.parse(mode))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(Mode))
    }, [Mode])

    function getLibrary(provider) {
        return new Web3(provider);
    }

    return (
        <Provider store={store}>
            <Web3ReactProvider getLibrary={getLibrary} >
                <main className={Mode ? "dark" : ""} >
                    <Head>
                        <title>Stability</title>
                        <meta name="description" content="Profit generating DeFi protocol" />
                        <link rel="icon" href="/logo_256.png" />
                    </Head>
                    <Navbar Mode={mode => setMode(mode)} />
                    {children}
                    <Footer />
                </main>
            </Web3ReactProvider>
        </Provider>
    )
}

export default Layout
