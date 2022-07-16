import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #161623;
    }

    *, body, html {
        font-family: 'Poppins', sans-serif;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #161623;
`

export const CircleOne = styled.div`
    img{
        position: absolute;
        top: 50%;
        left: 60%;
        width: 200px;
    }
    @media (max-width: 1048px){
        img{
            left: 70%;
            top: 60%;
        }
    }
    @media (max-width: 768px){
        img{
            left: auto;
            right: 10px;
            width: 150px;
        }
    }
`

export const CircleTwo = styled.div`
    img{
        position: absolute;
        top: 8%;
        left: 23%;
        width: 350px;
    }
    @media (max-width: 768px){
        img{
            top: 20px;
            left: -50px;
            width: 250px;
        }
    }
`

export const Center = styled.div`
    width: 550px;
    height: 100vh;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px){
        width: 450px;
    }
`

export const Divider = styled.div`
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: auto;
    margin-bottom: auto;
    background: rgba( 255, 255, 255, 0.1 );
    box-shadow: 20px 20px 50px 0 rgba( 0, 0, 0, 0.5 );
    backdrop-filter: blur( 5px );
    -webkit-backdrop-filter: blur( 5px );
    border: 1px solid rgba( 255, 255, 255, 0.5 );    
    border-radius: 30px;
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 40px;
`

export const Button = styled.button`
    margin: 0px auto;
    outline: none;
    color: #161623;
    padding: 12px 26px;
    border: 0px;
    border-radius: 30px;
    font-weight: 600;
    background-color: #13E8AB;
    cursor: pointer;
    transition: .2s all ease-in-out;
    font-size: 16px;
    &:hover {
        background-color: #08bf8b;
    }
`

export const Title = styled.div`
    font-size: 26px;
    font-weight: 500;
    color: #fff;
    margin: 0px auto;
    text-align: center;
`

export const Subtitle = styled.div`
    margin: 0px auto;
    font-size: 14px;
    color: #fff;
    opacity: 0.6;
    span {
        cursor: pointer;
    }
`

export const Link = styled.a`
    text-decoration: none;
    cursor: pointer;
    color: #13E8AB;
`