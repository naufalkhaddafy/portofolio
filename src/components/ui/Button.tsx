import React, { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface BaseButtonProps {
    variant?: ButtonVariant;
    magnetic?: boolean;
    children: React.ReactNode;
    className?: string;
}

type ButtonAsButton = BaseButtonProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
        as?: 'button';
    };

type ButtonAsAnchor = BaseButtonProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
        as: 'a';
    };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-white text-black hover:bg-cyan font-bold relative overflow-hidden group',
    outline:
        'border border-white/30 backdrop-blur-sm text-white hover:border-neon hover:text-neon hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]',
    ghost:
        'text-gray-400 hover:text-white hover:bg-white/10',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (props, ref) => {
        const { variant = 'primary', magnetic = false, className = '', children, ...rest } = props;

        const baseClass = `px-8 py-4 font-bold text-sm md:text-lg transition-all duration-300 inline-block text-center ${magnetic ? 'magnetic-btn' : ''
            } ${variantStyles[variant]} ${className}`;

        if (props.as === 'a') {
            const { as, ...anchorProps } = rest as ButtonAsAnchor;
            return (
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    className={baseClass}
                    {...anchorProps}
                >
                    {variant === 'primary' && (
                        <div className="absolute inset-0 bg-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0" />
                    )}
                    <span className="relative z-10">{children}</span>
                </a>
            );
        }

        const { as, ...buttonProps } = rest as ButtonAsButton;
        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={baseClass}
                {...buttonProps}
            >
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0" />
                )}
                <span className="relative z-10">{children}</span>
            </button>
        );
    }
);

Button.displayName = 'Button';
