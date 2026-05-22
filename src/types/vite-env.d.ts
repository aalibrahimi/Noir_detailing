/// <reference types="vite/client" />

declare module "lucide-react" {
  import type { FC, SVGProps } from "react";

  export interface LucideProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    strokeWidth?: string | number;
    color?: string;
  }

  export type LucideIcon = FC<LucideProps>;

  // Icons used in this project. Add more here as needed.
  export const ArrowDown: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Calendar: LucideIcon;
  export const Check: LucideIcon;
  export const Instagram: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const Phone: LucideIcon;
  export const Quote: LucideIcon;
  export const X: LucideIcon;
  export const Youtube: LucideIcon;
}
