import { Button } from "../../../shared/components/ui/button/Button";
import Input from "../../../shared/components/ui/input/Input";

type Props = {
  handleSubmit: (e: React.FormEvent) => void;

  usernameValue: string;
  setUsernameValue: (value: string) => void;
  isUsernameValid: boolean;

  emailValue: string;
  setEmailValue: (value: string) => void;
  emailError: boolean;
  emailErrorMessage?: string;

  passwordValue: string;
  setPasswordValue: (value: string) => void;
  passwordError: boolean;
  passwordErrorMessage?: string;
};

export function SignInMain({
  handleSubmit,
  usernameValue,
  setUsernameValue,
  emailValue,
  setEmailValue,
  emailErrorMessage,
  passwordValue,
  setPasswordValue,
  passwordErrorMessage,
  isUsernameValid,
  emailError,
  passwordError,
}: Props) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-5xl">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              value={usernameValue}
              onChange={setUsernameValue}
              placeholder="Username"
              variant={!isUsernameValid && usernameValue ? "error" : "default"}
            />

            <Input
              value={emailValue}
              onChange={setEmailValue}
              placeholder="Email"
              variant={emailError ? "error" : "default"}
            />

            {emailErrorMessage && <p>{emailErrorMessage}</p>}

            <Input
              value={passwordValue}
              onChange={setPasswordValue}
              placeholder="Password"
              variant={passwordError ? "error" : "default"}
            />
            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}

            <Button variant="blue" fullWidth>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
