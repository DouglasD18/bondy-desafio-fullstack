import { useEffect } from "react";
import { useSelector } from "react-redux";

import { storageHandle } from "../utils/storage";
import { ShowToast } from "../components/infos/toastify";
import { RootState } from "../redux/store";

function redirectTo(local: string) {
  setTimeout(() => {
    window.location.href = `${local}`;
  }, 3000);
}

export function Home() {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = storageHandle.getToken();

    if (!token) {
      redirectTo("/login");
      ShowToast({
        message: "Você não está logado! Você será redirecionado para a página de login.",
        type: "info"
      });
    }
  }, []);

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <h1 style={{ textAlign: "center" }}>
        Bem vindo,
        {user.name}
      </h1>
    </main>
  );
}