import Sidebar from './dashboard/_component/sidebar';
import DashboardHeader from './dashboard/_component/dashboard-header';
import { ViewTransitions } from 'next-view-transitions';

async function AppLayout(props: React.PropsWithChildren) {
  return (
    <ViewTransitions>
      <div className="flex min-h-screen w-screen ">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-50">
          <DashboardHeader />
          <main className="flex-1 p-8 bg-gray-50">{props.children}</main>
        </div>
      </div>
    </ViewTransitions>
  );
}

export default AppLayout;