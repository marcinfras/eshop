export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-900/75 backdrop-blur z-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-transparent dark:border-gray-600 dark:border-t-transparent" />
    </div>
  );
};
