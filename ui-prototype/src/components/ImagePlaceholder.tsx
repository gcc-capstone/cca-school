export default function ImagePlaceholder({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 400 240" className="w-100 rounded border" role="img" aria-label={label}>
      <rect width="400" height="240" fill="#e9eef5" />
      <circle cx="310" cy="70" r="26" fill="#f2806a" opacity="0.8" />
      <path d="M0 200l110-100 80 70 60-50 150 120v20H0z" fill="#9db4d1" />
      <path d="M0 220l90-60 90 50 80-40 140 60v10H0z" fill="#29528a" opacity="0.85" />
    </svg>
  )
}
