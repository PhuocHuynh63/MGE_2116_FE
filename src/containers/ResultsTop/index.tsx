'use client'

import { Title } from '@/components/Title';
import { RESULTS_TOP } from '@/types/IPage';
import { Modal, Table, TableColumnsType } from 'antd';
import { useTimeLeft } from '@/utils/hooks/TimeLeft';
import { formatDate } from '@/utils/helpers/date';
import { Button } from '@/components/Button';
import { useState } from 'react';
import '@styles/main/result-top.style.scss'

interface DataType {
    key: number;
    top: number;
    ingame: string;
    id: string;
    points: number;
    date: string
}



const ResultsTopPage = (props: RESULTS_TOP.IResultsTopPage) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };


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

    const data: DataType[] = props?.timerCompleted?.data?.users?.map((item, index) => {
        return {
            key: index,
            top: index + 1,
            ingame: item.ingame,
            id: item.id,
            points: item.points,
            date: formatDate(item?.date)
        }
    }) || []

    const timerLeft = useTimeLeft(props?.timer)


    return (
        <div className="results-top" style={{ margin: '0 25px 50px 25px' }}>
            <Title className="title">LIST MEMBER BID SUCCES</Title>

            {props?.timer?.data?.statusCode === 200 ?
                <div className="count-time">
                    <h1 className='coming-soon'>COMING SOON</h1>
                    <h2 className='time'>
                        <div className="day">
                            <span className="number">{timerLeft?.days}</span><span className="text">DAY</span>
                        </div>
                        <div className="hr">
                            <span className="number">{timerLeft?.hours}</span><span className="text">HR</span>
                        </div>
                        <div className="min">
                            <span className="number">{timerLeft?.minutes}</span><span className="text">MIN</span>
                        </div>
                        <div className="sec">
                            <span className="number">{timerLeft?.seconds}</span><span className="text">SEC</span>
                        </div>
                    </h2>
                </div>
                :
                <>
                    <Table<DataType> className='custom-table' columns={columns} dataSource={data} pagination={false} />
                    <Button timeDelay={900} onClick={showModal}>King Confirm</Button>
                    <Modal
                        title="King Confirm"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <input type="text" className='input-king-confirm' />
                    </Modal>
                </>
            }
        </div>
    )
}

export default ResultsTopPage