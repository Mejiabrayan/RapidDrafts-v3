import Sidebar from './dashboard/_component/sidebar';
import DashboardHeader from './dashboard/_component/dashboard-header';
import { ViewTransitions } from 'next-view-transitions';

async function AppLayout(props: React.PropsWithChildren) {
  return (
    <ViewTransitions>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-16 sm:ml-64"> {/* Adjust margin based on sidebar width */}
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-8 bg-gray-50 overflow-auto">
            {props.children}
          </main>
        </div>
      </div>
    </ViewTransitions>
  );
}

export default AppLayout;