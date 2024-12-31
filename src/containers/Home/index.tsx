'use client'

import userService from "@/apiRequests/user";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { UserRequestSchema } from "@/shemaValidations/model.schema"
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import '@styles/main-home.style.scss';
import timerService from "@/apiRequests/timer";
import { HOME } from "@/types/IPage";


const HomePage = (props: HOME.IHomePage) => {

    const [pointRequest, setPointRequest] = useState<number>(0);
    const [errorApi, setErrorApi] = useState<string>('');
    const [statusBid, setStatusBid] = useState<string>('');

    /**
     * useForm is a custom hook for managing form
     */
    const { register, handleSubmit, formState: { errors } } = useForm<HOME.IFormInput>({
        resolver: yupResolver(UserRequestSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: HOME.IFormInput) => {
        console.log("Form submitted!", data);
        setPointRequest(data.pointsRequest);
        const res = await userService.userRequest(data) as HOME.IUserRequestResponse;

        if (res.statusCode === 201) {
            setStatusBid('success');
        } else if (res.statusCode === 400) {
            setStatusBid('error');
            setErrorApi(res.message);
        } else {
            setStatusBid('');
        }
    }
    //----------------------End----------------------//


    /**
     * useEffect is a custom hook for managing side effects
     */
    const [timeLeft, setTimeLeft] = useState<HOME.ITimeLeft>(props.timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft: HOME.ITimeLeft) => {
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
    //----------------------End----------------------//

    return (
        <div className="home-page">
            <Title className="title">ENTER POINTS TO BID</Title>

            {
                props?.timer?.data?.statusCode === 200 ?
                    <div className="count-time">
                        <h1 className='time'>
                            <div className="day">
                                <span className="number">{timeLeft?.days}</span><span className="text">DAY</span>
                            </div>
                            <div className="hr">
                                <span className="number">{timeLeft?.hours}</span><span className="text">HR</span>
                            </div>
                            <div className="min">
                                <span className="number">{timeLeft?.minutes}</span><span className="text">MIN</span>
                            </div>
                            <div className="sec">
                                <span className="number">{timeLeft?.seconds}</span><span className="text">SEC</span>
                            </div>
                        </h1>
                    </div>
                    : null
            }

            {
                statusBid === 'error' ?
                    <div className="notify">
                        <div className="alert alert-danger notify-error" role="alert">
                            MGE Bidding Failed. <strong> {errorApi}</strong>
                        </div>
                    </div>
                    : statusBid === 'success' ?
                        <div className="notify">
                            <div className="alert alert-success notify-success" role="alert">
                                You have successfully bid with {pointRequest} points
                            </div>
                        </div>
                        : null
            }


            <form>
                <div className="form-group">
                    <div className={`${errors.id ? 'input-error' : 'input'}`}>
                        <label htmlFor="id">ID: </label>
                        <input type="text" {...register('id', { required: true })} placeholder="14521928" />
                    </div>
                    {errors.id && <span className={`${errors.id ? 'text-error' : ''}`}>{errors.id.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.ingame ? 'input-error' : 'input'}`}>
                        <label htmlFor="ingame">Ingame: </label>
                        <input type="text" {...register('ingame', { required: true })} placeholder="乛 War win" />
                    </div>
                    {errors.ingame && <span className={`${errors.ingame ? 'text-error' : ''}`}>{errors.ingame.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.pointsRequest ? 'input-error' : 'input'}`}>
                        <label htmlFor="pointRequest">Point Request: </label>
                        <input type="text" {...register('pointsRequest', { required: true })} placeholder="10000000" />
                    </div>
                    {errors.pointsRequest && <span className={`${errors.pointsRequest ? 'text-error' : ''}`}>{errors.pointsRequest.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.secretKey ? 'input-error' : 'input'}`}>
                        <label htmlFor="secretKey">Secrect Key <i className="contact">(Contact: GOL Phuoc): </i></label>
                        <input type="text" {...register('secretKey', { required: true })} placeholder="213d169b7i2o1pc7as3" />
                    </div>
                    {errors.secretKey && <span className={`${errors.secretKey ? 'text-error' : ''}`}>{errors.secretKey.message}</span>}
                </div>

                <div className="form-group">
                    <input type="hidden" value={props?.mgeData?.data?.results[0]?.typeMge} {...register('typeMge', { required: true })} />
                </div>

                <div className="submit">
                    <Button timeDelay={900} onClick={handleSubmit(onSubmit)} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default HomePage