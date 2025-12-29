import React, { type ReactNode, type ComponentType } from 'react';

interface HoloCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function HoloCard({ children, className = '', hover = true }: HoloCardProps) {
    const hoverClass = hover ? 'hover:border-neon/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:-translate-y-1 hover:scale-[1.01]' : '';

    return (
        <div className={`holo-card rounded-xl ${hoverClass} ${className}`}>
            {children}
        </div>
    );
}

// HOC for adding holo-card styling
export function withHoloCard<P extends object>(
    WrappedComponent: ComponentType<P>,
    defaultClassName?: string
) {
    return function HoloCardWrapper(props: P & { cardClassName?: string }) {
        const { cardClassName, ...rest } = props;
        return (
            <HoloCard className={cardClassName || defaultClassName}>
                <WrappedComponent {...(rest as P)} />
            </HoloCard>
        );
    };
}
