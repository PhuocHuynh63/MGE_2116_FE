import { IHistory, IMGE, ITimerCompleted, ITimerLeft, IUser } from "@/schemaValidations/model.schema";

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
        data?: ITimerLeftActive;
    }

    interface IFormInput {
        id: string;
        ingame: string;
        pointsRequest: number;
        secretKey: string;
        email?: string;
    }

    interface IUserRequestResponse {
        message: string;
        statusCode: number;
        data?: any;
    }
}

declare namespace RESULTS_TOP {
    interface IResultsTopPage {
        timer: HOME.ITimeLeft;
        timerCompleted: ITimerCompleted;
    }

    interface DataType {
        key: React.Key;
        top: number;
        ingame: string;
        id: string;
        points: number;
        date: string
    }
}

declare namespace HISTORY {
    interface IHistoryPage {
        data: IHistory;
    }
}

declare namespace DATA_POINTS {
    interface IDataType {
        key: number;
        no: number;
        ingame: string;
        id: string;
        points: any;
    }

    interface IDataPointsPage {
        data: IUser;
    }
}