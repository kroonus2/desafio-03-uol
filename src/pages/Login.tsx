import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (d: object) => alert(JSON.stringify(d));

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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-5/6"
      >
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="border border-gray-600 rounded-lg w-full h-[50px] p-3 mb-5"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border border-gray-600 rounded-lg w-full h-[50px] p-3 mb-1"
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
      </form>

      {/* Rodapé */}
      <div className="mb-11">
        <p className="text-sm text-white">
          Didn't have an account?
          <a href="" className="text-primary underline ml-2">
            Sign Up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
