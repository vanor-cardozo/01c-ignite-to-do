import React from 'react';

import styles from './Input.module.css';

import {v4 as uuidv4} from 'uuid';

import {PlusCircle, ClipboardText, Trash} from 'phosphor-react'

interface Task {
    id: string
    name: string
    done: Boolean
}

export function Input() {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [newTask, setNewTask] = React.useState({id: uuidv4(), name: '', done: false});

    const handleCreateTask = (e) => {
        e.preventDefault()
        setTasks([...tasks, newTask]);
        setNewTask({id: uuidv4(), name: '', done: false})
    }

    const handleChangeTask = (e: { target: { value: string; }; }) => {
        setNewTask({...newTask, name: e.target.value})
    }

    const handleStatusDone = (e) => {
        const taskIndex = tasks.findIndex((task) => {
            return task.id === e.target.id
        });
        console.log(taskIndex)
        const tempTasks = [...tasks];
        tempTasks[taskIndex].done = !tempTasks[taskIndex].done;
        setTasks(tempTasks)
    }

    const handleDelete = (taskId: string) => {
        const newListTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newListTasks)
    }

    const countTasks = () => {
        return tasks.length
    }

    const countTasksDone = () => {
        return tasks.filter((task) => task.done === true).length
    }

    return (
        <div className={styles.container}>
            <form>
                <label>
                    <input
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        onChange={handleChangeTask}
                        value={newTask.name}
                    />
                </label>
                {!!newTask.name ?
                    <button type='submit' onClick={handleCreateTask}>Criar</button>
                :
                    <button disabled>Criar <PlusCircle size={24}/> </button>
                }
            </form>

            <div className={styles.container3}>
                <div className={styles.container4}>
                    <strong className={styles.counterBlue}>Tarefas criadas</strong>
                    <strong className={styles.bgCounter}>{countTasks()}</strong>
                </div>
                <div className={styles.container4}>
                    <strong className={styles.counterPurple}>Concluídas</strong>
                    <strong className={styles.bgCounter}>{countTasksDone()} de {countTasks()}</strong>
                </div>
            </div>

            {tasks.length > 0 && tasks.map((task)=> (
                <div key={task.id} className={styles.taskListItem}>
                    <div className={styles.checkAndTextDiv}>
                        <input
                            type="checkbox"
                            id={task.id}
                            name={task.name}
                            onClick={handleStatusDone}
                            className={styles.checkboxRound}
                        />
                        {
                            task.done ? 
                                <p className={styles.taskDone}>{task.name}</p>
                            :
                                <p>{task.name}</p>
                        }
                            
                    </div>
                    <Trash onClick={()=> handleDelete(task.id)} size={26} className={styles.trashIcon}/>
                </div>
            ))}
            {tasks.length === 0 &&
                <div className={styles.emptyInfo}>
                    <ClipboardText size={50} weight="thin"/>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            }
        </div>
    )
}
