import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:5001/api/users/login", data);
      console.log("Token:", response.data.token);
       localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error:any) {
      console.error("Login error:", error.response?.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col justify-between bg-white shadow-lg rounded-lg w-[25rem] h-[25rem]">
      <p className="text-black text-5xl"> Welcome Back!</p>
        
        <input {...register("email")} placeholder="UID" className="border border-gray-200 p-2 w-full placeholder-gray-500 text-black " />
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password")} type="Password" placeholder="Password" className="border border-gray-200 p-2 w-full mt-2 placeholder-gray-500 text-black" />
        {errors.password && <p>{errors.password.message}</p>}
        
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 ">Login</button>
      </form>
    </div>
  );
}
