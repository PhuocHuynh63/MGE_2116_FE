import mgeService from "@/apiRequests/mge";
import timerService from "@/apiRequests/timer";
import HomePage from "@/containers/Home";
import { IMGE, ITimerLeft } from "@/schemaValidations/model.schema";
import { HOME } from "@/types/IPage";

const Home = async () => {
  const mgeResponse = await mgeService.getMge(1, 5) as IMGE;
  const timer = await timerService.getTimer() as ITimerLeft;

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
        data: timer
      };
    } else {
      return null;
    };
  }
  const timeLeft = (calculateTimeLeft(timer?.data?.endTime ?? "") as HOME.ITimeLeft);
  //----------------------End----------------------//

  return (
    <>
      <HomePage
        mgeData={mgeResponse}
        timer={timeLeft}
      />
    </>
  );
}

export default Home;
