declare module "@/components/ui/card" {
  export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module "@/components/ui/input" {
  export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

declare module "@/components/ui/badge" {
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
  export const Badge: React.FC<BadgeProps>;
}

declare module "@/components/ui/button" {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }
  export const Button: React.FC<ButtonProps>;
}
