"use client"
import { useFormState, useFormStatus} from "react-dom"
import {Button, TextField} from '@mui/material';
import Link from 'next/link';
import { login } from '../../actions/controller';
export default function Home() {
  const [formState, formAction] = useFormState(login,{})
  console.log(formState)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p10">
        <p className="text-black-500"><strong>Login</strong></p>
        <form action={formAction}>
        <p className="text-blue-300">Username</p>
        <TextField
          required
          id="outlined-required"
          label="Required"
        />
        <p className="text-blue-300">Password</p>
        <TextField
          id="outlined-Password"
          label="Password"
        />
        <Button variant="contained">Login</Button>
        </form>
      </div>
    </main>
  )
}
