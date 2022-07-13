import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import RuPaul from '../../pages/Landing/RuPaul.png'
import styles from './Login.module.css'

const LoginPage = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <h3 className='title'>Log In</h3>
      <p>{message}</p>
      <LoginForm
        handleSignupOrLogin={props.handleSignupOrLogin}
        updateMessage={updateMessage}
      />
    </main>
  )
}

export default LoginPage
