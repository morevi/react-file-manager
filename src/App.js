import React, { useState, useEffect } from 'react';
import { FileManager } from './components/FileManager';

const url = 'http://localhost:5000/list';
const fakeList = ([
    "storage/carpeta/",
    "storage/carpeta/archivo.zip",
    "storage/archivo_1.zip",
    "storage/archivo_2.gpg",
    "storage/carpeta/mas_carpetas/",
    "storage/carpeta/mas_carpetas/archivo.asc",
]).sort();

export function App() {
    const [fileList, setFileList] = useState(fakeList);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (data) => {
                    data.files.sort()
                    setFileList(data.files);
                },
                (error) => {
                    setFileList(fakeList)
                }
            );
    }, []);

    return (<FileManager files={fileList} />);
}

