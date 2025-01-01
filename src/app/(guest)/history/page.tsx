import historyService from '@/apiRequests/result';
import HistoryPage from '@/containers/History'
import { IHistory } from '@/schemaValidations/model.schema';
import React from 'react'

const History = async () => {
    const getHistory = await historyService.getHistoryLimitNine() as IHistory;

    return (
        <HistoryPage
            data={getHistory}
        />
    )
}

export default History