import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignIn from "./components/registration/registrationForm";
import App from "./App";
import { ChatComponent } from "./ChatComponent";
import ProtectedRoute from "./routing/ProtectedRoute";
import UserInfoPage from "./components/UserInfo/userInfo";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "auth",
        element: <SignIn />,
      },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ChatComponent />
          </ProtectedRoute>
        ),
      },
      {
        path: "userinfo",
        element: <UserInfoPage />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
