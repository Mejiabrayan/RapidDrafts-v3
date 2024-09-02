import { ViewTransitions } from 'next-view-transitions';

function EditLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 sm:p-8 bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
}

export default EditLayout;
