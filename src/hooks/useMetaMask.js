import React, { useContext } from 'react'

export const MetaMaskContext = React.createContext(null)

export default function useMetaMask() {

    const context = useContext(MetaMaskContext)

    return context

}