import React from "react";
import SegmentForm from "./form";
import { MdArrowBackIosNew } from "react-icons/md";

const App = () => {
  return (
    <div>
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
      <SegmentForm />
    </div>
  );
};

export default App;
    