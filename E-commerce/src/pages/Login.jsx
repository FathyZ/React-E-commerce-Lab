import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.email("Invalid E-mail Address"),
  password: z
    .string("Password Must Be At Least 8 Characters")
    .min(8, "Password Must Be At Least 8 Characters"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.log(error);
    }
  };

  return (
    <div>
      <form className="space-y-4 w-3/4 mx-auto">
        <div>
          <input
            {...register("email")}
            placeholder="E-mail"
            className="input w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            placeholder="Password"
            className="input w-full"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            Login
          </button>
          <Link
            to="/sign-up"
            className="text-sm text-blue-500 hover:underline ml-4"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
