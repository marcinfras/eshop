import { AccountPageHeader } from "../_components/AccountPageHeader";

export const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AccountPageHeader />
      <main className="flex-1 py-12 px-4 md:px-6">{children}</main>
    </div>
  );
};
export default AccountLayout;
