import { useForm } from "react-hook-form";
import { FormField } from "./FormField";
import { Button } from "./ui/button";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form className="space-y-4">
      <FormField />
      <FormField />
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
};
