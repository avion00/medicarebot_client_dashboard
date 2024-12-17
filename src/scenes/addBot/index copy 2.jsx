import React, { useState } from "react";
import { Box, Button, Typography, IconButton, TextField } from "@mui/material";

const steps = [
  { id: 1, label: "Step 1", content: "Please fill out the form" },
  { id: 2, label: "Step 2", content: "Provide additional details" },
  { id: 3, label: "Step 3", content: "Upload images", inputType: "image" },
  { id: 4, label: "Step 4", content: "Upload sound", inputType: "audio" },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Inputs (Multiple fields)
  const [formDataStep1, setFormDataStep1] = useState({
    textInput: "",
    textArea: "",
    numberInput: "",
    imageInput: null,
  });

  // Step 2 Inputs (Multiple fields)
  const [formDataStep2, setFormDataStep2] = useState({
    additionalText: "",
    additionalNumber: "",
    additionalCheckbox: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic
    alert("Form Submitted!");
    console.log({ formDataStep1, formDataStep2 });
  };

  // Handling changes in Step 1
  const handleChangeStep1 = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormDataStep1((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files : type === "checkbox" ? checked : value,
    }));
  };

  // Handling changes in Step 2
  const handleChangeStep2 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataStep2((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" p={4}>
      {/* Timeline */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        {steps.map((step) => (
          <Box key={step.id} textAlign="center">
            <IconButton
              size="large"
              style={{
                backgroundColor:
                  currentStep === step.id ? "#1976d2" : "#e0e0e0",
                color: currentStep === step.id ? "#fff" : "#000",
              }}
              onClick={() => setCurrentStep(step.id)}
            >
              {step.id}
            </IconButton>
            {step.id < steps.length && (
              <Box
                sx={{
                  width: "50px",
                  height: "4px",
                  backgroundColor:
                    currentStep >= step.id ? "#1976d2" : "#e0e0e0",
                  margin: "auto",
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Step Content */}
      <Box
        mt={4}
        p={4}
        width="100%"
        maxWidth="500px"
        textAlign="center"
        border="1px solid green"
        borderRadius="8px"
      >
        <Typography variant="h6">{steps[currentStep - 1].label}</Typography>

        {/* Conditional content based on step */}
        {currentStep === 1 && (
          <Box>
            <TextField
              label="Text Input"
              variant="outlined"
              fullWidth
              name="textInput"
              value={formDataStep1.textInput}
              onChange={handleChangeStep1}
              margin="normal"
            />

            <TextField
              label="Text Area"
              variant="outlined"
              fullWidth
              name="textArea"
              value={formDataStep1.textArea}
              onChange={handleChangeStep1}
              margin="normal"
              multiline
              rows={4}
            />

            <TextField
              label="Number Input"
              variant="outlined"
              type="number"
              fullWidth
              name="numberInput"
              value={formDataStep1.numberInput}
              onChange={handleChangeStep1}
              margin="normal"
            />

            <Box mt={2}>
              <Typography>Upload Image</Typography>
              <input
                type="file"
                name="imageInput"
                accept="image/*"
                onChange={handleChangeStep1}
              />
              {formDataStep1.imageInput && (
                <Box mt={2}>
                  <img
                    src={URL.createObjectURL(formDataStep1.imageInput[0])}
                    alt="uploaded"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}

        {currentStep === 2 && (
          <Box>
            <TextField
              label="Additional Text"
              variant="outlined"
              fullWidth
              name="additionalText"
              value={formDataStep2.additionalText}
              onChange={handleChangeStep2}
              margin="normal"
            />

            <TextField
              label="Additional Number"
              variant="outlined"
              type="number"
              fullWidth
              name="additionalNumber"
              value={formDataStep2.additionalNumber}
              onChange={handleChangeStep2}
              margin="normal"
            />

            <Box mt={2}>
              <Typography>Additional Checkbox</Typography>
              <input
                type="checkbox"
                name="additionalCheckbox"
                checked={formDataStep2.additionalCheckbox}
                onChange={handleChangeStep2}
              />
            </Box>
          </Box>
        )}

        {currentStep === 3 && (
          <Box>
            <Typography variant="body1" mb={2}>
              Select up to 3 images
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleChangeStep1}
            />
            {formDataStep1.imageInput && (
              <Box mt={2} display="flex" gap={2}>
                {Array.from(formDataStep1.imageInput).map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`image-${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}

        {currentStep === 4 && (
          <Box>
            <Typography variant="body1" mb={2}>
              Upload an audio file
            </Typography>
            <input type="file" accept="audio/*" onChange={handleChangeStep1} />
            {formDataStep1.imageInput && (
              <Box mt={2}>
                <audio controls>
                  <source
                    src={URL.createObjectURL(formDataStep1.imageInput[0])}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box mt={4} display="flex" gap={2}>
        {currentStep > 1 && (
          <Button variant="contained" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === steps.length && (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
