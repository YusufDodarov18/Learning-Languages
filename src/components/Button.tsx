function Button({
  name,
  src,
  theme,
  onClick,
}: {
  name: string;
  src?: string;
  theme: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        scale-in-center flex justify-center items-center py-3 cursor-pointer hover:scale-105 hover:shadow-lg flex-col gap-3 px-4 text-2xl font-bold
        ${theme ? "bg-gray-700 text-white" : "bg-blue-50"} 
        rounded-2xl transition-all duration-300 hover:bg-gray-800 hover:text-cyan-700
      `}
    >
      {src && <img src={src} alt={name} className="w-20 h-20" />}
      {name}
    </button>
  );
}

export default Button;
