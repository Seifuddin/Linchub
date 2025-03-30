import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow-md">
          Welcome to <span className="text-blue-600">Linkhub Laptops</span>
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl">
          Your one-stop destination for high-quality laptops. Find the best deals and
          experience premium service today.
        </p>
        <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all">
          Explore Now
        </button>
      </div>
    </main>
  );
}