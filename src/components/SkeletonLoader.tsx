import { Card } from "@/components/ui/card";

export default function SkeletonLoader() {
  return (
    <Card className="mr-auto bg-white p-2 max-w-[80%] shadow-sm">
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
      </div>
    </Card>
  );
}
