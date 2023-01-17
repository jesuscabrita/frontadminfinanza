import Link from "next/link";
import { useRouter } from "next/router";

export const ButtonNav = ({ children, href }) => {
    const { asPath } = useRouter();
    const isActive = asPath == href;

    return (
        <Link href={href}>
            <a style={{ 
                color: isActive ? "var(--primario)" : 'var(--cero)'
                }}>
                {children}
            </a>
        </Link>
    )
}
export const ButtonNavbar = ({ children, href }) => {
    const { asPath } = useRouter();
    const isActive = asPath == href;

    return (
        <Link href={href}>
            <a 
            className="flex items-center px-4 gap-2 mt-4 py-2 text-sm texto"
            style={{ 
                color: isActive ? "var(--primario)" : 'var(--cero)' 
                }}>
                {children}
            </a>
        </Link>
    );
};
