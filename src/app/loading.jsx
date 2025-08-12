import React from "react";

function Loading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      {/* Decorative blurred blobs */}
      <span className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20" />
      <span className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl dark:bg-fuchsia-600/20" />
      {/* Glass panel */}
      <div
        className="relative z-10 flex flex-col items-center rounded-2xl border border-white/40 bg-white/70 px-10 py-12 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        {/* Spinner */}
        <div className="relative">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500 dark:border-indigo-400/30 dark:border-t-indigo-400" />
          <div className="absolute inset-0 animate-ping rounded-full border border-indigo-400/30 dark:border-indigo-300/30" />
        </div>
        <h1 className="mt-6 text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
          Preparing your experience
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Loading, please wait...
        </p>
        {/* Subtle progress shimmer (fake) */}
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 dark:from-indigo-500 dark:via-fuchsia-500 dark:to-indigo-500" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
