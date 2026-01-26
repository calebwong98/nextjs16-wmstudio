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
    <header className="fixed top-0 w-full px-4 pt-4 sm:px-12 z-99 bg-linear-to-b from-background from-30% to-transparent">
      <div className="flex justify-between text-muted-foreground">
        <div className="flex gap-4 sm:gap-10">
          <div className="">STATUS ::</div>
          <div className="sm:ml-12 text-white">ONLINE</div>
        </div>
        <div className="flex gap-14">
          <div className="hidden md:inline">MALAYSIA (GMT+8) ::</div>
          <div className="w-20 flex-end text-white"></div>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Logo variant="header" />

        <div className="flex gap-4 items-center">
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
