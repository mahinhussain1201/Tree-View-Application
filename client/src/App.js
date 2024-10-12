import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TreeView from "./components/TreeView";
import ItemDetails from "./components/ItemDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  const [selectedGodownId, setSelectedGodownId] = useState(null);
  const [selectedGodownName, setSelectedGodownName] = useState("");

  const handleGodownSelect = (godownId, godownName) => {
    console.log("Selected Godown ID:", godownId);
    console.log("Selected Godown Name:", godownName);
    setSelectedGodownId(godownId);
    setSelectedGodownName(godownName);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
              <TreeView onSelectGodown={handleGodownSelect} />

              {selectedGodownId ? (
                <ItemDetails
                  godownId={selectedGodownId}
                  godownName={selectedGodownName}
                />
              ) : (
                <Typography variant="h3" sx={{ mt: 10, color: "#1A1A1A" }}>
                  Select a godown to view items
                </Typography>
              )}
            </Box>
          </ProtectedRoutes>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
