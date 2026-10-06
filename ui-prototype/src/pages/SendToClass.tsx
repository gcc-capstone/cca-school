import { useParams } from 'react-router-dom'
import MessageForm from '../components/MessageForm'
import PageHeader, { BackLink } from '../components/PageHeader'
import { classes } from '../data'
import { useRole } from '../useRole'

export default function SendToClass() {
  const { classId } = useParams()
  const role = useRole()
  const cls = classes.find((c) => c.id === classId)
  if (!cls) return <BackLink to={`/${role}/classes`} label="Class not found – back to My Classes" />
  const back = `/${role}/classes/${cls.id}`

  return (
    <>
      <BackLink to={back} label={`Back to ${cls.name}`} />
      <PageHeader title="Send to all parents" subtitle={`${cls.name} – ${cls.grade}`} />
      <MessageForm
        to={`All parents of ${cls.name} – ${cls.grade} (${cls.studentIds.length} families)`}
        backTo={back}
        backLabel={`Back to ${cls.name}`}
        submitLabel="Send announcement"
        successMessage={`Your announcement was sent to ${cls.studentIds.length} families.`}
      />
    </>
  )
}
