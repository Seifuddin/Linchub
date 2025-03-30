import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-blue-600">Welcome to Lapsa AI</h1>
      </div>
    </main>
  );
}