import { FaSpinner } from "react-icons/fa";

interface message {
  texto?: string;
}

const LoadingSpinner = ({ texto }: message) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FaSpinner className="text-4xl animate-spin" />
      <p>{texto || "Carregando"}</p>
    </div>
  );
};

export default LoadingSpinner;
