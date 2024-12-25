'use client'

import userService from "@/apiRequests/user";
import HeaderHome from "@/components/HeaderHome/HeaderHome"
import { IMGE, UserRequestSchema } from "@/shemaValidations/model.schema"
import { yupResolver } from "@hookform/resolvers/yup";
import '@styles/main-home.style.scss'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
        setPointRequest(data.pointsRequest);
        const res = await userService.userRequest(data) as IUserRequestResponse;
        console.log(res);
        console.log(data);

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
     * Disabled button after click
     */
    const [disabled, setDisabled] = useState<boolean>(false);
    useEffect(() => {
        if (disabled) {
            setTimeout(() => {
                setDisabled(false);
            }, 800);
        }
    }, [disabled]);

    const handleDisabled = (e: React.MouseEvent) => {
        e.preventDefault();
        setDisabled(true);
    };
    //----------------------End----------------------//

    return (
        <div className="home-page">
            <HeaderHome data={props?.data} />

            <p className="title">TOTAL POINT MEMBER 2116</p>

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="id">ID: </label>
                        <input type="text" className={`${errors.id ? 'input-error' : ''}`} {...register('id', { required: true })} placeholder="14521928" />
                        {errors.id && <span className={`${errors.id ? 'text-error' : ''}`}>{errors.id.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="ingame">Ingame: </label>
                        <input type="text" className={`${errors.ingame ? 'input-error' : ''}`} {...register('ingame', { required: true })} placeholder="乛 War win" />
                        {errors.ingame && <span className={`${errors.ingame ? 'text-error' : ''}`}>{errors.ingame.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="pointRequest">Point Request: </label>
                        <input type="text" className={`${errors.pointsRequest ? 'input-error' : ''}`} {...register('pointsRequest', { required: true })} placeholder="10000000" />
                        {errors.pointsRequest && <span className={`${errors.pointsRequest ? 'text-error' : ''}`}>{errors.pointsRequest.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="secrectKey">Secrect Key <i className="contact">(Contact: GOL Phuoc): </i></label>
                        <input type="text" className={`${errors.secrectKey ? 'input-error' : ''}`} {...register('secrectKey', { required: true })} />
                        {errors.secrectKey && <span className={`${errors.secrectKey ? 'text-error' : ''}`}>{errors.secrectKey.message}</span>}
                    </div>

                    <div className="form-group">
                        <input type="hidden" value={props.data.data.results[0].typeMge} {...register('typeMge', { required: true })} />
                    </div>

                    <div className="submit">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HomePage