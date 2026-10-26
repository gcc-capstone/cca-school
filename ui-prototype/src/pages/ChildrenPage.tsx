import ChildCard, { AllChildrenCard } from '../components/ChildCard'
import PageHeader from '../components/PageHeader'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function ChildrenPage() {
  const role = useRole()
  const { students, user } = useStore()
  const kids = students.filter((s) => s.parentName === user?.name)
  return (
    <>
      <PageHeader title="My Children" subtitle="Select a child — or all of them — to change transportation or message their homeroom teacher." />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {kids.length > 1 && <AllChildrenCard to={`/${role}/children/all`} count={kids.length} />}
        {kids.map((c) => <ChildCard key={c.id} child={c} to={`/${role}/children/${c.id}`} />)}
      </div>
    </>
  )
}
