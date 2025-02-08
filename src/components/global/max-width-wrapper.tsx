import { cn } from "@/utils";
import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: Props) => {
    return (
        <section className={cn(
            "h-full mx-auto w-screen px-10 md:px-12 lg:px-24 bg-white",
            className,
        )}>
            {children}
        </section>
    )
};

export default MaxWidthWrapper