import { z } from "zod";
import { useState } from "react";
import { registerSchema } from "../store/userInfoStore";

export function useFormValidation() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const validateForm = (emailValue: string, passwordValue: string) => {
    const formData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      // Use pick to only validate email and password
      const result = registerSchema
        .pick({ email: true, password: true })
        .parse(formData);
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");
      return { isValid: true, data: result };
    } catch (error) {
      // Reset errors first
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");

      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          if (err.path[0] === "email") {
            setEmailError(true);
            setEmailErrorMessage(err.message);
          }
          if (err.path[0] === "password") {
            setPasswordError(true);
            setPasswordErrorMessage(err.message);
          }
        });
      }
      return { isValid: false, data: null };
    }
  };

  return {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateForm,
  };
}
