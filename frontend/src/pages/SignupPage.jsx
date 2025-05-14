import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessagesSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success) signup(formData);
  };

  return (
    <div className="min-h-screen flex justify-center mt-[10%] px-6">
      <div className="flex flex-col items-center w-full max-w-xl">
        <div className="text-center mb-4">
          <div className="flex flex-col items-center gap-2 group">
            {/* <div
              className="size-12 rounded-xl bg-primary/10 flex items-center text-left justify-center 
              group-hover:bg-primary/20 transition-colors"
            >
              <MessagesSquare className="size-8 text-primary" />
            </div> */}
            <div className="w-full text-left">
              <h1 className="text-5xl sm:text-5xl  flex gap-2  font-bold ">
                Sign up to start messaging your friends for free!
              </h1>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center  items-center"
        >
          <fieldset className="fieldset w-full mb-1">
            <legend className="fieldset-legend">Full Name</legend>
            <input
              type="text"
              className="input w-full rounded-none focus:outline-none focus:ring-0"
              placeholder="Prabesh Shrestha"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="fieldset w-full mb-1">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input w-full rounded-none focus:outline-none focus:ring-0"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="fieldset w-full mb-2 relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={showPassword ? "text" : "password"}
              className="input w-full rounded-none pr-10 focus:outline-none focus:ring-0"
              placeholder="your_password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base-content/70"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </span>
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary shadow-none rounded-none w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign up"
            )}
          </button>

          <p className="text-base-content/60 mt-6 text-center">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
