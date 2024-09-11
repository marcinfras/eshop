import { UpdateNameForm } from "./_components/UpdateNameForm";
import { Separator } from "../_components/ui/separator";
import { UpdatePasswordForm } from "./_components/UpdatePasswordForm";

import { AccountPageLogoutButton } from "./_components/AccountPageLogoutButton";

const Page = () => {
  return (
    <div className="container mx-auto max-w-xl space-y-8">
      <UpdateNameForm />
      <Separator />
      <UpdatePasswordForm />
      <Separator />
      <AccountPageLogoutButton />
    </div>
  );
};

export default Page;
