import { Link } from 'react-router-dom';
import clsx from 'clsx';

function Button({
    onClick,
    to,
    href,
    disabled = false,
    leftIcon = false,
    rightIcon = false,
    children,
    primary = false,
    secondary = false,
    full = false,
    type,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    return (
        <Comp
            className={clsx(
                primary &&
                    `${full ? 'w-full' : 'w-[200px]'} bg-main text-white hover:underline rounded-md min-h-[40px]`,
                secondary &&
                    `${full ? 'w-full' : 'w-[200px]'} bg-secondary text-white hover:underline rounded-md min-h-[40px]`
            )}
            {...props}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
