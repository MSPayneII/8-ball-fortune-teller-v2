import { BsPerson } from "react-icons/bs";
import { GiEightBall } from "react-icons/gi";
import { BsListTask } from "react-icons/bs";

export const links = [
  {
    id: 1,
    text: "Ask Eightball",
    path: "/",
    icon: <GiEightBall />,
  },
  {
    id: 2,
    text: "Saved Responses",
    path: "responses",
    icon: <BsListTask />,
  },
  {
    id: 3,
    text: "Update Profile",
    path: "profile",
    icon: <BsPerson />,
  },
];
