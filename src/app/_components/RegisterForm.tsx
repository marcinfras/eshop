import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../login/registerSchema";
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

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const form = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) =>
    console.log(data);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage className="first-letter:uppercase" />
            </FormItem>
          )}
        />
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
          Create account
        </Button>
      </form>
    </Form>
  );
};

// import { SubmitHandler, useForm } from "react-hook-form";
// import { FormField } from "./FormField";
// import { Button } from "./ui/button";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerSchema } from "../login/registerSchema";

// export type RegisterFormInputs = {
//   name: string;
//   email: string;
//   password: string;
// };

// export const RegisterForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormInputs>({
//     resolver: yupResolver(registerSchema),
//   });

//   const onSubmit: SubmitHandler<RegisterFormInputs> = (data) =>
//     console.log(data);

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//       {/* <FormField
//         label="name"
//         register={register}
//         placeholder="Enter your name"
//         error={errors.name?.message}
//       />
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
//       /> */}
//       <Button type="submit" className="w-full">
//         Create account
//       </Button>
//     </form>
//   );
// };
