"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-[420px] w-full text-center space-y-4">
          <h1 className="text-xl font-bold text-red-600">Server error, not found</h1>
          <p className="text-sm text-gray-500">
            The server encountered an error and could not complete your request.
          </p>
          <p className="text-xs text-gray-400">{error.message}</p>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
