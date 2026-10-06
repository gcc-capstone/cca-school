import { useParams } from 'react-router-dom'
import MessageForm from '../components/MessageForm'
import PageHeader, { BackLink } from '../components/PageHeader'
import { useSession } from '../session'
import { useRole } from '../useRole'

export default function MessageTeacher() {
  const { childId } = useParams()
  const role = useRole()
  const { myChildren } = useSession()
  const child = myChildren.find((c) => c.id === childId)
  if (!child) return <BackLink to={`/${role}/children`} label="Child not found – back to My Children" />

  return (
    <>
      <BackLink to={`/${role}/children/${child.id}`} label={`Back to ${child.name.split(' ')[0]}`} />
      <PageHeader title="Message homeroom teacher" subtitle={`About ${child.name}, ${child.grade} Grade`} />
      <MessageForm
        to={`${child.homeroomTeacher} (Homeroom Teacher)`}
        backTo={`/${role}/children/${child.id}`}
        backLabel={`Back to ${child.name.split(' ')[0]}`}
        successMessage={`Your message was sent to ${child.homeroomTeacher}.`}
      />
    </>
  )
}
