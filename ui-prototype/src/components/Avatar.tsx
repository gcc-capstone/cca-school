const colors = ['#29528a', '#5b7fb0', '#f2806a', '#6c8f7a', '#8a6fa8', '#c9964a']

export default function Avatar({ name, size = 72 }: { name: string; size?: number }) {
  const color = colors[name.length % colors.length]
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="rounded-circle flex-shrink-0" role="img" aria-label={`Profile photo placeholder for ${name}`}>
      <rect width="100" height="100" fill={color} />
      <circle cx="50" cy="38" r="18" fill="#fff" opacity="0.9" />
      <path d="M14 100c0-22 16-36 36-36s36 14 36 36z" fill="#fff" opacity="0.9" />
    </svg>
  )
}
