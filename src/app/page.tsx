import Link from "next/link"

export default function Home() {
  return (
    <>
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col  gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">One stop <br/> Repair Shop</h1>
          <address>
            420 Wonderland Road<br/>
            Wonderland, 420420
          </address>
          <p>
            Open Daily: 9am to 5pm
          </p>
          <Link href="tel:420420420" className="hover:underline">420-420420</Link>
        </div>
      </main>
    </div>
    </>
  );
}
