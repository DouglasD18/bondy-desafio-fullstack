import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ShowToast } from "../components/infos/toastify";
import { apiRequest } from "../utils/api";
import { storageHandle } from "../utils/storage";
import { LoginType } from "../types";
import { set } from "../redux/User/User.Store";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório"
    })
    .email("Formato de e-mail é inválido")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha precisa de no mínino 6 caracteres"),
});

function redirectTo(local: string) {
  setTimeout(() => {
    window.location.href = `${local}`;
  }, 3000);
}

function createQuery(login: LoginType): string {
  const { email, password } = login;

  return `
  mutation {
    login(login: { email: ${email}, password: ${password} }) {
      name,
      company
    }
  }
`
}

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();

  async function handleLogin(data: LoginFormData) {
    const response = await apiRequest(createQuery(data));

    if (response.data.login) {
      const { name, company } = response.data.login;
      const user = {
        name,
        company
      }
      storageHandle.setToken(user.name);
      dispatch(set(user));
      redirectTo("/");
      ShowToast({
        message: "Logado com sucesso! Você será redirecionado para a página principal.",
        type: "success"
      })
    } else {
      ShowToast({
        message: "Erro ao logar! Email ou senha incorretos.",
        type: "error"
      });
    }
  }

  useEffect(() => {
    storageHandle.setToken("");
  }, []);

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        className="flex flex-col gap-4 max-w-xs"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className="border bg-zinc-900 border-zinc-800 px-3 text-white rounded shadow-sm h-10"
            id="email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="border bg-zinc-900 border-zinc-800 px-3 text-white rounded shadow-sm h-10"
            id="password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}