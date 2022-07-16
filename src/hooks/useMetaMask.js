import React, { createContext, useContext, useMemo, useState } from 'react'
import { ethers } from "ethers";
import { abi } from '../network/sc-abi';

export const MetaMaskContext = React.createContext(null)

export const MetaMaskProvider = ({components}) => {

    const contractAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'

    const [account, setAccount] = useState(null)
  
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    const checkConnection = async () => {
        console.log(window.ethereum.isConnected())
    }

    const walletConnection = async () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                setAccount(result[0])
                console.log(result)
                update()
            })
        } else {
            console.log('couldnt connect')
        }
    }

    const update = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider)
    
        let tempSigner = tempProvider.getSigner()
        setSigner(tempSigner)
    
        let tempContract = new ethers.Contract(contractAddress, abi, tempSigner)
        setContract(tempContract)
    }

    const values = useMemo(
        () => ({
            walletConnection,
            account,
        }),
        [account]
    )

    return <MetaMaskContext.Provider value={values}>{components}</MetaMaskContext.Provider>

}

export default function useMetaMask() {

    const context = useContext(MetaMaskContext)

    return context

}