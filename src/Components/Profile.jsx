import React from "react";
import { encryptStorage1 } from "../Encrypt/Encrpt";


const Profile = () => {

    const user =encryptStorage1.getItem('user');
    
    console.log("Profile");

  return (
    <div>
      <dl className="row m-3">
        <h2 className="text-center mb-3">{user?.username}'s Profile</h2>

        <dt className="col-sm-3">User Name:</dt>
        <dd className="col-sm-9">
          {user?.username}
        </dd>

        <dt className="col-sm-3">Email Address:</dt>
        <dd className="col-sm-9">
          <p>{user?.email}</p>
        </dd>

        <dt className="col-sm-3">Role:</dt>
        <dd className="col-sm-9">
          {user?.role}
        </dd>

        <dt className="col-sm-3">Age:</dt>
        <dd className="col-sm-9">
          {user?.age}
        </dd>
        <dt className="col-sm-3">Phone Number:</dt>
        <dd className="col-sm-9">
          {user?.Phonenumber}
        </dd>
        <dt className="col-sm-3">Date_of_Joining:</dt>
        <dd className="col-sm-9">
          {user?.Date_of_Join?.slice(0,10)}
        </dd>
        <dt className="col-sm-3">Address:</dt>
        <dd className="col-sm-9">
          {user?.Address}
        </dd>
        
      </dl>
    </div>
  );
};

export default Profile;
