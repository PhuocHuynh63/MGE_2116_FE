import userService from '@/apiRequests/user'
import DataPointsPage from '@/containers/DataPoints'
import { IUser } from '@/schemaValidations/model.schema'

const DataPoints = async () => {
    const getAllUser = await userService.getAllUser(1, 15) as IUser

    return (
        <DataPointsPage
            data={getAllUser}
        />
    )
}

export default DataPoints