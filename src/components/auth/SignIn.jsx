import {GoogleButton} from 'react-google-button'
import {userSignIn, userSignOut} from '../../services/firebase.js'
import {useState} from 'react'
import {signInWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth'

{
  /*Signin features a google click login if already logged into google, and a signout*/
}

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth()

  const SignIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        console.log(error)
        console.log(error.message)
      })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties

      const uid = user.uid
      // ...
    } else {
      // User is signed out
    }
  })

  function userStatus() {}

  function handlePasswordReset() {
    const email = prompt('Please enter your email')
    sendPasswordResetEmail(auth, email)
    alert('Email Sent! Check you Inbox.')
  }

  return (
    <div className="flex min-h-screen flex-col items-center" style={{backgroundColor: '#003153'}}>
      <div>
        <h1 className="py-8 text-center text-3xl font-bold" style={{color: '#FFFFFF'}}>
          Admin Sign In
        </h1>
        <form onSubmit={SignIn}>
          <div>
            <div className="flex w-full flex-col">
              <label
                htmlFor="email"
                className="text-neutral-600"
                style={{
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                Email Address
              </label>
              <input
                className="rounded-lg h-12 border-slate-200 bg-neutral-100 p-2 shadow"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="flex w-full flex-col">
              <label
                htmlFor="email"
                className="text-neutral-600"
                style={{
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                Password
              </label>
              <input
                className="rounded-lg h-12 border-slate-300 bg-neutral-100 p-2 shadow"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <button className="rounded-lg w-full bg-neutral-800 py-1 text-lg font-light text-neutral-300" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <p
        onClick={handlePasswordReset}
        className="forgot-password"
        style={{
          fontWeight: 'bold',
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Forgot Password?
      </p>

      {/*allow google account log in*/}
      <GoogleButton
        onClick={() => {
          userSignIn()
        }}
      />

      <button
        onClick={() => {
          userSignOut()
        }}
      >
        Sign Out
      </button>
    </div>
  )
}
/*
//const signInButton = document.getElementById("signInButton")
//const signOutButton = document.getElementById("signOutButton")


signInButton.addEventListener('click', userSignIn)
signOutButton.addEventListener('click',userSignOut)
/*/
export default SignIn
