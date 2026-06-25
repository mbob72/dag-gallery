import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function SearchIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
}

export function HeartIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>;
}

export function CartIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="M3 3h2l2.4 11.3a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>;
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M21.6 4.1 18.4 19c-.2 1-.8 1.2-1.6.7l-4.9-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 12.5 1.4 11c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.3 1.8Z" />
    </svg>
  );
}

export function ReactLogoIcon(props: IconProps) {
  return (
    <svg viewBox="-11.5 -10.2 23 20.4" aria-hidden="true" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function MaximizeIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="M8 3H3v5M21 8V3h-5M16 21h5v-5M3 16v5h5" /></svg>;
}

export function ChevronDownIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="m6 9 6 6 6-6" /></svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function PinIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
