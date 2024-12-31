import { z } from "zod";
import * as yup from "yup"

export const BackendResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        statusCode: z.number(),
        message: z.string(),
        error: z.string().optional(),
        data: dataSchema.optional(),
    }).refine(
        (obj) =>
            (obj.statusCode === 201 && obj.data !== undefined && obj.error === undefined) ||
            (obj.statusCode !== 201 && obj.data === undefined && obj.error !== undefined),
        {
            message: "Invalid response structure",
            path: [],
        }
    );

/**
 * MgeShema is a schema for MGE data
 */
const MgeSchema = z.object({
    results: z.array(z.object({
        id: z.string(),
        name: z.string(),
        typeMge: z.string(),
        img: z.string(),
    }))
})

export const MgeResponseSchema = BackendResponseSchema(MgeSchema);
export type IMGE = z.TypeOf<typeof MgeResponseSchema>;
//----------------------End----------------------//


/**
 * UserSchema is a schema for User request
 * @param id is a string
 * @param ingame is a string
 * @param pointRequest is a number
 * @returns UserSchema
 */
export const UserRequestSchema = yup.object({
    id: yup.string().required('ID is required'),
    ingame: yup.string().required('Ingame is required'),
    pointsRequest: yup
        .number()
        .typeError('Point must be a number')
        .required('Point is required')
        .moreThan(9999999, 'Point must be greater than 10,000,000'),
    secretKey: yup.string().required('Secret key is required'),
    typeMge: yup.string().required(),
}).required()

export type IUser = yup.InferType<typeof UserRequestSchema>
//----------------------End----------------------//


/**
 * TimerSchema is a schema for Timer data
 */
const TimerSchema = z.object({
    _id: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    typeMge: z.string(),
    pointsLimit: z.number(),
    status: z.string(),
})

export const TimerResponseSchema = BackendResponseSchema(TimerSchema);
export type ITimerLeft = z.TypeOf<typeof TimerResponseSchema>
//----------------------End----------------------//