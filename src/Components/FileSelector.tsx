import React, { useState, useEffect } from 'react';
import "./FileSelector.css";



interface Props {
    fetchFiles: () => Promise<string[]>;
    onFileSelect: (filename: string, userName: string) => void;
    userName: string;
}
const FileSelector: React.FC<Props> = ({ fetchFiles, onFileSelect, userName }) => {

    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        fetchFiles().then(setFiles);
        //setFiles(f);
    }, [fetchFiles]);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        onFileSelect(e.target.value, userName);
    }

    return (
        <div>
            <label >SELECT A SHEET</label>
            <select onChange={handleChange}>
                {files.map(f =>
                    <option key={f} value={f}>{f}</option>
                )}
            </select>
        </div>
    );
}
export default FileSelector;