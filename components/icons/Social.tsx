type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function InstagramIcon({ size = 18, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 18, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14.5 3v11.2a3.3 3.3 0 1 1-3.3-3.3" />
      <path d="M14.5 3a4.5 4.5 0 0 0 4.5 4.5" />
    </svg>
  );
}
