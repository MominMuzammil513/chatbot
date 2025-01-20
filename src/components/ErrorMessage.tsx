
export function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-red-50 text-red-600 shadow-md border border-red-200">
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
}
