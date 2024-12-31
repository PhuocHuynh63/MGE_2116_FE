import { IMGE, ITimerLeft } from "@/schemaValidations/model.schema";

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

declare namespace RESULTS_TOP {
    interface IResultsTopPage {
        timer: HOME.ITimeLeft;
    }

    interface DataType {
        key: React.Key;
        top: number;
        ingame: string;
        id: number;
        points: number;
        date: string
    }
}