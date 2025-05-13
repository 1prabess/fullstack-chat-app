import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { useChatStore } from "./store/useChatStore";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const { userTheme } = useThemeStore();

  const { getFriends } = useChatStore();
  useEffect(() => {
    checkAuth();
    getFriends();
  }, []);

  if (isCheckingAuth)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-ring w-18 h-18"></span>
      </div>
    );

  return (
    <div data-theme={userTheme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
