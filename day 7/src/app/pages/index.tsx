import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-white">
      <section className="relative bg-gray-100">
        <div className="container mx-auto px-6">
          <Image
            src="/hero-banner.jpg"
            alt="Nike Air Max Pulse"
            width={1920}
            height={800}
            className="rounded-md"
          />
          <h1 className="text-4xl font-bold mt-6">Nike Air Max Pulse</h1>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded">
            Shop Now
          </button>
        </div>
      </section>
    </main>
  );
}
