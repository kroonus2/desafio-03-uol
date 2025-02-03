import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase_config";

// Função de autenticaçso com Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Provedor de autenticação do Google
  try {
    const result = await signInWithPopup(auth, provider); // Abre o popup do Google
    const user = result.user;
    // Armazena os dados no localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName,
        photo: user.photoURL,
      })
    );
    // console.log("Usuário autenticado com sucesso:", user);
    return user;
  } catch (error: any) {
    // console.error("Erro ao autenticar com Google:", error);
    throw error;
  }
};
