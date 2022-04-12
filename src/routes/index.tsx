import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Button variant='contained' color='secondary'>Botão</Button>}/>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}