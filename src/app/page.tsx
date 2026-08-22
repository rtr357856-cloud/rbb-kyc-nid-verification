"use client";

function ServerErrorScreen({ message }: { message: string }): never {
  throw new Error(message);
}

export default function KycPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ServerErrorScreen message="Server error, not found" />
    </div>
  );
}
