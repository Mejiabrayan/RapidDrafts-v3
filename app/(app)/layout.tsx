import Sidebar from './dashboard/_component/sidebar';
import DashboardHeader from './dashboard/_component/dashboard-header';

async function AppLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <DashboardHeader />
        <main className="flex-1 p-8 bg-gray-50">{props.children}</main>
      </div>
    </div>
  );
}

export default AppLayout;