import http from "@/utils/http/http";

const timerService = {
    getTimer: () => {
        return http.get('timer/timer-active');
    },
    setTimer: (data: any) => {
        return http.post('timer/set-timer', data);
    },
    updateStatusTimer: () => {
        return http.put('timer/update/status-timer', {});
    }
}

export default timerService;