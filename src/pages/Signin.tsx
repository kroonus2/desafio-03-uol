import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/basicAuth";
import { useState } from "react";
import { signInWithGoogle } from "../services/googleAuth";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const navigate = useNavigate();
  // Usando useState pra pegar os campos
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log("Usuario Logado com sucesso!", user);
      navigate("/");
    } catch (error: any) {
      console.error("Error ao logar: ", error);
      clearInputs();
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Usuário logado:", user);
      navigate("/");
    } catch (error) {
      console.error("Erro ao logar com Google:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen w-full relative bg-cover bg-center bg-[url(assets/image_bgSignin.svg)]">
      {/* Cabeçalho */}
      <div className="text-center gap-3 mt-32">
        <h3 className="font-bold text-[52px] text-white">Audio</h3>
        <p className="font-bold text-sm text-white">
          It's modular and designed to last
        </p>
      </div>
      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-11/12"
      >
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-600 rounded-lg w-full h-[50px] p-3 mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-600 rounded-lg w-full h-[50px] p-3 mb-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/" className="text-sm text-white hover:text-primary">
          Forgot Password
        </a>
        <button
          type="submit"
          className="bg-primary w-full h-[50px] rounded-lg text-white mt-8"
        >
          Sign In
        </button>
        <div
          onClick={() => handleGoogleSignin()}
          className="flex text-white gap-3 mt-3"
        >
          <FcGoogle size={26} />
          <p className="font-bold text-lg">Sign in with Google</p>
        </div>
      </form>
      {/* Rodapé */}
      <div className="mb-11">
        <Link to={"/signup"}>
          <p className="text-sm text-white">
            Didn't have an account?
            <span className="text-primary underline ml-2">Sign Up here</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
