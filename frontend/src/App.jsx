import { useEffect, useState } from "react";
import "./App.css";
import { GetTabs, ActivateTab } from "../wailsjs/go/main/App";

function App() {
    const [tabs, setTabs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        GetTabs().then(setTabs);
    }, []);

    const filtered = tabs.filter(tab =>
        tab.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Browser Tab Switcher</h1>
            <input
                type="text"
                placeholder="Search tabs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search"
            />
            <ul>
                {filtered.map((tab) => (
                    <li key={tab.id} onClick={() => ActivateTab(tab.id)}>
                        <strong>{tab.title}</strong>
                        <div className="url">{tab.url}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

