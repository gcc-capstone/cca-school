import { modeInfo, planLabel } from '../lib'
import type { DayPlan } from '../types'

export default function ModeBadge({ plan, prefix = '' }: { plan: DayPlan; prefix?: string }) {
  const info = modeInfo[plan.mode]
  return (
    <span className={`badge text-wrap text-bg-${info.color}`}>
      <i className={`bi bi-${info.icon} me-1`} />{prefix}{planLabel(plan)}
    </span>
  )
}
