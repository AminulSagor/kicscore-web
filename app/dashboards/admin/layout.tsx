import AdminNavbar from "@/app/dashboards/admin/_components/admin-navbar";
import AdminSidebar from "@/app/dashboards/admin/_components/admin-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="h-screen w-14 shrink-0 bg-primary md:w-44 lg:w-52 xl:w-64">
        <AdminSidebar />
      </aside>

      <div className="flex h-screen min-w-0 flex-1 flex-col">
        <nav className="h-12 shrink-0 bg-primary md:h-18">
          <AdminNavbar />
        </nav>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full xl:w-5xl 2xl:w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
