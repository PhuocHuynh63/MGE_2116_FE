import userService from '@/apiRequests/user'
import DataPointsPage from '@/containers/DataPoints'
import { IUser } from '@/schemaValidations/model.schema'

const DataPoints = async () => {
    // const getAllUser = await userService.getAllUser(1, 10) as IUser
    const searchByNameOrId = await userService.searchByNameOrId('', 1, 10) as IUser


    return (
        <DataPointsPage
            data={searchByNameOrId}
        />
    )
}

export default DataPoints