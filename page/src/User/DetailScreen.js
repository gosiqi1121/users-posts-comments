
import BasicInformation from './BasicInformation'
import UserPost from './UserPost'
import UserAlbum from './UserAlbum'

const DetailScreen = () => {
    return (
        <>
            <div className="container">
                <div className="col-md-8">
                    <BasicInformation/>
                    <UserPost/>
                    <UserAlbum/>
                </div>

            </div>
        </>
    )

}
export default DetailScreen