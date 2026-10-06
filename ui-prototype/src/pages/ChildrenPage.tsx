import ChildCard from '../components/ChildCard'
import PageHeader from '../components/PageHeader'
import { useSession } from '../session'
import { useRole } from '../useRole'

export default function ChildrenPage() {
  const role = useRole()
  const { myChildren } = useSession()
  return (
    <>
      <PageHeader title="My Children" subtitle="Select a child to change their transportation or message their homeroom teacher." />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {myChildren.map((c) => <ChildCard key={c.id} child={c} to={`/${role}/children/${c.id}`} />)}
      </div>
    </>
  )
}
