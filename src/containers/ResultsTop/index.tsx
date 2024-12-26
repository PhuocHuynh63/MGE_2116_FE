'use client'

import { Title } from '@/components/Title';
import { Table, TableColumnsType, TableProps } from 'antd';

interface DataType {
    key: React.Key;
    top: number;
    ingame: string;
    id: number;
    points: number;
    date: string
}



const ResultsTopPage = () => {
    const columns: TableColumnsType<DataType> = [
        {
            title: 'TOP',
            dataIndex: 'top',
        },
        {
            title: 'Ingame',
            dataIndex: 'ingame',
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Points',
            dataIndex: 'points',
        },
        {
            title: 'Date (YYYY/MM/DD HH:MM:SS)',
            dataIndex: 'date',
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            top: 1,
            ingame: 'John Brown',
            id: 98,
            points: 60,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '2',
            top: 2,
            ingame: 'Jim Green',
            id: 98,
            points: 66,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '3',
            top: 3,
            ingame: 'Joe Black',
            id: 98,
            points: 90,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '4',
            top: 4,
            ingame: 'Jim Red',
            id: 98,
            points: 60,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '5',
            top: 5,
            ingame: 'Jim Brown',
            id: 98,
            points: 60,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '6',
            top: 6,
            ingame: 'Jim Green',
            id: 98,
            points: 66,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '7',
            top: 7,
            ingame: 'Joe Black',
            id: 98,
            points: 90,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '8',
            top: 8,
            ingame: 'Jim Red',
            id: 98,
            points: 60,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '9',
            top: 9,
            ingame: 'Jim Brown',
            id: 98,
            points: 60,
            date: '2021-09-10 10:00:00'
        },
        {
            key: '10',
            top: 10,
            ingame: 'Jim Green',
            id: 98,
            points: 66,
            date: '2021-09-10 10:00:00'
        },
    ];


    return (
        <div className="data-points container">
            <Title className="title">LIST MEMBER BID SUCCES</Title>

            <Table<DataType> columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}

export default ResultsTopPage