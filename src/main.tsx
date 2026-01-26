import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignIn from "./features/auth/SignIn";
import App from "./App";
import { ChatComponent } from "./ChatComponent";
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
        element: <ChatComponent />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
