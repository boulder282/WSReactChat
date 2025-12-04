import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignIn from "./components/registration/registrationForm";
import App from "./App";
import { ChatComponent } from "./ChatComponent";
import ProtectedRoute from "./routing/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ChatComponent />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <SignIn />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
