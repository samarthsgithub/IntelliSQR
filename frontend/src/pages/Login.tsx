import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setServerError(""); // Reset previous errors
    try {
      const response = await axios.post("http://localhost:5001/api/users/login", data);
      console.log("Token:", response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error: any) {
      setServerError(error.response?.data.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="p-6 flex flex-col justify-between bg-white shadow-lg rounded-lg w-[25rem] h-[28rem]"
      >
        <p className="text-black text-5xl mb-4"> Welcome Back!</p>
        
        <input 
          {...register("email")} 
          placeholder="UID" 
          className="border border-gray-200 p-2 w-full placeholder-gray-500 text-black" 
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input 
          {...register("password")} 
          type="password" 
          placeholder="Password" 
          className="border border-gray-200 p-2 w-full mt-2 placeholder-gray-500 text-black" 
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
}
