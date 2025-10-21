import React from "react";

function PropertyCard({ property, onView }) {
  return (
    <div className="card">
      <img src={property.image || "/images/no-image.png"} alt={property.name} />
      <h3>{property.name}</h3>
      <p><b>Type:</b> {property.type}</p>
      <p><b>Location:</b> {property.location}</p>
      <p><b>Price:</b> {property.price}</p>
      <button onClick={() => onView(property)}>View</button>
    </div>
  );
}

export default PropertyCard;
