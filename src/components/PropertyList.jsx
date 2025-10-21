import React from "react";
import PropertyCard from "./PropertyCard";

function PropertyList({ properties, onView }) {
  if (properties.length === 0) return <p>No properties found 😢</p>;
  return (
    <div className="card-list">
      {properties.map((p) => <PropertyCard key={p.id} property={p} onView={onView} />)}
    </div>
  );
}

export default PropertyList;
