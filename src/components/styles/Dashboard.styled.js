import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Glass = styled.div`
    height: 80vh;
    width: 80vw;
    background: rgba( 255, 255, 255, 0.1 );
    box-shadow: 20px 20px 50px 0 rgba( 0, 0, 0, 0.5 );
    backdrop-filter: blur( 5px );
    -webkit-backdrop-filter: blur( 5px );
    border: 1px solid rgba( 255, 255, 255, 0.5 );    
    border-radius: 30px;
    display: flex;
`

export const Divider = styled.div`
    display: flex;
    width: 50%;
    padding: 50px;
    flex-direction: column;
`

export const Button = styled.button`
    margin-left: auto;
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

export const AccountDisplay = styled.div`
    font-weight: 600;
    font-size: 25px;
    color: white;
    margin-bottom: auto;
`

export const Title = styled.div`
    font-weight: 500;
    font-size: 20px;
    color: white;
    margin-bottom: 24px;
    border-bottom: 2px solid #13E8AB;
    padding-bottom: 6px;
    width: fit-content;
`

export const TaskForm = styled.div`
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const Label = styled.label`
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    opacity: 0.6;
    margin-bottom: 10px;
`

export const Input = styled.input`
    color: #fff;
    background: rgba( 255, 255, 255, 0.2 );
    padding: 12px 20px;
    outline: none;
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.2 );
    margin-bottom: 20px;
`

export const TextArea = styled.textarea`
    color: #fff;
    background: rgba( 255, 255, 255, 0.2 );
    padding: 12px 20px;
    outline: none;
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.2 );
    resize: none;
    margin-bottom: 20px;
`

export const TaskContainer = styled.div`
    display: flex;
`

export const Name = styled.div`
    color: white;
    font-size: 14px;
`

export const Description = styled.div`
    color: white;
    font-size: 12px;
`

export const Delete = styled.button`

`