"use client";
import { useState } from "react";
import { Button, TextField, Alert } from "@mui/material";
import { login } from "../../actions/controller"; // Import the login function

export default function Home() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the server-side login function with form data
    const { username, password } = formState;
    const response = await login(username, password);

    if (response.success) {
      alert('work')
      // If login is successful, set the user state
      setUser({ name: username });
    } else {
      // If there are errors, set form errors state
      setFormErrors(response.errors);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p10">
        {user ? (
          <p>Welcome, {user.name}!</p>
        ) : (
          <>
            <p className="text-black-500">
              <strong>Login</strong>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <p className="text-blue-300">Username</p>
                <TextField
                  required
                  id="outlined-username"
                  label="Username"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <Alert variant="filled" severity="error">
                    {formErrors.username}
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <p className="text-blue-300">Password</p>
                <TextField
                  required
                  id="outlined-password"
                  label="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <Alert variant="filled" severity="error">
                    {formErrors.password}
                  </Alert>
                )}
              </div>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
