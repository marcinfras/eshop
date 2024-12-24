export const StarIcon = ({ fill }: { fill: number }) => {
  return (
    <div className="relative w-5 h-5">
      <svg
        className="w-full h-full text-gray-300"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <svg
        className="absolute top-0 left-0 w-full h-full text-black"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`starClip-${fill}`}>
            <rect x="0" y="0" width={`${fill * 24}`} height="24" />
          </clipPath>
        </defs>
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          clipPath={`url(#starClip-${fill})`}
        />
      </svg>
    </div>
  );
};
