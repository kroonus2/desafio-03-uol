import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase_config";

export const useAuthState = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Finaliza o carregamento após verificar o estado
    });

    return () => unsubscribe(); // Cancela o listener quando o componente desmonta
  }, []);

  return { user, loading };
};
