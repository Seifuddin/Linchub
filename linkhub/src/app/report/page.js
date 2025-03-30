"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function SoldLaptopsPage() {
  const [soldLaptops, setSoldLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSoldLaptops() {
      try {
        const res = await fetch("http://localhost:5000/sold_laptops"); // Backend API
        if (!res.ok) throw new Error("Failed to fetch sold laptops");

        const data = await res.json();
        setSoldLaptops(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching sold laptops.");
      } finally {
        setLoading(false);
      }
    }

    fetchSoldLaptops();
  }, []);

  return (
    <div className=" bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Dispatched Laptops Report</h1>

      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : soldLaptops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {soldLaptops.map((laptop) => (
            <Card key={laptop.id} className="p-4 bg-white shadow-md border-l-4 border-green-500">
              <CardContent>
                <h2 className="text-lg font-semibold text-blue-600">
                  {laptop.brand} - {laptop.name}
                </h2>
                <p className="text-gray-700">Serial: {laptop.serial}</p>
                <p className="text-gray-600">Processor: {laptop.processor}</p>
                <p className="text-gray-600">RAM: {laptop.ram}, Capacity: {laptop.capacity}</p>
                <p className="text-gray-700 font-medium">Sold On: {laptop.sold_date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-4">No sold laptops found.</p>
      )}
    </div>
  );
}