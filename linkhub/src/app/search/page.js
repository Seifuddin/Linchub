"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState("");

  useEffect(() => {
    setSelectedComputer(""); // Reset selection when search results change
  }, [computers]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://linkhub-798k.onrender.com/search_computers?name=${searchTerm}`);
      if (!res.ok) throw new Error("Failed to fetch computers");

      const data = await res.json();
      setComputers(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSell = async () => {
    if (!selectedComputer) {
      alert("Please select a computer to sell.");
      return;
    }

    try {
      const res = await fetch(`https://linkhub-798k.onrender.com/delete_computer/${selectedComputer}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete computer");

      alert("Computer sold successfully!");
      setComputers(computers.filter((comp) => comp.id !== selectedComputer));
      setSelectedComputer("");
    } catch (error) {
      console.error(error);
      alert("Error selling computer.");
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Search Computers</h1>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col sm:flex-row items-center gap-4">
        <Input
          className="w-full flex-1 p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading && <Loader className="mt-4 text-white animate-spin" size={32} />}

      {/* Search Results */}
      <div className="mt-6 w-full max-w-4xl">
        {computers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {computers.map((comp) => (
              <Card key={comp.id} className="p-4 rounded-lg bg-white shadow-md border-l-4 border-blue-500">
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="selectedComputer"
                      value={comp.id}
                      checked={selectedComputer === comp.id}
                      onChange={() => setSelectedComputer(comp.id)}
                      className="mt-1"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-blue-600">{comp.brand} - {comp.name}</h2>
                      <p className="text-gray-700">Serial: {comp.serial}</p>
                      <p className="text-gray-600">Processor: {comp.processor}</p>
                      <p className="text-gray-600">RAM: {comp.ram}, Capacity: {comp.capacity}</p>
                      <p className="text-gray-700 font-medium">Shelf: {comp.shelf}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-white mt-4 text-center">No results found.</p>
        )}
      </div>

      {/* Sell Button - Ensure Center Alignment */}
      {computers.length > 0 && (
        <div className="mt-6 flex justify-center w-full">
          <Button
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            onClick={handleSell}
          >
            Sell Selected
          </Button>
        </div>
      )}
    </div>
  );
}