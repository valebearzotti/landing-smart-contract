import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from '../styles/Home.styled'
import * as Styles from '../styles/Dashboard.styled'
import { MetaMaskContext } from '../../hooks/useMetaMask';
import { ethers } from 'ethers';
import circleOne from '../../assets/svg/circledash1.svg'
import circleTwo from '../../assets/svg/circledash2.svg'


function Dashboard() {

    let navigate = useNavigate()

    const [task, setTask] = useState({
        name: '',
        description: ''
    })

    const [editTask, setEditTask] = useState({
        id: null,
        name: '',
        description: ''
    })

    const [tasks, setTasks] = useState([])

    const { account, contract } = useContext(MetaMaskContext)

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(()=>{
        if (account === null){
            navigate('/')
        }
    }, [])

    const createTask = async () => {
        let creation = await contract.createTask(task.name, task.description)
        eventHandler("NewTask")
    }

    const getTasks = async () => {
        let tasksResult = await contract.getTasks()
        let clean = []
        // I do this in order not to get empty values due to deletion :/
        tasksResult.map((t, i)=>{
            if(t.name.length != 0) {
                clean.push(t)
            }
        })
        setTasks(clean)
    }

    const updateTask = async () => {
        let update = await contract.updateTask(editTask.id, editTask.name, editTask.description)
        eventHandler("TaskUpdated")
    }

    const deleteTask = async (id) => {
        // delete a assigns the initial value for the type to a. I.e. for integers it is equivalent to a = 0, but it can also be used on arrays, where it assigns a dynamic array of length zero or a static array of the same length with all elements set to their initial value. delete a[x] deletes the item at index x of the array and leaves all other elements and the length of the array untouched. This especially means that it leaves a gap in the array. If you plan to remove items, a mapping is probably a better choice.
        // doesn't delete the item but resets its values
        let deletion = await contract.deleteTask(id)
        eventHandler("TaskDeleted")
        
    }

    const toggleTask = async (id) => {
        let toggle = await contract.completeTask(id)
        eventHandler("NewTaskStatus")
    }

    const eventHandler = (event) => {
        contract.on(event, () => {
            getTasks()
        })
    }

    const setEdit = (t) => {
        let edit = {
            id: ethers.BigNumber.from(t.id).toNumber(),
            name: t.name,
            description: t.description
        }
        console.log(edit)
        setEditTask(edit)
    }

    return (
        <div>
            <GlobalStyle />
            <Styles.Container>
                <Styles.CircleOne>
                    <img src={circleOne} alt="" />
                </Styles.CircleOne>
                <Styles.CircleTwo>
                    <img src={circleTwo} alt="" />
                </Styles.CircleTwo>
                <Styles.Glass>
                    <Styles.Divider>
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
                        <Styles.Title>
                            Edit task
                        </Styles.Title>
                        <Styles.TaskForm>
                            <Styles.Label>ID {editTask.id}</Styles.Label>
                            <Styles.Label>Name</Styles.Label>
                            <Styles.Input value={editTask.name} onChange={(e)=> setEditTask({...editTask, name: e.target.value})}></Styles.Input>
                            <Styles.Label>Description</Styles.Label>
                            <Styles.TextArea value={editTask.description} onChange={(e)=> setEditTask({...editTask, description: e.target.value})}></Styles.TextArea>
                            <Styles.Button onClick={() => updateTask()} disabled={(editTask.id === null) ? true : false}>Save changes</Styles.Button>
                        </Styles.TaskForm>
                        <Styles.Status>
                            {account}
                        </Styles.Status>
                    </Styles.Divider>
                    <Styles.Divider>
                        <Styles.Title>
                            Your tasks
                        </Styles.Title>
                        <Styles.TasksDisplay>
                        {tasks.map((t)=>{
                            return (
                                <Styles.TaskContainer>
                                    <Styles.TaskDisplay completed={t.completed}>
                                        <Styles.Name>
                                            <Styles.Checkbox type="checkbox" onChange={() => toggleTask(t.id)} checked={t.completed}/>{t.name}
                                        </Styles.Name>
                                        <Styles.Description>{t.description}</Styles.Description>
                                    </Styles.TaskDisplay>
                                    <Styles.Button onClick={() => setEdit(t)}>Edit</Styles.Button>
                                    <Styles.Delete onClick={() => deleteTask(t.id)}>Delete task</Styles.Delete>
                                </Styles.TaskContainer>
                            )
                        })}
                        </Styles.TasksDisplay>
                    </Styles.Divider>
                </Styles.Glass>
            </Styles.Container>
        </div>
    )
}

export default Dashboard