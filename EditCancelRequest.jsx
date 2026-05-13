import React, { useEffect, useState } from "react";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    bloodGroup: "",
    location: "",
  });

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8000/request");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Delete request
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/request/${id}`, {
        method: "DELETE",
      });

      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Open edit mode
  const handleEditClick = (req) => {
    setEditingId(req.id);

    setFormData({
      bloodGroup: req.bloodGroup,
      location: req.location,
    });
  };

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update request
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:8000/request/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setEditingId(null);
      fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div>
      <h2>Requests</h2>

      {requests.map((req) => (
        <div key={req.id}>
          {editingId === req.id ? (
            <>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Group"
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />

              <button onClick={handleUpdate}>Save</button>

              <button onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>{req.bloodGroup}</p>
              <p>{req.location}</p>

              <button onClick={() => handleEditClick(req)}>
                Edit
              </button>

              <button onClick={() => handleDelete(req.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Request;