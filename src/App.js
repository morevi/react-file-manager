import React, { useState, useEffect } from 'react';
import { FileManager } from './components/FileManager';

const url = 'http://localhost:5000/list'

export function App() {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (data) => {
                    data.files.sort()
                    setFileList(data.files);
                },
                (error) => {
                    setFileList([])
                }
            );
    }, []);

    return (<FileManager files={fileList} />);
}

