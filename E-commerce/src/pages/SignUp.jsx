import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const signUpSchema = z
  .object({
    username: z.string().min(3, "username must be 3+ chars"),
    email: z.email("Invalid E-mail Address"),
    password: z
      .string("Password Must Be At Least 8 Characters")
      .min(8, "Password Must Be At Least 8 Characters"),
    confirmPassword: z.string("Password Must Be At Least 8 Characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUp() {
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Signed up successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div>
      <form className="space-y-4 w-3/4 mx-auto">
        <div>
          <input
            {...register("username")}
            placeholder="Username"
            className="input w-full"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
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
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="input w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex w-full items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            Sign Up
          </button>
          <Link to="/login" className="link">
            <p>Already have an account? Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
