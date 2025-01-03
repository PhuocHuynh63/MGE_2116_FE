import timerService from '@/apiRequests/timer';
import ResultsTopPage from '@/containers/ResultsTop'
import { ITimerCompleted, ITimerLeftActive } from '@/schemaValidations/model.schema';
import { HOME } from '@/types/IPage';

const ResultsTop = async () => {
    let timerActive = null;
    let timerCompleted = null;

    timerActive = await timerService.getTimerActive('-users') as ITimerLeftActive;
    timerCompleted = await timerService.getTimerPending('desc') as ITimerCompleted;

    // Nếu không có dữ liệu, trả về giá trị mặc định
    if (!timerActive || (timerActive.statusCode !== 200 && timerActive.statusCode !== 201)) {
        timerActive = { data: undefined };
    }
    if (!timerCompleted || (timerCompleted.statusCode !== 200 && timerCompleted.statusCode !== 201)) {
        timerCompleted = { data: undefined };
    }

    /**
     *  Calculate time left
     * @param endTime 
     * @returns 
     */
    const calculateTimeLeft = (endTime: string) => {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const diff = end - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Add 0 if less than 10
            return {
                days: days < 10 ? `0${days}` : days.toString(),
                hours: hours < 10 ? `0${hours}` : hours.toString(),
                minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
                seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
                data: timerActive
            };
        } else {
            return null;
        };
    }
    const timeLeft = (calculateTimeLeft(timerActive?.data?.endTime ?? "")) as HOME.ITimeLeft;

    return (
        <ResultsTopPage
            timer={timeLeft}
            timerCompleted={timerCompleted}
        />
    )
}

export default ResultsTop