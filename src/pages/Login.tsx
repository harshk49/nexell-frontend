import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components";
import ImageCarousel from "@/components/common/ImageCarousel";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const carouselImages = [
    "/Auth Page/Add notes-bro.svg",
    "/Auth Page/Checklist-bro.svg",
    "/Auth Page/Team spirit-bro.svg",
    "/Auth Page/Good team-bro.svg",
  ];

  const handleSubmit = (data: LoginFormData) => {
    setLoading(true);
    console.log("Login data:", data);
    setTimeout(() => {
      navigate("/loading", { state: { userName: data.email } });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <h1 className="text-4xl font-bold text-white">
          Hello, {form.getValues("email") || "User"}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Logo Top Left - fixed to viewport */}
      {/* <img
        src="/logo.png"
        alt="Logo"
        className="fixed z-50 w-32 h-auto top-6 left-10"
      /> */}
      {/* Left side - Login Form */}
      <div className="flex flex-col items-center justify-between w-1/2 h-screen px-10 py-8">
        <div className="flex flex-col justify-center flex-grow w-full max-w-md gap-8">
          <h1 className="mb-2 text-5xl font-normal text-center">
            Welcome back!
          </h1>
          <p className="mb-3 text-sm text-center text-gray-600">
            Simplify your workflow and boost your productivity with{" "}
            <strong>Nexell's App</strong>. Get started for free.
          </p>

          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
                        />
                      </FormControl>
                      <span
                        className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        onClick={togglePassword}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end text-sm text-black">
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white transition bg-black rounded-full hover:bg-gray-900"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          <div className="flex items-center ">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              className="p-3 text-white bg-black rounded-full"
            >
              <FaGoogle />
            </Button>
            <Button
              variant="outline"
              className="p-3 text-white bg-black rounded-full"
            >
              <FaApple />
            </Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Not a member?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Register now
          </a>
        </p>
      </div>

      {/* Right side - Blue gradient box with rounded borders */}
      <div className="flex items-start justify-center w-1/2 h-screen p-10">
        <div className="flex flex-col items-center justify-center w-full p-8 mt-8 overflow-hidden bg-gradient-to-t from-white via-neutral-100 to-neutral-200 rounded-3xl h-4/5">
          <ImageCarousel
            images={carouselImages}
            autoplayDelay={5000}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
