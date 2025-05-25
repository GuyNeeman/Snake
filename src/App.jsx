import './App.css';
import { useState } from "react";
import Grid from "./Comp/Grid.jsx";

function App() {
    const [inputs, setInputs] = useState({
        width: 35,
        height: 35
    });
    const [position, setPosition] = useState({
        x: 105,
        y: 350
    });

    return (<Grid></Grid>);
}

export default App;