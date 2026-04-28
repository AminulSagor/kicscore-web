import AdminNavbar from "@/app/dashboards/admin/_components/admin-navbar";
import AdminSidebar from "@/app/dashboards/admin/_components/admin-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="h-screen w-14 shrink-0 bg-primary md:w-44 lg:w-52 xl:w-64">
        <AdminSidebar />
      </aside>

      <div className="flex h-screen min-w-0 flex-1 flex-col bg-[#F3F7F5] dark:bg-black">
        <nav className="h-12 shrink-0 bg-primary md:h-18">
          <AdminNavbar />
        </nav>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
