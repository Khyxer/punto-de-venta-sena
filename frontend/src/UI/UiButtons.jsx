export const MainButton = ({ icon, text, ...props }) => {
  return (
    <button
      {...props}
      className="flex select-none items-center justify-center bg-primary-color hover:bg-second-color duration-150 w-full p-3 rounded-lg text-white cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:hover:bg-gray-400"
    >
      {icon}
      {text}
    </button>
  );
};
