import React, { useState, useEffect, useContext } from 'react'
import { GlobalStyle } from '../styles/Home.styled'
import * as Styles from '../styles/Dashboard.styled'
import { MetaMaskContext } from '../../hooks/useMetaMask';

function Dashboard() {

    const [task, setTask] = useState({
        name: '',
        description: ''
    })


    const [txs, setTxs] = useState([])

    const [tasks, setTasks] = useState([])

    const [currentTask, setCurrentTask] = useState(null)

    const { walletConnection, account, contract } = useContext(MetaMaskContext)


    const createTask = async () => {
        let tx = await contract.createTask(task.name, task.description)
        setCurrentTask(tx)
        setTasks([...tasks, tx])
    }

    const getTasks = async () => {
        let tasks = await contract.getTasks()
        setTasks(tasks)
        console.log(tasks)
    }

    const deleteTask = async (id) => {
        let deletion = await contract.deleteTask(id)
        console.log(deletion)
    }


    return (
        <div>
            <GlobalStyle />
            <Styles.Container>
                <Styles.Glass>
                    <Styles.Divider>
                        <Styles.Title>
                            Your address
                        </Styles.Title>
                        <Styles.AccountDisplay>
                            {account}
                        </Styles.AccountDisplay>
                        <Styles.Title>
                            Add tasks
                        </Styles.Title>
                        <Styles.TaskForm>
                            <Styles.Label>Name</Styles.Label>
                            <Styles.Input onChange={(e)=> setTask({...task, name: e.target.value})}></Styles.Input>
                            <Styles.Label>Description</Styles.Label>
                            <Styles.TextArea onChange={(e)=> setTask({...task, description: e.target.value})}></Styles.TextArea>
                            <Styles.Button onClick={() => createTask()}>Add task</Styles.Button>
                        </Styles.TaskForm>
                    </Styles.Divider>
                    <Styles.Divider>
                        <Styles.Button onClick={() => getTasks()}>Get all</Styles.Button>
                        {tasks.map((t)=>{
                            return (
                                <Styles.TaskContainer>
                                    <div>
                                        <Styles.Name>{t.name}</Styles.Name>
                                        <Styles.Description>{t.description}</Styles.Description>
                                    </div>
                                    <Styles.Delete onClick={() => deleteTask(t.id)}>Delete task</Styles.Delete>
                                </Styles.TaskContainer>
                            )
                        })}
                    </Styles.Divider>
                </Styles.Glass>
            </Styles.Container>
        </div>
    )
}

export default Dashboard