"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h2>{error.message}</h2>
    </div>
  );
};

export default Error;
