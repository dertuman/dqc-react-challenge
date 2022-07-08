import { useContext, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/data-context';
import DataRow from '../data-row/data-row';

function Table() {
    const [data, setData] = useContext(DataContext);
    const [sortedByBrand, setSortedByBrand]: [[string, number, number][], Function] = useState([]);
    const [sortedByModel, setSortedByModel]: [[string, number, number][], Function] = useState([]);
    const [sortedByClass, setSortedByClass]: [[string, number, number][], Function] = useState([]);
    const [count, setCount]: [number, Function] = useState(0);
    const [missingBrands, setMissingBrands]: [[], Function] = useState([]);
    const [missingModels, setMissingModels]: [[], Function] = useState([]);
    const [missingClasses, setMissingClasses]: [[], Function] = useState([]);

    function sortItems(items: {}) {
        let arr = Object.entries(items).sort((a: any, b: any) => a[1] - b[1]);
        arr.map((e: any) => {
            e.push((e[1] / data.length) * 100);
        });
        return arr;
    }

    useMemo(() => {
        setCount(data.length);
        let brands: any = {},
            models: any = {},
            classes: any = {},
            missingBrands: {}[] = [],
            missingModels: {}[] = [],
            missingClasses: {}[] = [];

        for (var i = 0; i < data.length; i++) {
            if (!data[i]['Model']) missingBrands.push(data[i]);
            if (!data[i]['Make']) missingModels.push(data[i]);
            if (!data[i]['Vehicle Class']) missingClasses.push(data[i]);

            // If brand already exists increase
            if (brands.hasOwnProperty(data[i]['Make'])) {
                brands[data[i].Make] = brands[data[i].Make] + 1;
            } else {
                brands[data[i].Make] = 1;
            }

            if (models.hasOwnProperty(data[i]['Model'])) {
                models[data[i]['Model']] = models[data[i]['Model']] + 1;
            } else {
                models[data[i]['Model']] = 1;
            }

            if (classes.hasOwnProperty(data[i]['Vehicle Class'])) {
                classes[data[i]['Vehicle Class']] = classes[data[i]['Vehicle Class']] + 1;
            } else {
                classes[data[i]['Vehicle Class']] = 1;
            }
        }
        setMissingBrands(missingBrands);
        setMissingModels(missingModels);
        setMissingClasses(missingClasses);

        setSortedByBrand(sortItems(brands));
        setSortedByModel(sortItems(models));
        setSortedByClass(sortItems(classes));
    }, [data]);

    return (
        <>
            <DataRow data={sortedByBrand} missing={missingBrands} type="make" count={count} />
            <hr />
            <DataRow data={sortedByModel} missing={missingModels} type="model" count={count} />
            <hr />
            <DataRow data={sortedByClass} missing={missingClasses} type="class" count={count} />
            <hr />
        </>
    );
}

export default Table;
