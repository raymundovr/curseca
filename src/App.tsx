import React from "react";
import Box from "@mui/material/Box";
import Navigation from "./common/components/Navigation";
import Paper from "@mui/material/Paper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Box className="App" sx={{p: 2}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Catálogo</h1>} />
                    <Route path="/mis-cursos" element={<h1>Mis Cursos</h1>} />
                </Routes>
                <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <Navigation />
            </Paper>
            </BrowserRouter>
            
        </Box>
    );
}

export default App;
