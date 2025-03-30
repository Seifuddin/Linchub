"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [capacity, setCapacity] = useState("");
  const [shelf, setShelf] = useState("");
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("http://localhost:5000/add_computer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, name, processor, ram, capacity, shelf, serial }),
    });

    const data = await res.json();
    alert(data.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg--100 flex flex-col items-center p-6 mt-14">
      {/* Navigation */}
      <nav className="w-full max-w-3xl bg-white shadow-md p-4 flex justify-between rounded-xl mb-6">
        <h1 className="text-xl font-bold text-orange-600">Computer Inventory</h1>
        <Link href="/search" className="text-blue-500 hover:underline">
          🔍 Search Computers
        </Link>
      </nav>

      {/* Form Card */}
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center">Add a Computer</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <Input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input placeholder="Serial" value={serial} onChange={(e) => setSerial(e.target.value)} />
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Processor" value={processor} onChange={(e) => setProcessor(e.target.value)} />
            <Input placeholder="RAM (e.g., 16GB)" value={ram} onChange={(e) => setRam(e.target.value)} />
            <Input placeholder="Capacity (e.g., 512GB SSD)" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            <Input placeholder="Shelf" value={shelf} onChange={(e) => setShelf(e.target.value)} />
            <Button className="w-full bg-blue-700" type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin" size={20} /> : "Add Computer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}