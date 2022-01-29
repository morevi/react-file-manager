import React, { Fragment, useState, useRef } from 'react';

function isSimplePath(path) {
    return (path.endsWith('/') && path.split('/').length === 2) || path.split('/').length === 1;
}

function filterBy(directory, files) {
    let filtered = [];

    files.forEach((v, i ,files) => {
        let tmp = v.replace(directory, '');

        if (!directory.startsWith(v)) {
            tmp = v.replace(directory, '');
            if (isSimplePath(tmp)) {
                filtered.push(tmp);
            }
        }
    });
    return filtered;
}


export function FileManager({ files }) {
    const [workdir, setWorkDir] = useState('storage/');

    const handleGoUp = () => {
        if (workdir === 'storage/') {
            return;
        }

        let splits = workdir.split('/').filter(e => {
            return e !== '';
        });

        const newWorkdir = splits.slice(0, -1).join('/') + '/';
        setWorkDir(newWorkdir);
    }
    
    let filtered = filterBy(workdir, files);

    return (
        <Fragment>
            <header className="navbar">
                <h1>{workdir}</h1>
                <button onClick={handleGoUp} className="btn btn-primary">GO UP</button>
            </header>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((file) => (
                        <Row key={file}
                            workdir={workdir}
                            setWorkDir={setWorkDir}
                            isDir={file.slice(-1) === '/'}
                            file={file}
                        />
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export function Row({ workdir, setWorkDir, isDir, file }) {
    const fileRef = useRef(null);

    const handleDownload = function () {
        const file = fileRef.current.textContent;
        console.log('http://localhost:5000/download/' + workdir + file);
    }

    const handleGoIn = function () {
        const dir = fileRef.current.textContent;
        setWorkDir(workdir + dir);
    }

    const handleDelete = function () {
        const file = fileRef.current.textContent;
        console.log('http://localhost:5000/delete/' + workdir + file);
    }

    let disabled = true;
    if (!workdir.endsWith(file)) {
        disabled = false;
    }
    
    if (isDir) {
        return (
            <tr>
                <td ref={fileRef}>{file}</td>
                <td>
                    <button onClick={handleGoIn} className="btn btn-link" disabled={disabled}>Go inside</button>
                    <button onClick={handleDelete} className="btn btn-link" disabled>Delete</button>
                </td>
            </tr>
        );

    } else {
        return (
            <tr>
                <td ref={fileRef}>{file}</td>
                <td>
                    <button onClick={handleDownload} className="btn btn-link" disabled>Download</button>
                    <button onClick={handleDelete} className="btn btn-link" disabled>Delete</button>
                </td>
            </tr>
        );
    }
}
