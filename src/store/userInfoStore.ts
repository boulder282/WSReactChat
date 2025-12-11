import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  name: z.string(),
  bio: z.string(),
  age: z.number(),
});

type UserInfo = z.infer<typeof registerSchema>;

interface UserInfoState {
  info: Partial<UserInfo>; // Use Partial since email and password might be empty initially
  setInfo: (newInfo: Partial<UserInfo>) => void;
  clearInfo: () => void;
}

const useUserInfoStore = create<UserInfoState>()(
  persist(
    (set) => ({
      info: {
        name: "",
        bio: "",
        age: 0,
        email: "",
        password: "",
      },

      setInfo: (newInfo) =>
        set((state) => ({
          info: { ...state.info, ...newInfo },
        })),

      clearInfo: () =>
        set(() => ({
          info: {
            name: "",
            bio: "",
            age: 0,
            email: "",
            password: "",
          },
        })),
    }),
    {
      name: "userinfo",
    }
  )
);

export default useUserInfoStore;
