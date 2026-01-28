export default function Copyright({ className }: { className?: string }) {
  return (
    <p className={`text-muted-foreground text-sm ${className ?? ""}`}>
      &copy; {new Date().getFullYear()} WMStudio. All Rights reserved.
    </p>
  );
}
