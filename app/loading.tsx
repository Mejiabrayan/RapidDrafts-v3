import Spinner from '../components/Spinner';

function Loading() {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}

export default Loading;