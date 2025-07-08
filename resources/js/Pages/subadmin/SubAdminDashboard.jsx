import SubAdminLayout from "@/Layouts/SubAdminLayout"

export default function SubAdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sub Admin Dashboard</h1>
      <p>This is where Sub Admin manages their tasks.</p>
    </div>
  )
}

SubAdminDashboard.layout = (page) => (
  <SubAdminLayout>{page}</SubAdminLayout>
)