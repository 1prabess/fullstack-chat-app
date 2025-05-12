import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return <div>SignupPage</div>;
};
