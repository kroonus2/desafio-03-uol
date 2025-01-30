import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Props para deixar o componente dinâmico
interface SearchInputProps {
  redirectOnFocus?: boolean;
  redirectPath?: string;
  onSearch?: (query: string) => void;
}

const SearchInput = ({
  redirectOnFocus = false,
  redirectPath = "/",
  onSearch,
}: SearchInputProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleFocus = () => {
    if (redirectOnFocus && redirectPath) {
      navigate(redirectPath);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="relative flex justify-center mt-3">
      <div className="relative w-11/12">
        {/* Container flex para ícone e input */}
        <FiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search headphone"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus} // Redireciona ao focar no campo
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full h-[45px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchInput;
