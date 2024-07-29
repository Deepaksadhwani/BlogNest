const Shimmer = () => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="m-4 w-[80%] transform animate-pulse rounded-lg bg-gray-100 p-4 transition-transform duration-200 hover:translate-y-1"
        >
          <div className="h-20 rounded-md bg-gray-200"></div>
          <div className="mt-2 h-6 rounded-md bg-gray-200"></div>
          <div className="mt-2 h-4 rounded-md bg-gray-200"></div>
          <div className="mt-1 h-4 rounded-md bg-gray-200"></div>
          <div className="mt-1 h-4 rounded-md bg-gray-200"></div>
          <div className="mt-1 h-4 rounded-md bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
