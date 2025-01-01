import http from "@/utils/http/http";

const timerService = {
    getTimerActive: (selectedFields: string) => {
        return http.get(`timer/timer-active?selectedFields=${selectedFields}`);
    },
    getTimerPending: (sort: string) => {
        return http.get(`timer/timer-pending?sort=${sort}`);
    },
    setTimer: (data: any) => {
        return http.post('timer/set-timer', data);
    },
    updateStatusTimerToPending: () => {
        return http.put('timer/update/status-timer-pending', {});
    }
}

export default timerService;