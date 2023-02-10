import React from 'react'
import styles from './Header.module.css'
import todoLogo from '../assets/Logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="Logotipo ToDo App"/>
        </header>
    )
}
