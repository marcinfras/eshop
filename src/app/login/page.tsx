import { LoginForm } from "../_components/LoginForm";
import { LoginRegisterFormTemplate } from "../_components/LoginRegisterFormTemplate";

export const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-12">
      <LoginRegisterFormTemplate />
    </div>
  );
};

export default Page;
