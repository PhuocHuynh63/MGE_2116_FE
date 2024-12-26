'use client'

import { Title } from '@/components/Title';
import { Table, TableColumnsType, TableProps } from 'antd';

interface DataType {
    key: React.Key;
    no: number;
    ingame: string;
    id: number;
    points: number;
}



const DataPointsPage = () => {
    const columns: TableColumnsType<DataType> = [
        {
            title: 'NO',
            dataIndex: 'no',
        },
        {
            title: 'Ingame',
            dataIndex: 'ingame',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 3,
            },
        },
        {
            title: 'POINTS',
            dataIndex: 'points',
            sorter: {
                compare: (a, b) => a.points - b.points,
                multiple: 2,
            },
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            no: 1,
            ingame: 'John Brown',
            id: 98,
            points: 60,
        },
        {
            key: '2',
            no: 2,
            ingame: 'Jim Green',
            id: 98,
            points: 66,
        },
        {
            key: '3',
            no: 3,
            ingame: 'Joe Black',
            id: 98,
            points: 90,
        },
        {
            key: '4',
            no: 4,
            ingame: 'Jim Red',
            id: 88,
            points: 99,
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    return (
        <div className="data-points container">
            <Title className="title">TOTAL POINT MEMBER 2116</Title>

            <div className="search d-flex justify-content-end">
                <input type="text" className='search' />
            </div>
            <Table<DataType> columns={columns} dataSource={data} onChange={onChange}  bordered={true} />
        </div>
    )
}

export default DataPointsPage