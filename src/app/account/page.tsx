import { UpdateNameForm } from "../_components/updateNameForm";
import { Separator } from "../_components/ui/separator";
import { UpdatePasswordForm } from "../_components/UpdatePasswordForm";

import { AccountPageHeader } from "../_components/AccountPageHeader";
import { AccountPageLogoutButton } from "../_components/AccountPageLogoutButton";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AccountPageHeader />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-xl space-y-8">
          <UpdateNameForm />
          <Separator />
          <UpdatePasswordForm />
          <Separator />
          <AccountPageLogoutButton />
        </div>
      </main>
    </div>
  );
};

export default Page;
