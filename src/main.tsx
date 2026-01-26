import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignIn from "./components/registration/registrationForm";
import App from "./App";
import { ChatComponent } from "./ChatComponent";
import UserInfoPage from "./components/UserInfo/userInfo";
import "./index.css";
import FriendList from "./components/friendList/friendList";

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
      {
        path: "userinfo",
        element: <UserInfoPage />,
      },
      {
        path: "friends",
        element: <FriendList />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
