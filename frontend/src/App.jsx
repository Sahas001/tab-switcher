import { useEffect, useRef, useState } from 'react';
import { GetTabs, ActivateTab } from '../wailsjs/go/main/App';
import './App.css';

export default function App() {
    const inputRef = useRef(null);
    const [tabs, setTabs] = useState([]);
    const [query, setQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    useEffect(() => {
        inputRef.current?.focus();
        GetTabs()
            .then((t) => {
                console.log('Tabs loaded:', t);
                setTabs(t);
            })
            .catch((err) => {
                console.error('Error loading tabs:', err);
            });
    }, []);

    const filteredTabs = tabs.filter((tab) =>
        tab.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && filteredTabs.length > 0) {
            const topMatch = filteredTabs[highlightedIndex];
            console.log('Activating tab:', topMatch);
            ActivateTab(topMatch.id)
                .then(() => console.log('Tab activated'))
                .catch((err) => console.error('Activation failed:', err));
        }

        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) =>
                prevIndex + 1 < filteredTabs.length ? prevIndex + 1 : prevIndex
            );
        }

        if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }
    };

    return (
        <div style={{ padding: 20, background: '#111', height: '100vh', color: '#fff', marginTop: '5px' }}>
            <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search tabs..."
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    background: '#222',
                    color: '#fff',
                    border: 'none',
                    marginBottom: '10px',
                }}
            />

            <ul>
                {filteredTabs.map((tab, index) => (
                    <li
                        key={tab.id}
                        onClick={() => {
                            console.log('Activating tab:', tab);
                            ActivateTab(tab.id)
                                .then(() => console.log('Tab activated'))
                                .catch((err) => console.error('Activation failed:', err));
                        }}
                        style={{
                            background: highlightedIndex === index ? '#444' : '#333',
                            padding: '10px',
                            marginBottom: '5px',
                            borderRadius: '4px',
                            listStyle: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {tab.title}
                        <p style={{ fontSize: '12px', color: '#aaa' }}>
                            {tab.url}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

