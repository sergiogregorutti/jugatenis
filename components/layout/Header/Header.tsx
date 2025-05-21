"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import Container from "@/components/layout/Container/Container";

interface User {
  name: string;
  email?: string;
}

const Header = ({ user }: { user: User | null }) => {
  const isAuth = user ? user : false;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="sticky h-[60px] bg-[#CC4C0D] top-[0] z-[9999]">
      <Container>
        <div className="flex h-[60px] justify-center xl:justify-between items-center">
          <div className="flex gap-8">
            <h1 className="m-0 h-[40px]">
              <Link className="relative inline-block" href="/">
                <Image
                  src="/assets/logo.svg"
                  width={96}
                  height={40}
                  alt="Devs Learning"
                />
              </Link>
            </h1>
            <div className="hidden xl:flex gap-5 items-center">
              <ul className="flex gap-3">
                <li>
                  <Link
                    href="/courses"
                    className="text-white text-lg py-[5px] px-[20px] hover:bg-[#af3e06] rounded-md focus:outline-none transition-all duration-500"
                  >
                    Jugadores
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="text-white text-lg py-[5px] px-[20px] hover:bg-[#af3e06] rounded-md focus:outline-none transition-all duration-500"
                  >
                    Clubes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden xl:flex gap-5 items-center">
            {isAuth ? (
              <div>
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#fff" }}
                >
                  Salir
                </span>
              </div>
            ) : (
              <ul className="flex gap-2">
                <li>
                  <Link
                    href="/ingresar"
                    className="text-white text-lg py-[5px] px-[20px] hover:bg-[#af3e06] rounded-md focus:outline-none transition-all duration-500"
                  >
                    Ingresar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registrarse"
                    className="text-white text-lg py-[5px] px-[20px] font-semibold bg-[#bad613] hover:bg-[#d3f02a] rounded-md focus:outline-none transition-all duration-500"
                  >
                    Registrarse
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        <button
          className="flex absolute justify-center items-center top-[9px] right-[12px] p-[10px] xl:hidden"
          onClick={toggleMobileMenu}
        >
          <FaBars className="fill-white text-xl" />
        </button>

        <div
          className={`h-[100vh] h-[100svh] pb-[80px] flex opacity-0 invisible transition-all bg-white fixed left-0 top-0 w-[100%] flex-col justify-between items-center xl:hidden ${
            showMobileMenu ? "opacity-100 visible" : ""
          }`}
        >
          <div className="w-[100%] flex relative flex-col grow">
            <div className="absolute flex top-0 right-0 justify-end w-[60px]">
              <button
                className="mt-[10px] mr-[12px]"
                onClick={toggleMobileMenu}
              >
                <Image
                  src="/assets/icons/close.svg"
                  width={40}
                  height={40}
                  alt="Close"
                  className="fill-white text-4xl"
                />
              </button>
            </div>
            <div className="flex items-center flex-col grow">
              <div className="h-[60px] w-[100%] flex justify-center items-center bg-[#CC4C0D]">
                <Link href="/">
                  <Image
                    src="/assets/logo.svg"
                    width={96}
                    height={40}
                    alt="Jugá Tenis"
                    onClick={toggleMobileMenu}
                    className="inline-block"
                  />
                </Link>
              </div>

              <div className="w-[100%] grow flex flex-col justify-center">
                <ul className="w-[100%] list-none p-0 flex flex-col justify-center">
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href="/"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href="/cursos"
                    >
                      Jugadores
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href="/cursos"
                    >
                      Clubes
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block w-[100%] no-underline p-[10px_0] text-2xl"
                      href="/ingresar"
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li
                    className="relative text-center"
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      className="inline-block no-underline p-[10px_0] text-2xl text-white w-auto px-5 py-1 font-semibold bg-[#bad613] mt-3 rounded-md"
                      href="/registrarse"
                    >
                      Registrarse
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
