export function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="flex gap-1.5 w-full font-medium text-foreground uppercase">
      <span>[ +</span>
      <span>{title}</span>
      <span>+ ]</span>
      <span className="h-px flex-1 my-auto bg-muted-foreground/40"></span>
    </h2>
  );
}
