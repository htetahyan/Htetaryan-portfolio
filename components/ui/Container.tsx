import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: "div" | "section" | "article" | "header" | "footer";
}

export default function Container({
    children,
    className = "",
    as: Component = "div",
}: ContainerProps) {
    return <Component className={`container ${className}`}>{children}</Component>;
}
