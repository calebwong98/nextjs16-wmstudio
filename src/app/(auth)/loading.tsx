import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <LoadingSpinner size="lg" />
    </div>
  );
}
