import http from "@/utils/http/http";

const historyService = {
    getHistoryLimitNine: () => {
        return http.get('history');
    },
}

export default historyService;