import React from 'react'
import { app } from '../firebase/firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc'
function Login({ setAuth }) {
  const fireauth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  //authentication
  const loogin = async () => {
    await signInWithPopup(fireauth, provider).then((user) => {
      if (user) {
        console.log("login hogaya");
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        fireauth.onAuthStateChanged((user) => {
          if (user) {
            navigate('/Home', { replace: true });
          }
          else {
            navigate("/login")
          }


        })

      }
    })

  }
  useEffect(() => {
    if (window.localStorage.getItem("auth") == "true") {
      navigate("/", { replace: true })
    }

  }, [])

  return (
    <div class="relative w-screen h-screen">
      <video src='./Water.mp4'
        autoPlay
        muted
        loop
        className='w-full h-full object-cover'

      />
      {/* Login With Google */}
      <div>

        <div class="absolute inset-0 flex  flex-col items-center justify-center sm:flex-1  h-screen">
          <h1 class="text-black animate-bounce animation-duration-[1s] animation-iteration-count-1 text-3xl font-serif">News App Login Please!!</h1>
          <div class="p-4 bg-slate-300 px-7 cursor-pointer rounded-md">
            <div class="bg-slate-400 p-3 rounded-md flex items-center justify-center gap-2 " onClick={loogin}>
              <FcGoogle className='text-xl' />
              Signin with google
            </div>
          </div>
        </div>

      </div>



    </div>
  )
}
export default Login