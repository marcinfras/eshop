import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../login/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const form = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  // const path = usePathname();
  // console.log(path);

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="first-letter:uppercase" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage className="first-letter:uppercase" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
};

// import { SubmitHandler, useForm } from "react-hook-form";
// import { FormField } from "./FormField";
// import { Button } from "./ui/button";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { loginSchema } from "../login/loginSchema";

// export type LoginFormInputs = {
//   email: string;
//   password: string;
// };

// export const LoginForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>({
//     resolver: yupResolver(loginSchema),
//   });

//   const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data);

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//       <FormField
//         label="email"
//         register={register}
//         placeholder="Enter your email"
//         type="email"
//         error={errors.email?.message}
//       />
//       <FormField
//         label="password"
//         register={register}
//         placeholder="Enter your password"
//         type="password"
//         error={errors.password?.message}
//       />
//       {/* {errors.password && <p>{errors.password.message}</p>} */}
//       <Button type="submit" className="w-full">
//         Sign in
//       </Button>
//     </form>
//   );
// };
