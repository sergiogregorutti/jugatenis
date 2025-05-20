import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): User!
    loginUser(input: LoginUserInput!): User!
  }

  input RegisterUserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
  }
`;

const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const resolvers = {
  Query: {
    hello: () => "Hola desde GraphQL 👋",
  },
  Mutation: {
    registerUser: async (_: any, { input }: any) => {
      try {
        const { name, email, password } = registerSchema.parse(input);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          throw new Error("El email ya está registrado");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0]?.message || "Datos inválidos");
        }
        throw error;
      }
    },
    loginUser: async (_: any, { input }: any) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Credenciales inválidas");
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new Error("Credenciales inválidas");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);
export { handler as GET, handler as POST };
