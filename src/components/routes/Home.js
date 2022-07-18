import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Styles from '../styles/Home.styled'
import circleOne from '../../assets/svg/circleone.svg'
import circleTwo from '../../assets/svg/circletwo.svg'
import { MetaMaskContext } from '../../hooks/useMetaMask';

function Home() {

  const { walletConnection, account } = useContext(MetaMaskContext)


  const [buttonText, setButtonText] = useState("Connect your wallet")
  const [subtitle, setSubtitle] = useState("")

  let navigate = useNavigate()

  const redirect = () => {
    setSubtitle("Redirecting...")
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000);
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

  useEffect(() => {
    if(!window.ethereum){
      setButtonText("MetaMask not found")
    }
  }, [])

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
                  <Styles.Button onClick={connect} disabled={(!window.ethereum) ? true : false}>{buttonText}</Styles.Button>
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