import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Logo from "@/components/shared/logo";

import SignInButton from "./Header-signIn";
import MainButton from "./Header-main";
import ProfileButton from "./Header-profile";
import { ThemeToggle } from "./Header-theme";
import HeaderNav from "./Header-nav";

export default async function Header() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  return (
    <header className="space-y-2 w-full px-4 pt-4 sm:px-12">
      <div className="flex justify-between items-center text-muted-foreground text-sm">
        <div className="flex gap-4 sm:gap-10">
          <span className="">STATUS ::</span>
          <span className="sm:ml-14 text-foreground font-mono">
            [ <span className="font-bold">ONLINE</span> ]
          </span>
        </div>

        <div className="px-2 hidden md:flex">
          MALAYSIA ::
          <span className="sm:ml-12 text-foreground font-mono">
            [ <span className="font-bold">GMT+8</span> ]
          </span>
        </div>
      </div>

      <div className="flex justify-between items-start sm:items-center">
        <Logo variant="header" />

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-4 items-end sm:items-center">
          {/* 
            {session && (
              <ProfileButton
                profileName={session.user?.name ?? ""}
                profileImg={session.user?.image ?? ""}
              />
            )}
            {!session && <SignInButton />} 
          */}
          <MainButton />
          <ThemeToggle />
        </div>
      </div>

      <HeaderNav />
    </header>
  );
}
