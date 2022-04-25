import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, PeopleListing } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home",
      },
      {
        icon: "people",
        path: "/people",
        label: "pessoas",
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/people" element={<PeopleListing />} />
      <Route path="/people/detail/:id" element={<p>detail</p>} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};