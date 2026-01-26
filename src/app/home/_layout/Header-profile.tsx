"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileButton({
  profileName,
  profileImg,
}: {
  profileName: string;
  profileImg: string;
}) {
  return (
    <Button className="p-0 overflow-hidden" asChild>
      <Link href="/profile" className="pr-2">
        <Avatar size="lg">
          <AvatarImage alt="User Avatar" src={profileImg} />
          <AvatarFallback>{profileName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="px-2 text-xs">{profileName}</div>
      </Link>
    </Button>
  );
}
