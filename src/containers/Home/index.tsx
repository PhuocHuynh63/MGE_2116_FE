'use client'

import userService from "@/apiRequests/user";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { IMGE, UserRequestSchema } from "@/shemaValidations/model.schema"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import '@styles/main-home.style.scss'

interface IHomePage {
    data: IMGE;
}

interface IFormInput {
    id: string;
    ingame: string;
    pointsRequest: number;
    secrectKey: string;
    typeMge: string;
}

interface IUserRequestResponse {
    message: string;
    statusCode: number;
}

const HomePage = (props: IHomePage) => {
    const [pointRequest, setPointRequest] = useState<number>(0);
    const [errorApi, setErrorApi] = useState<string>('');
    const [statusBid, setStatusBid] = useState<string>('');

    /**
     * useForm is a custom hook for managing form
     */
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(UserRequestSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: IFormInput) => {
        console.log("Form submitted!", data);
        setPointRequest(data.pointsRequest);
        const res = await userService.userRequest(data) as IUserRequestResponse;

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

    return (
        <div className="home-page">
            <Title className="title">ENTER POINTS TO BID</Title>

            <div className="count-time">
                <h1 className='time'>
                    <div className="day">
                        <span className="number">4</span><span className="text">DAY</span>
                    </div>
                    <div className="hr">
                        <span className="number">18</span><span className="text">HR</span>
                    </div>
                    <div className="min">
                        <span className="number">31</span><span className="text">MIN</span>
                    </div>
                    <div className="sec">
                        <span className="number">54</span><span className="text">SEC</span>
                    </div>
                </h1>
            </div>

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

            <div className="form">
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
                        <div className={`${errors.secrectKey ? 'input-error' : 'input'}`}>
                            <label htmlFor="secrectKey">Secrect Key <i className="contact">(Contact: GOL Phuoc): </i></label>
                            <input type="text" {...register('secrectKey', { required: true })} placeholder="213d169b7i2o1pc7as3" />
                        </div>
                        {errors.secrectKey && <span className={`${errors.secrectKey ? 'text-error' : ''}`}>{errors.secrectKey.message}</span>}
                    </div>

                    <div className="form-group">
                        <input type="hidden" value={props.data.data.results[0].typeMge} {...register('typeMge', { required: true })} />
                    </div>

                    <div className="submit">
                        <Button timeDelay={900} onClick={handleSubmit(onSubmit)} type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default HomePage