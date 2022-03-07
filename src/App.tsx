import React from "react";
import Box from "@mui/material/Box";
import Navigation from "./common/components/navigation";
import Paper from "@mui/material/Paper";

function App() {
    return (
        <Box className="App">
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <Navigation />
            </Paper>
        </Box>
    );
}

export default App;
