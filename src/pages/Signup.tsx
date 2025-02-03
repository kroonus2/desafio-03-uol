import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/basicAuth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../services/googleAuth";

import SignupImg from "../assets/image_bgSignin.svg";

const Signup = () => {
  const navigate = useNavigate();
  // Usando useState pra pegar os campos
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const user = await registerUser(email, password);
      console.log("Usuario registrado com sucesso!", user);
      navigate("/");
    } catch (error: any) {
      console.error("Erro ao registrar: ", error);
      clearInputs();
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Usuário logado:", user);
      navigate("/");
    } catch (error) {
      console.error("Erro ao logar com Google:", error);
    }
  };

  // Teste valores useState email e senha

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault(); // Previne o comportamento padrão do formulário
  //   console.log(`email: ${email}, password: ${password}`);
  // };

  return (
    <div
      className="flex flex-col justify-between items-center h-screen w-full relative bg-cover bg-center"
      style={{ backgroundImage: `url(${SignupImg})` }}
    >
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
          Sign Up
        </button>
        <div
          onClick={() => handleGoogleSignup()}
          className="flex text-white gap-3 mt-3"
        >
          <FcGoogle size={26} />
          <p className="font-bold text-lg">Sign up with Google</p>
        </div>
      </form>
      {/* Rodapé */}
      <div className="mb-11">
        <Link to={"/"}>
          <p className="text-sm text-white">
            Didn't have an account?
            <span className="text-primary underline ml-2">Sign In here</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
