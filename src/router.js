import React, { Suspense, useState, useMemo } from 'react'
import { ethers } from "ethers";
import { abi } from './network/sc-abi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MetaMaskContext } from './hooks/useMetaMask';

const Home = React.lazy(() => import('./components/routes/Home'));

function AppRouter() {

    const contractAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'

    const [account, setAccount] = useState(null)

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    const triggerState = () => {
        if (account === null){
            setAccount("")
        }
        if (account === ""){
            setAccount(null)
        }
    }

    const walletConnection = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                setAccount(result[0])
                update()
            }).catch(err => {
                triggerState()
            })
        }
    }

    const update = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider)
    
        // doesnt wait for the state change
        let tempSigner = tempProvider.getSigner()
        setSigner(tempSigner)
    
        let tempContract = new ethers.Contract(contractAddress, abi, tempSigner)
        setContract(tempContract)
    }

    const values = useMemo(
        () => ({
            walletConnection,
            account
        }),
        [account]
    )

    return (
        <Router>
            <Suspense fallback={<div></div>}>
                <MetaMaskContext.Provider value={values}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </MetaMaskContext.Provider>
            </Suspense>
        </Router>
    )
}

export default AppRouter