import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Logo from "@/components/shared/logo";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="absolute top-0 w-full bg-transparent z-99">
      <div className="container pt-10 px-6 xl:px-16 mx-auto flex justify-between items-center">
        <Logo />

        {session && (
          // Signed-In User
          <div>Signed In</div>
        )}
        {!session && (
          // Signed-Out User
          <div>Signed Out</div>
        )}
      </div>
    </header>
  );
}
