import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {FiUpload} from 'react-icons/fi';
import './styles.css';

interface Props {
    onFileUpload: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setSelectedFileUrl(URL.createObjectURL(file));
        onFileUpload(file);
    }, [onFileUpload]);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/*'});

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*"/>

            {
                selectedFileUrl ?
                <img src={selectedFileUrl} style={{borderRadius: 10}} alt="Point thumbnail" /> :
                (
                    <p>
                        <FiUpload /> 
                        {
                            isDragActive ?
                            "Now drop it!" :
                            "Drag and drop the image from the establishment, or click to select files"
                        }
                    </p>
                )
            }
        </div>
    )
}

export default Dropzone;