import React, { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import AddPropertyForm from "../components/AddPropertyForm";
import PropertyModal from "../components/PropertyModal";
import { getProperties, addProperty } from "../api/propertyService";
import { toast } from "react-toastify";

function Home() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const fetchData = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
      setFiltered(data);
    } catch (error) {
      toast.error("Unable to fetch properties. Check the server.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (newProperty) => {
    try {
      await addProperty(newProperty);
      toast.success("Property added successfully!");
      await fetchData();
    } catch (error) {
      toast.error("Failed to add property.");
    }
  };

  const handleFilter = () => {
    let result = properties.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
    );

    if (filterType) {
      result = result.filter(
        (p) => p.type.toLowerCase() === filterType.toLowerCase()
      );
    }

    setFiltered(result);
  };

  useEffect(() => {
    handleFilter();
  }, [search, filterType, properties]);

  return (
    <div className="main-container">
      <div className="form-section">
        <AddPropertyForm onAdd={handleAdd} />
      </div>

      <div className="property-section">
        <div className="filter-bar">
          <input
            placeholder="Search by name or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        <PropertyList properties={filtered} onView={setSelected} />
        <PropertyModal property={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}

export default Home;
