import React from "react";
import { Routes, Route } from "react-router-dom";

import { Projects } from "./pages/projects";
import { Project } from "./pages/project";
import { Cabinet } from "./pages/cabinet";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/projects/:projectId" element={<Project />} />
      <Route path="/cabinets/:cabinetId" element={<Cabinet />} />
    </Routes>
  );
}
