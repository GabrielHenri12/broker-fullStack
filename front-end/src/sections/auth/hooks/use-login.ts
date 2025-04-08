import { useAuthContext } from "@/auth/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useLogin = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isLoading },
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      await login(email, password);
      router.push("/");
      methods.reset();
    } catch (error) {
      console.error(error);
      setError("email", { message: "Invalid email or password" });
    }
  });

  return { methods, onSubmit, isLoading, errors };
};
