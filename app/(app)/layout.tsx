import AppHeader from '@/components/AppHeader';

async function AppLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1 space-y-4">
      <AppHeader />

      {props.children}
    </div>
  );
}

export default AppLayout;
