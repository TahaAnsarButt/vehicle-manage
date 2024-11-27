"use client";
import { useState } from "react";
import { Button, TextField, Alert, InputLabel ,MenuItem ,FormControl ,Select, SelectChangeEvent  } from "@mui/material";
import { Save } from "../../../actions/inputFormController"; // Import the login function
import { getUserFromCookie } from "../../../lib/getUser";

export default async function InputFormNew() {
  const user = await getUserFromCookie()
  console.log('user',user)
  //name,model,price,picture
  const [formState, setFormState] = useState({ name: "", model: "",price: "", picture: [] });
  const [formErrors, setFormErrors] = useState({});
  // const [user, setUser] = useState(null);

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
    const { name, model, price, picture} = formState;
    const response = await Save(name, model, price, picture);

    if (response.success) {
      
      // alert('work')
      // If login is successful, set the user state
      // setUser({ name: username });
    } else {
      // If there are errors, set form errors state
      setFormErrors(response.errors);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p10">
        
            <p className="text-black-500">
              <strong>Add Master Data</strong>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <p className="text-blue-300">Name</p>
                <TextField
                  required
                  id="outlined-username"
                  label="Username"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <p className="text-blue-300">Model</p>
                <TextField
                  required
                  id="outlined-password"
                  label="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <p className="text-blue-300">Price</p>
                <TextField
                  required
                  id="outlined-password"
                  label="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <p className="text-blue-300">Picture</p>
                <TextField
                  required
                  id="outlined-password"
                  label="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </form>
      </div>
    </main>
  );
}
