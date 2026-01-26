import { useState } from "react";
import { useNavigate } from "react-router";
import useUserInfoStore from "@/store/userInfoStore";
import { useFormValidation } from "@/hooks/useFormValidation";
import { API_REGISTER } from "@/shared/api/endpoints";
import { SignInHeader } from "./components/SignInHeader";
import { SignInMain } from "./components/SignInMain";

export default function SignIn() {
  const { setInfo } = useUserInfoStore();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");

  const navigate = useNavigate();

  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateForm,
  } = useFormValidation();

  const isUsernameValid = usernameValue.length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(emailValue, passwordValue);
    if (!validation.isValid) return;

    try {
      const res = await fetch(API_REGISTER, {
        // вынес в константу shared/api/endpoints.ts
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          username: usernameValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      setInfo({ name: usernameValue });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
      <div className="relative z-10 min-h-screen flex flex-col">
        <SignInHeader />

        <SignInMain
          handleSubmit={handleSubmit}
          usernameValue={usernameValue}
          setUsernameValue={setUsernameValue}
          isUsernameValid={isUsernameValid}
          emailValue={emailValue}
          setEmailValue={setEmailValue}
          emailError={emailError}
          emailErrorMessage={emailErrorMessage}
          passwordValue={passwordValue}
          setPasswordValue={setPasswordValue}
          passwordError={passwordError}
          passwordErrorMessage={passwordErrorMessage}
        />
      </div>
    </div>
  );
}
