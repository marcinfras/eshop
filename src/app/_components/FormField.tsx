// import { Path, UseFormRegister } from "react-hook-form";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { LoginFormInputs } from "./LoginForm";
// import { RegisterFormInputs } from "./RegisterForm";

// type Props = {
//   label: Path<LoginFormInputs> | Path<RegisterFormInputs>;
//   register:
//     | UseFormRegister<LoginFormInputs>
//     | UseFormRegister<RegisterFormInputs>;
//   placeholder?: string;
//   type?: string;
//   error?: string;
// };

// export const FormField = ({
//   label,
//   register,
//   placeholder,
//   type = "text",
//   error,
// }: Props) => {
//   console.log(typeof register);

//   return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <Label className="first-letter:uppercase" htmlFor={label}>
//         {label}
//       </Label>
//       <Input
//         type={type}
//         id={label}
//         {...register(label)}
//         placeholder={placeholder ? placeholder : ""}
//       />
//       {error && (
//         <p className="text-red-400 first-letter:uppercase text-xs">{error}</p>
//       )}
//     </div>
//   );
// };
