import { useParams } from 'react-router-dom'
import MessageForm from '../components/MessageForm'
import PageHeader, { BackLink } from '../components/PageHeader'
import { classes, students } from '../data'
import { useRole } from '../useRole'

export default function SendToChild() {
  const { classId, childId } = useParams()
  const role = useRole()
  const cls = classes.find((c) => c.id === classId)
  const child = students.find((s) => s.id === childId)
  if (!cls || !child) return <BackLink to={`/${role}/classes`} label="Not found – back to My Classes" />
  const back = `/${role}/classes/${cls.id}`

  return (
    <>
      <BackLink to={back} label={`Back to ${cls.name}`} />
      <PageHeader title="Send to parents" subtitle={`${child.name} · ${cls.name}`} />
      <MessageForm
        to={`Parents of ${child.name}`}
        backTo={back}
        backLabel={`Back to ${cls.name}`}
        submitLabel="Send announcement"
        successMessage={`Your announcement was sent to the parents of ${child.name}.`}
      />
    </>
  )
}
