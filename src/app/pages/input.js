"use client";
import { useState } from "react";
import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Alert } from "@mui/material";
import { Save } from "../../../actions/inputFormController";
import { getCookie } from 'cookies-next'; 

export default function InputFormNew() {
  const [formState, setFormState] = useState({
    phoneNumber: "",
    price: "",
    model: "",
    pictures: [],
    numPictures: 1, // Default to 1 picture
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).slice(0, formState.numPictures);
    setFormState((prevState) => ({
      ...prevState,
      pictures: files.map(file => file.name), 
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = getCookie("vehicle"); 

    const response = await Save(formState, token);

    if (response.success) {
      setSuccessMessage("Data submitted successfully!");
      setFormErrors({});
      setFormState({
        phoneNumber: "",
        price: "",
        model: "",
        pictures: [],
        numPictures: 1,
      });
    } else {
      setFormErrors(response.errors);
      setSuccessMessage("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p10">
        <p className="text-black-500"><strong>Add Master Data</strong></p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              required
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              type="text"
              value={formState.phoneNumber}
              onChange={handleChange}
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="price"
              label="Price"
              name="price"
              type="number"
              value={formState.price}
              onChange={handleChange}
              error={!!formErrors.price}
              helperText={formErrors.price}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="model"
              label="Model"
              name="model"
              type="text"
              value={formState.model}
              onChange={handleChange}
              error={!!formErrors.model}
              helperText={formErrors.model}
            />
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="numPictures-label">Number of Pictures</InputLabel>
              <Select
                labelId="numPictures-label"
                id="numPictures"
                name="numPictures"
                value={formState.numPictures}
                label="Number of Pictures"
                onChange={(e) => setFormState((prevState) => ({
                  ...prevState,
                  numPictures: e.target.value,
                  pictures: [], 
                }))}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={formState.numPictures <= 0}
            />
            {formErrors.pictures && (
              <Alert severity="error">{formErrors.pictures}</Alert>
            )}
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {formErrors.token && <Alert severity="error">{formErrors.token}</Alert>}
          {formErrors.user && <Alert severity="error">{formErrors.user}</Alert>}
        </form>
      </div>
    </main>
  );
}
