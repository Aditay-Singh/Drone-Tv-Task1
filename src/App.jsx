

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch properties
  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/properties");
      setProperties(res.data);
    } catch {
      toast.error("Failed to fetch properties");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties safely
  useEffect(() => {
    const result = properties
      .filter(
        (p) =>
          (p.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
          (p.location ?? "").toLowerCase().includes(search.toLowerCase())
      )
      .filter(
        (p) =>
          !filterType ||
          (p.type ?? "").toLowerCase() === filterType.toLowerCase()
      );
    setFilteredProperties(result);
  }, [search, filterType, properties]);

  // Handle image upload and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Add new property
  const addProperty = async (e) => {
    e.preventDefault();
    if (!form.title || !form.type || !form.price || !form.image) {
      toast.warn(" Please fill all required fields!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/properties", form);
      toast.success(" Property added successfully!");
      setForm({
        title: "",
        type: "",
        location: "",
        price: "",
        image: "",
        description: "",
      });
      fetchProperties();
    } catch {
      toast.error(" Failed to add property");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-gray-100 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="blob animate-blob bg-purple-500/40"></span>
        <span className="blob animate-blob animation-delay-2000 bg-pink-500/40"></span>
        <span className="blob animate-blob animation-delay-4000 bg-blue-500/40"></span>
      </div>

      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-gray-600 py-4 px-6 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
          Property Dashboard
        </h1>
        <button
          onClick={fetchProperties}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition neon-hover"
        >
          Refresh 
        </button>
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar Form */}
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white/10 backdrop-blur-lg border-r border-gray-600 p-6 shadow-xl rounded-xl m-4">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
             Add Property
          </h2>
          <form onSubmit={addProperty} className="space-y-4">
            <input
              type="text"
              placeholder="Property Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 bg-white/20 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Type (House/Flat/Villa)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-3 bg-white/20 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full p-3 bg-white/20 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-3 bg-white/20 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <label className="block mb-2 text-gray-200 font-medium">
  Choose image from your computer
</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 bg-white/20 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 bg-white/20 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-3 rounded-lg font-semibold transition neon-hover"
            >
              Add Property
            </button>
          </form>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 z-10 relative">
            <input
              type="text"
              placeholder="Search by title or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 rounded-lg bg-white/20 border border-gray-500 focus:ring-2 focus:ring-blue-400 outline-none flex-1"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-3 rounded-lg bg-white/20 border border-gray-500 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          {/* Property Cards */}
          {filteredProperties.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">
              No properties match your search.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="relative bg-white/10 backdrop-blur-md border border-gray-500 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 neon-card"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-48 w-full object-cover"
                  />
                  {/* Type badge */}
                  <span className="absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
                    {property.type}
                  </span>
                  <div className="p-5">
                    <h3 className="text-xl font-bold truncate">{property.title}</h3>
                    <p className="text-gray-300 text-sm">{property.location}</p>
                    <p className="mt-3 text-blue-400 font-semibold text-lg">
                      ₹{property.price}
                    </p>
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition neon-hover"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white/90 p-6 rounded-2xl max-w-md w-full relative shadow-lg animate-fadeIn neon-card">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg neon-hover"
            >
              Close
            </button>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-500 mb-2">
              {selectedProperty.title}
            </h2>
            <p className="text-gray-700 mb-1">
              <b>Type:</b> {selectedProperty.type}
            </p>
            <p className="text-gray-700 mb-1">
              <b>Location:</b> {selectedProperty.location}
            </p>
            <p className="text-gray-700 mb-1">
              <b>Price:</b> ₹{selectedProperty.price}
            </p>
            <p className="text-gray-600 mt-2">{selectedProperty.description}</p>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
