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
    <header className="space-y-2 w-full px-4 pt-4 sm:px-12">
      <div className="flex justify-between items-center text-muted-foreground text-sm">
        <div className="flex gap-4 sm:gap-10">
          <span className="">STATUS ::</span>
          <span className="sm:ml-12 px-3 rounded-xs border text-foreground font-mono">
            ONLINE
          </span>
        </div>

        <div className="px-2">
          MALAYSIA ::
          <span className="sm:ml-12 text-foreground font-mono">[ GMT+8 ]</span>
        </div>
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
