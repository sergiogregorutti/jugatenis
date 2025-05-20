"use client";

import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      id
      name
      email
    }
  }
`;

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function Ingresar() {
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await loginUser({ variables: { input: data } });
      // alert(`Bienvenido ${res.data.loginUser.name}`);
      localStorage.setItem("user", JSON.stringify(res.data.loginUser));
      router.push("/perfil");
    } catch (error) {
      alert("Credenciales inválidas");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md bg-[#CC4C0D] text-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Ingresar</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full px-3 py-2 rounded text-black bg-white"
            />
            {errors.email && (
              <p className="text-sm text-white">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Contraseña
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded text-black bg-white"
            />
            {errors.password && (
              <p className="text-sm text-white">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-[#CC4C0D] font-semibold py-2 px-4 rounded hover:bg-orange-100"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
