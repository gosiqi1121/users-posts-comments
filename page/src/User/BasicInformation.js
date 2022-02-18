import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BasicInformation = () => {
    const params = useParams()
    const [userDetails, setUserDetails] = useState({ 'id': 1 })
    const findUserById = () =>
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
            .then(res => res.json())
            .then(userDetails => setUserDetails(userDetails))
    useEffect(findUserById, [])

    return (
        <>
            <div className="tab-content profile-tab" id="myTabContent">
                <ul className="nav nav-tabs mt-4 md-4" id="myTab" role="tablist">
                    <h1> Basic Information</h1>
                </ul>
                <div className="tab-pane fade show active" id="home" role="tabpanel"
                     aria-labelledby="home-tab">

                    <div className="row">
                        <div className="col-md-6">
                            <label>User Id</label>
                        </div>
                        <div className="col-md-6">
                            {userDetails.id}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Name</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails.name}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>username</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails.username}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Email</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails.phone}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Website</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails.website}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Company</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails?.company?.name}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Address</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails?.address?.street}, {userDetails?.address?.suite}, {userDetails?.address?.city}</p>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>ZipCode</label>
                        </div>
                        <div className="col-md-6">
                            <p>{userDetails?.address?.zipcode}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BasicInformation;