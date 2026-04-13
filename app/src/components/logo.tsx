export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="512" height="512" rx="112" fill="#0f172a" />
      <path
        d="M148 310 L216 200 L296 310 L364 200"
        stroke="#2dd4bf"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="148" cy="310" r="32" fill="#0d9488" />
      <circle cx="216" cy="200" r="32" fill="#14b8a6" />
      <circle cx="296" cy="310" r="32" fill="#14b8a6" />
      <circle cx="364" cy="200" r="32" fill="#0d9488" />
      <circle cx="148" cy="310" r="14" fill="#2dd4bf" opacity="0.6" />
      <circle cx="216" cy="200" r="14" fill="#2dd4bf" opacity="0.6" />
      <circle cx="296" cy="310" r="14" fill="#2dd4bf" opacity="0.6" />
      <circle cx="364" cy="200" r="14" fill="#2dd4bf" opacity="0.6" />
    </svg>
  );
}
