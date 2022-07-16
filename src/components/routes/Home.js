import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { abi } from '../../network/sc-abi';
import * as Styles from '../styles/Home.styled'
import circleOne from '../../assets/svg/circleone.svg'
import circleTwo from '../../assets/svg/circletwo.svg'
import { MetaMaskContext } from '../../hooks/useMetaMask';

function Home() {



  const { walletConnection, account, checkConnection } = useContext(MetaMaskContext)

  const contractAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'

  //const [account, setAccount] = useState(null)



  const [buttonText, setButtonText] = useState("Connect your wallet")
  const [subtitle, setSubtitle] = useState("")

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)



  /*const walletConnection = () => {
    setText("Connecting...")
    if (window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        setText("Wallet connected!")
        setAccount(result[0])
        redirect()
        updateEthers()
      })
    } else {
        setSubtitle("You need to enable MetaMask.")
    }
  }*/

  let navigate = useNavigate()

  const redirect = () => {
    setSubtitle("Redirecting...")
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000);
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(contractAddress, abi, tempSigner)
    setContract(tempContract)
  }

  const connect = () => {
    setButtonText("Connecting...")
    walletConnection()
  }

  useEffect(() => {
    if(account !== null && account !== ""){
      setButtonText("Wallet connected!")
      redirect()
    } else {
      setButtonText("Connect your wallet")
    }
  }, [account])

  return (
    <div>
      <Styles.GlobalStyle />
      <Styles.Center>
          <Styles.CircleOne>
              <img src={circleOne} alt="" />
          </Styles.CircleOne>
          <Styles.CircleTwo>
              <img src={circleTwo} alt="" />
          </Styles.CircleTwo>
          <Styles.Divider>
              <Styles.Box>
                  <Styles.Title>Let's get started!</Styles.Title>
                  <Styles.Button onClick={connect}>{buttonText}</Styles.Button>
                  {(!window.ethereum)
                  ?
                    <Styles.Subtitle>You need to enable <Styles.Link href="https://metamask.io/" target="_blank">MetaMask</Styles.Link> to continue.</Styles.Subtitle>
                  :
                    <Styles.Subtitle>Great! <Styles.Link href="https://metamask.io/" target="_blank">MetaMask</Styles.Link> is enabled.</Styles.Subtitle>
                  }
                  <Styles.Subtitle>{subtitle}</Styles.Subtitle>
              </Styles.Box>
          </Styles.Divider>
      </Styles.Center>
    </div>
  )
}

export default Home