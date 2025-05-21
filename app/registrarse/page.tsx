"use client";

import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      name
      email
    }
  }
`;

const registerSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function Registrarse() {
  const [registerUser] = useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser({
        variables: {
          input: {
            name: data.nombre,
            email: data.email,
            password: data.password,
          },
        },
      });
      alert("Usuario registrado");
    } catch (error) {
      alert("Error al registrarse");
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md bg-[#CC4C0D] text-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Crear cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-1 text-sm">
              Nombre
            </label>
            <input
              {...register("nombre")}
              type="text"
              id="nombre"
              className="w-full px-3 py-2 rounded text-black bg-white"
            />
            {errors.nombre && (
              <p className="text-sm text-white">{errors.nombre.message}</p>
            )}
          </div>

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
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
