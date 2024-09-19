/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userChangePassword } from "../UtlisFunction/changePassword";
import { userInfo } from "../UtlisFunction/authentication";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = userInfo();
  console.log("UserInfo", user);

  const onSubmit = async (data) => {
    const changeData = {
      ...data,
      email: user?.email,
    };
    const toastId = toast.loading("Processing...");
    try {
      const res = await userChangePassword(changeData);
      if (res?.success === true) {
        toast.success(res?.message, { id: toastId, duration: 1000 });
        navigate("/login");
        reset();
      } else {
        throw new Error(res?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
        duration: 1000,
      });
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-white">
      <div className="bg-[#F7F7F7] p-8 rounded-md  md:w-1/3 w-full md:px-0 px-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              placeholder="***"
              type={showPassword ? "text" : "password"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("oldPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <span
              className="absolute inset-y-0 right-3 mt-5 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              placeholder="***"
              type={showPassword ? "text" : "password"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="absolute inset-y-0 right-3 mt-5 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Login
            </button>
            <h1 className=" text-center pt-3">
              Don't have an account?{" "}
              <span className=" text-blue-600">
                <Link to="/register">Register</Link>
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
