import React from "react";
import "./modal.css";

function PropertyModal({ property, onClose }) {
  if (!property) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <img src={property.image || "/images/no-image.png"} alt={property.name} />
        <h2>{property.name}</h2>
        <p><b>Type:</b> {property.type}</p>
        <p><b>Price:</b> {property.price}</p>
        <p><b>Location:</b> {property.location}</p>
        <p><b>Description:</b> {property.description}</p>
      </div>
    </div>
  );
}

export default PropertyModal;
