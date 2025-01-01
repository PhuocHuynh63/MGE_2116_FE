'use client';

import { Title } from '@/components/Title';
import { DATA_POINTS } from '@/types/IPage';
import { Table, TableColumnsType, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import userService from '@/apiRequests/user';

const DataPointsPage = (props: DATA_POINTS.IDataPointsPage) => {
    const columns: TableColumnsType<DATA_POINTS.IDataType> = [
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
        },
        {
            title: 'POINTS',
            dataIndex: 'points',
        },
    ];


    const [pagination, setPagination] = useState({
        current: props.data.data?.meta.current || 1,
        pageSize: props.data.data?.meta.pageSize || 15,
        total: props.data.data?.meta.totalItem || 0,
    });

    /**
     * Take data from props and set it to state
     */
    const [data, setData] = useState<DATA_POINTS.IDataType[]>([]);
    useEffect(() => {
        const initialData = props?.data?.data?.results?.map((item: { id: string; ingame: string; points: number; }, index: number) => ({
            key: index,
            no: index + 1,
            ingame: item.ingame,
            id: item.id,
            points: item.points,
        }));
        setData(initialData || []);
    }, [props]);


    const handleTableChange: TableProps<DATA_POINTS.IDataType>['onChange'] = async (pagination) => {
        try {
            const { current, pageSize } = pagination;

            // Gọi API để lấy dữ liệu mới
            const response: any = await userService.getAllUser(current || 1, pageSize || 15);

            // Cập nhật dữ liệu bảng
            const newData = response?.data?.results?.map((item: { id: string; ingame: string; points: number; }, index: number) => ({
                key: index,
                no: index + 1 + ((current || 1) - 1) * (pageSize || 15),
                ingame: item.ingame,
                id: item.id,
                points: item.points,
            }));

            setData(newData || []);
            setPagination({
                current: response?.data?.meta.current || current,
                pageSize: response?.data?.meta.pageSize || pageSize,
                total: response?.data?.meta.totalItem || 0,
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    //-------------------------------End-----------------------------------//

    return (
        <div className="data-points" style={{ margin: '0 25px' }}>
            <Title className="title">TOTAL POINT MEMBER 2116</Title>

            <div className="search d-flex justify-content-end">
                <input type="text" className="search" placeholder="Search..." />
            </div>
            <Table<DATA_POINTS.IDataType>
                className="custom-table"
                columns={columns}
                dataSource={data}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '15', '20', '50'],
                }}
                onChange={handleTableChange}
                bordered={true}
            />
        </div>
    );
};

export default DataPointsPage;
