import timerService from "@/apiRequests/timer";
import { useEffect, useState } from "react";

export const useTimeLeft = (initialTime: any) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft: any) => {
                const totalSeconds =
                    Number(prevTimeLeft?.days) * 24 * 60 * 60 +
                    Number(prevTimeLeft?.hours) * 60 * 60 +
                    Number(prevTimeLeft?.minutes) * 60 +
                    Number(prevTimeLeft?.seconds);

                if (totalSeconds <= 1) {
                    clearInterval(interval);
                    timerService.updateStatusTimer();
                    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
                }

                const newTotalSeconds = totalSeconds - 1;

                const days = Math.floor(newTotalSeconds / (24 * 60 * 60));
                const hours = Math.floor(
                    (newTotalSeconds % (24 * 60 * 60)) / (60 * 60)
                );
                const minutes = Math.floor((newTotalSeconds % (60 * 60)) / 60);
                const seconds = (newTotalSeconds % 60);

                return {
                    days: days < 10 ? `0${days}` : days.toString(),
                    hours: hours < 10 ? `0${hours}` : hours.toString(),
                    minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
                    seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return timeLeft;
}
