import React from "react";
import Box from "@mui/material/Box";
import Navigation from "./common/components/Navigation";
import Catalogue from "./screens/Catalogue";
import Curriculum from "./screens/Curriculum";
import Paper from "@mui/material/Paper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Box className="App" sx={{p: 2}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Catalogue />} />
                    <Route path="/mis-cursos" element={<Curriculum />} />
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
