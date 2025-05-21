import Container from "@/components/layout/Container/Container";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#CC4C0D]">
          Bienvenidos a Jugá Tenis
        </h1>
        <p>
          Estamos trabajando para armar un nuevo sitio para todos los amantes
          del tenis
        </p>
      </div>
    </Container>
  );
}
