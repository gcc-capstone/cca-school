import { days, modeInfo, weekDates } from '../lib'
import type { WeekPlan } from '../types'

export default function WeekStrip({ plan }: { plan: WeekPlan }) {
  const dates = weekDates()
  return (
    <div className="row row-cols-5 g-1 g-sm-2">
      {days.map((d) => {
        const info = modeInfo[plan[d].mode]
        return (
          <div className="col" key={d}>
            <div className={`border border-${info.color} bg-${info.color}-subtle rounded text-center p-1 p-sm-2 h-100`}>
              <div className="fw-semibold small">{d}</div>
              <div className="small text-body-secondary d-none d-sm-block">{dates[d].getDate()}</div>
              <i className={`bi bi-${info.icon}`} />
              <div className="small d-none d-sm-block">{info.short}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
