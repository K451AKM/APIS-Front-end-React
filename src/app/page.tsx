import HeaderPrincipal from "@/app/components/headers/headerPrincipal";

export default function HomePage() {
  return (
    <>
      <HeaderPrincipal />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
        <p className="text-xl text-gray-600">Gracias por visitar nuestra aplicación.</p>
      </main>
    </>
  );
}
