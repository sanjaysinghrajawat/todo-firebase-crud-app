"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuth } from "@/firebase/authContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const SignupForm = () => {

    const router = useRouter();
    const {authUser, setAuthUser} = useAuth();
    useEffect(()=>{
        if(authUser)
        {
            router.push("/");
        }
    },[authUser])

    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const signupHandle = async (e) => {
        e.preventDefault();

        if(!user.name){
            toast.error("Enter Name", {position:"top-center", autoClose:2000});
            return;
        }
        if(!user.email){
            toast.error("Enter Email", {position:"top-center", autoClose:2000});
            return;
        }
        if(!user.password){
            toast.error("Enter Password", {position:"top-center", autoClose:2000});
            return;
        }
        const email = user.email;
        const password = user.password;
        const name = user.name;
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName:name,
            });
            setAuthUser({
                uid:user.uid,
                email:user.email,
                username:name
            })
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    const signinWithGoogle = async () => {
       
        const user = await signInWithPopup(auth, provider);
        console.log(user);
    }

    return (authUser) ? <Loader/> : (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <Link href="/login" className="underline hover:text-blue-400 cursor-pointer">
                            Login
                        </Link>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                    onClick={signinWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>

                    <form onSubmit={signupHandle}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e)=> {
                                    setUser({
                                        ...user,
                                        name:e.target.value,
                                    })
                                }}
                                value={user.name}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e)=> {
                                    setUser({
                                        ...user,
                                        email:e.target.value,
                                    })
                                }}
                                value={user.email}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e)=> {
                                    setUser({
                                        ...user,
                                        password:e.target.value,
                                    })
                                }}
                                value={user.password}
                            />
                        </div>
                        <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default SignupForm;
