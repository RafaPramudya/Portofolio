import {
  BookOpen,
  Briefcase,
  Code,
  Cpu,
  FlaskConical,
  GraduationCap,
  Layers,
  PenLine,
  Rocket,
  Terminal,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

const icons: Record<IconName, LucideIcon> = {
  trophy: Trophy,
  code: Code,
  graduation: GraduationCap,
  briefcase: Briefcase,
  cpu: Cpu,
  flask: FlaskConical,
  rocket: Rocket,
  pen: PenLine,
  terminal: Terminal,
  layers: Layers,
  zap: Zap,
  book: BookOpen,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = icons[name] ?? Zap;
  return <Component className={className} aria-hidden="true" />;
}
