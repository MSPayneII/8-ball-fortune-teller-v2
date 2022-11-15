import { Register, Landing, Error } from "./pages";
import { Combined, Eightball, SavedResponses, UserProfile } from "./pages/main";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import { useGlobalContext } from "./context/globalContext";

function App() {
  // checks to see if the user has authorization to be in the app. If not, they are booted out and redirected to the landing page.
  const { user } = useGlobalContext();
  let access;
  if (!user) {
    access = <Navigate to="/landing" />;
  } else {
    access = <Combined />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* parent route */}
        <Route path="/" element={access}>
          <Route index element={<Eightball />}></Route>
          <Route path="responses" element={<SavedResponses />}></Route>
          <Route path="profile" element={<UserProfile />}></Route>
        </Route>

        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
