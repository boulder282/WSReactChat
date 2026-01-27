import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import "./index.css";
import { ChatComponent } from "./layout/ChatComponent/ChatComponent";
import SignIn from "./components/registration/registrationForm";

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
        element: <ChatComponent />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
