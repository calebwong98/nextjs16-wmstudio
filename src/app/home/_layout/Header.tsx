import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Logo from "@/components/shared/logo";

import SignInButton from "./Header-signIn";
import MainButton from "./Header-main";
import ProfileButton from "./Header-profile";
import { ThemeToggle } from "./Header-theme";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="space-y-2 w-full px-4 pt-4 sm:px-12 z-99 bg-linear-to-b from-background from-30% to-transparent">
      <div className="flex justify-between items-center text-muted-foreground text-sm">
        <div className="flex gap-4 sm:gap-10">
          <div className="">STATUS ::</div>
          <div className="sm:ml-12 text-white">ONLINE</div>
        </div>

        <div className="px-2">MALAYSIA :: [ GMT+8 ]</div>
      </div>

      <div className="flex justify-between items-center">
        <Logo variant="header" />

        <div className="flex gap-2 sm:gap-4 items-center">
          {session && (
            <ProfileButton
              profileName={session.user?.name ?? ""}
              profileImg={session.user?.image ?? ""}
            />
          )}
          {!session && <SignInButton />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
