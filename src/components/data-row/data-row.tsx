import './data-row.scss';

interface DataRowProps {
    data: [string, number, number][];
    type: string;
    count: number;
    missing: [];
}

const TITLE_MAP: { [key: string]: string } = {
    make: 'Make',
    model: 'Model',
    class: 'Vehicle Class',
};

const SUBTITLE_MAP: { [key: string]: string } = {
    make: 'Company of the vehicle',
    model: 'Car Model',
    class: 'Class of vehicle depending on their utility, capacity, and weight',
};

function DataRow({ data, type, count, missing }: DataRowProps) {
    const ready = data.length > 1;
    if (type !== 'model') console.log('data', data);
    return (
        <div className="flex">
            {ready && (
                <>
                    <div className="basis-5/12 p-5">
                        <h5 className="font-bold">{TITLE_MAP[type]}</h5>
                        <h5>{SUBTITLE_MAP[type]}</h5>
                        {type !== 'model' ? (
                            <>
                                <div className="flex justify-between">
                                    <p>{ready && data[data.length - 2][0]}</p>
                                    <p>{ready && Math.round(data[data.length - 2][2])}%</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>{ready && data[data.length - 1][0]}</p>
                                    <p>{ready && Math.round(data[data.length - 1][2])}%</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-slate-400">
                                        Other (
                                        {ready &&
                                            count -
                                                data[data.length - 1][1] -
                                                data[data.length - 2][1]}
                                        )
                                    </p>
                                    <p>
                                        {ready &&
                                            Math.round(
                                                ((count -
                                                    data[data.length - 1][1] -
                                                    data[data.length - 2][1]) /
                                                    count) *
                                                    100,
                                            )}
                                        %
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div>
                                <h3 className="text-2xl text-blue-500 font-bold">{data.length}</h3>
                                <p className="font-bold">Unique values</p>
                            </div>
                        )}
                    </div>
                    <div className="basis-7/12 p-5">
                        <div className="flex w-full h-3">
                            <div
                                className="bg-green-400"
                                style={{ width: `${((count - missing.length) / count) * 100}%` }}
                            ></div>
                            <div className="bg-orange-400" style={{ width: '0%' }}></div>
                            <div
                                className="bg-red-400"
                                style={{ width: `${(missing.length / count) * 100}%` }}
                            ></div>
                        </div>
                        <div>
                            Valid <div className="square green"></div>: {count - missing.length}
                        </div>
                        {/* Wasn't so sure about this one */}
                        <div>
                            Mismatched <div className="square orange"></div>: 0
                        </div>
                        <div>
                            Missing <div className="square red"></div>: {missing.length}
                        </div>
                        <div>Unique: {data.length}</div>
                        <div>
                            Most Common {type}: {ready && data[data.length - 1][0]}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default DataRow;
