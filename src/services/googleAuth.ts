import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase_config";

// Função de autenticaçso com Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Provedor de autenticação do Google
  try {
    const result = await signInWithPopup(auth, provider); // Abre o popup do Google
    // const credential = GoogleAuthProvider.credentialFromResult(result); // Obtém credenciais
    // const token = credential?.accessToken; // Token de acesso do Google
    const user = result.user; // Informações do usuário autenticado
    console.log("Usuário autenticado com sucesso:", user);
    return user;
  } catch (error: any) {
    console.error("Erro ao autenticar com Google:", error);
    throw error;
  }
};
