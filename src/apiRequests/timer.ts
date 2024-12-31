import http from "@/utils/http/http";

const timerService = {
    getTimerActive: (selectedFields: string) => {
        return http.get(`timer/timer-active?selectedFields=${selectedFields}`);
    },
    getTimerCompleted: () => {
        return http.get('timer/timer-complete-desc');
    },
    setTimer: (data: any) => {
        return http.post('timer/set-timer', data);
    },
    updateStatusTimer: () => {
        return http.put('timer/update/status-timer', {});
    }
}

export default timerService;