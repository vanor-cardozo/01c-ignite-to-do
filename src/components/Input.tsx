import React from 'react';

import styles from './Input.module.css';

import {v4 as uuidv4} from 'uuid';
import { TaskList } from './TaskList';

export function Input() {
    const [tasks, setTasks] = React.useState([]);
    const [newTask, setNewTask] = React.useState({id: uuidv4(), name: '', done: false});

    const handleCreateTask = (e) => {
        e.preventDefault()
        setTasks([...tasks, newTask]);
        setNewTask({id: uuidv4(), name: '', done: false})
    }

    const handleChangeTask = (e) => {
        setNewTask({...newTask, name: e.target.value})
    }

    const handleStatusDone = (e) => {
        const taskIndex = tasks.findIndex((task) => {
            return task.id === e.target.id
        });
        const tempTasks = [...tasks];
        tempTasks[taskIndex].done = !tempTasks[taskIndex].done;
        setTasks(tempTasks)
    }

    const handleDelete = (taskId) => {
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
                    <button disabled>Criar</button>
                }
            </form>
            <div>
                <div>
                    <div>
                        <strong>Tarefas criadas</strong>
                        <p>{countTasks()}</p>
                    </div>
                    <div>
                        <strong>Concluídas</strong>
                        <p>{countTasksDone()} de {countTasks()}</p>
                    </div>
                </div>
                {tasks.map((task)=> (
                    <div key={task.id} className={styles.taskListItem}>
                        <>
                            <input
                                type="checkbox"
                                id={task.id}
                                name={task.name}
                                onClick={handleStatusDone}
                            />
                            <label htmlFor={task.id}>{task.name}</label>
                        </>

                    <button onClick={()=> handleDelete(task.id)}>deletar</button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
