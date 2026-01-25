import { SignInCard } from "./_components/sign-in-card";

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;

  return <SignInCard callbackUrl={callbackUrl} />;
}
