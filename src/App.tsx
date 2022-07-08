import CustomInput from './components/custom-input/custom-input';
import Table from './components/table/table';
import { DataProvider } from './contexts/data-context';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <DataProvider>
                <CustomInput />
                <Table />
            </DataProvider>
        </div>
    );
};

export default App;
