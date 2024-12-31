import { IMGE, ITimerLeft } from "@/shemaValidations/model.schema";

declare namespace HOME {
    interface IHomePage {
        mgeData: IMGE;
        timer: ITimeLeft;
    }

    interface ITimeLeft {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
        data?: ITimerLeft;
    }

    interface IFormInput {
        id: string;
        ingame: string;
        pointsRequest: number;
        secretKey: string;
        typeMge: string;
    }

    interface IUserRequestResponse {
        message: string;
        statusCode: number;
    }
}