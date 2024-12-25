import { z } from "zod";
import * as yup from "yup"

/**
 * MgeShema is a schema for MGE data
 */
export const MgeShema = z.object({
    data: z.object({
        results: z.array(z.object({
            id: z.string(),
            name: z.string(),
            typeMge: z.string(),
            img: z.string(),
        }))
    })
})

export type IMGE = z.TypeOf<typeof MgeShema>
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
    secrectKey: yup.string().required('Secrect key is required'),
    typeMge: yup.string().required(),
}).required()

export type IUser = yup.InferType<typeof UserRequestSchema>
//----------------------End----------------------//