export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
          <div className="h-8 w-1/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}