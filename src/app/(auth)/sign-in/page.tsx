import { SignInCard } from "./_components/sign-in-card";

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex items-center flex-col justify-center w-full min-h-screen">
      <SignInCard callbackUrl={callbackUrl} />
    </div>
  );
}
