import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import UserDetails from "./Components/UserDetails";
import UserHome from "./Components/UserHome";
import ForgotPassword from "./Components/ForgotPassword";
import UploadPosts from "./Components/UploadPosts";
import ManagePosts from "./Components/ManagePosts";
import AccessPage from "./Components/AccessPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <nav>
          <Navbar />
        </nav>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/signIn"
              element={isLoggedIn == "true" ? <UserDetails /> : <SignIn />}
            />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route
              path="/uploadPosts"
              element={isLoggedIn == "true" ? <UploadPosts /> : <AccessPage />}
            />
            <Route
              path="/managePosts"
              element={isLoggedIn == "true" ? <ManagePosts /> : <AccessPage />}
            />
            <Route path="/accessPage" element={<AccessPage />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
