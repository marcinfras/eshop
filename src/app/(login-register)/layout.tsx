
import { LoginRegisterFormTemplate } from "./_components/LoginRegisterFormTemplate";

//https://v0.dev/r/gl6VD99Wth9

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-12">
      <LoginRegisterFormTemplate>{children}</LoginRegisterFormTemplate>
    </div>
  );
};

export default LoginLayout;
