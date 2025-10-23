export const MainButton = ({ icon, text, ...props }) => {
  return (
    <button
      {...props}
      className="flex select-none items-center justify-center bg-primary-color hover:bg-second-color duration-150 w-full p-3 rounded-lg text-white cursor-pointer"
    >
      {icon}
      {text}
    </button>
  );
};
