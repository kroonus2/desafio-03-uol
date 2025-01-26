import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Props pra deixar o componente dinamico
interface SearchInputProps {
  disabled?: boolean;
  redirectPath?: string;
}

const SearchInput = ({
  disabled = false,
  redirectPath = "/",
}: SearchInputProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled && redirectPath) {
      navigate(redirectPath); // Redireciona para a página especificada
    }
  };

  return (
    <div className="relative flex justify-center mt-3" onClick={handleClick}>
      <div className="relative w-5/6">
        {/* Container flex para ícone e input */}
        <FiSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            disabled ? "text-gray-300" : "text-gray-400"
          }`}
          size={20}
        />
        <input
          type="text"
          placeholder="Search headphone"
          disabled={disabled} // Desabilita o campo com base no prop
          className={`pl-10 pr-4 py-2 border ${
            disabled
              ? "border-gray-300 bg-gray-100 cursor-pointer"
              : "border-gray-300"
          } rounded-md w-full h-[45px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
      </div>
    </div>
  );
};

export default SearchInput;
