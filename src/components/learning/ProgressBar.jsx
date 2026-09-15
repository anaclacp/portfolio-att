function ProgressBar({ value, label }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0))

  return (
    <div className="flex items-center gap-3">
      <div
        className="progress-track flex-1"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <span className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-purple-light tabular-nums shrink-0">{pct}%</span>
    </div>
  )
}

export default ProgressBar
