import React, { useState } from "react";
import "./App.css"; 
import { MdArrowBackIosNew } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import { FaCircle } from "react-icons/fa";

const SegmentForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
    { label: "Add schema to segment", value: "add_new" },
  ]);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [newSchemaName, setNewSchemaName] = useState("");
  const [isAddSchemaOpen, setIsAddSchemaOpen] = useState(false); 

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: schemas,
    };
    console.log("Sending data to server:", data);
    setIsOpen(false);
    setSegmentName("");
    setSchemas([]);
    setAvailableSchemas([
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
      { label: "Gender", value: "gender" },
      { label: "Age", value: "age" },
      { label: "Account Name", value: "account_name" },
      { label: "City", value: "city" },
      { label: "State", value: "state" },
      { label: "Add schema to segment", value: "add_new" }, 
    ]);
  };

  const handleAddSchema = () => {
    if (selectedSchema && selectedSchema !== "add_new") {
      setSchemas((prev) => [
        ...prev,
        {
          [selectedSchema]: availableSchemas.find(
            (schema) => schema.value === selectedSchema
          ).label,
        },
      ]);
      setAvailableSchemas((prev) =>
        prev.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema("");
    } else if (selectedSchema === "add_new") {
      setIsAddSchemaOpen(true); 
    }
  };

  const handleAddNewSchema = () => {
    if (newSchemaName) {
      const newSchemaValue = newSchemaName.toLowerCase().replace(/\s+/g, "_"); 
      setAvailableSchemas((prev) => [
        ...prev,
        { label: newSchemaName, value: newSchemaValue },
      ]);
      setNewSchemaName(""); // Reset new schema name input
      setIsAddSchemaOpen(false); // Close the popup
      setSelectedSchema(newSchemaValue); // Optionally select the new schema
    }
  };

  return (
    <div>
      <button className="btn btn-primary" style={{ margin: "10px" }} onClick={() => setIsOpen(true)}>
        Save segment
      </button>

      {isOpen && (
        <div className="popup">
          <div style={{ height: "90%" }}>
            <div className="popup-header">
              <h3 className="header-title">
                <MdArrowBackIosNew
                  style={{ marginRight: "10px" }}
                  size={30}
                  className="header-icon"
                />
                Save Segment
              </h3>
            </div>
            <p>Enter the Name of the Segment</p>
            <input
              type="text"
              placeholder="Segment Name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <p>
              To Save your segment. You need to add schemas to build the query.
            </p>
            <div>
              <div className="radio-btn">
                <p>
                  <span>
                    <FaCircle
                      style={{ paddingLeft: "2px", color: "blue" }}
                      size={15}
                    />
                  </span>
                  - User Tracks
                </p>
                <p>
                  <span>
                    <FaCircle
                      style={{ paddingLeft: "2px", color: "red" }}
                      size={16}
                    />
                  </span>
                  - Group Tracks
                </p>
              </div>
              <select
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
              >
                <option value=""></option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
              <br />
              {schemas.map((schema, index) => (
                <div key={index}>
                  {Object.entries(schema).map(([key, value]) => (
                    <div key={key}>{value}</div>
                  ))}
                </div>
              ))}
              <p className="add-new-btn" onClick={handleAddSchema}>
                + Add new schema
              </p>
            </div>
          </div>
          <div className="botton-btns">
            <button
              className="btn btn-primary"
              style={{
                marginLeft: "10px",
                backgroundColor: "#04AA6D",
                border: "none",
              }}
              onClick={handleAddSchema}
            >
              Add Schema
            </button>
            <button
              className="btn btn-primary"
              style={{
                marginLeft: "10px",
                backgroundColor: "#04AA6D",
                border: "none",
              }}
              onClick={handleSaveSegment}
            >
              Save the segment
            </button>
            <button
              className="btn btn-light"
              style={{ color: "red", marginLeft: "15px" }}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isAddSchemaOpen && (
        <div className="popup">
          <div className="popup-header">
            <h3 className="header-title">Add New Schema</h3>
          </div>
          <input
            type="text"
            placeholder="Enter new schema name"
            value={newSchemaName}
            onChange={(e) => setNewSchemaName(e.target.value)}
          />
          <button className="btn btn-primary" style={{margin:"10px"}} onClick={handleAddNewSchema}>
            Add Schema
          </button>
          <button className="btn btn-light" style={{ color: "red", marginLeft: "15px" }} onClick={() => setIsAddSchemaOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SegmentForm;

