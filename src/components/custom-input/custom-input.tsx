import { useState, useContext } from 'react';
import { DataContext } from '../../contexts/data-context';
import Papa from 'papaparse';

// Allowed extensions for input file
const allowedExtensions: string[] = ['csv'];

function CustomInput() {
    // This state will store the parsed data
    const [data, setData] = useContext(DataContext);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState('');

    // It will store the file uploaded by the user
    const [file, setFile] = useState();

    // This function will be called when
    // the file input changes
    const handleFileChange = (e: any) => {
        setError('');
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split('/')[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError('Please input a csv file');
                return;
            }
            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError('Enter a valid file');

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }: any) => {
            const csv = Papa.parse(target.result, {
                header: true,
            });
            const parsedData: any = csv?.data;
            const fractionParsedData: any = [];
            for (let i = 0; i < parsedData.length; i++) {
                fractionParsedData.push(parsedData[i]);
            }
            setData(fractionParsedData);
        };
        reader.readAsText(file);
    };
    return (
        <div className="p-5">
            <label htmlFor="csvInput" className="block">
                Please provide a csv file to parse and compute
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
            />
            <div className="mt-3">
                <button
                    onClick={handleParse}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
                >
                    Parse
                </button>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
}

export default CustomInput;
