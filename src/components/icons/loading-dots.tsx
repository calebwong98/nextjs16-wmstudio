import { cn } from "@/lib/utils";
import styles from "./loading-dots.module.css";

interface LoadingDotsProps {
  color?: string;
  classname?: string;
}

const LoadingDots = ({ color = "#000", classname = "" }: LoadingDotsProps) => {
  return (
    <span className={cn(styles.loading, classname)}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export { LoadingDots };
