import React, { useState, useEffect, useContext } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

import UploadDp from './UploadDp'
import { LuArrowRight } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import MYS from '/Styles/library.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  styled,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditProfile = () => {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [Btnloading, setBtnloading] = useState(false);

  const [Name, setName] = useState(Contextdata.Data.name);
  const [Email, setEmail] = useState(Contextdata.Data.email);
  const [UserDp, setUserDp] = useState();

  const notify = (T) => toast(T, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


 
  useEffect(() => {
    setName(Contextdata.Data.name)
    setEmail(Contextdata.Data.email)
    setUserDp(Contextdata.Data.dp)

    document.getElementById("FinalFileName").value = Contextdata.Data.dp;

  }, [Contextdata.Data]);

  const UpdateProfile = (e) => {
    e.preventDefault();
    let FinalFileName = document.querySelector('#FinalFileName').value
    if (Name !== '' && Email !== '' && FinalFileName !== '') {
      UpdateData(FinalFileName)
      setBtnloading(true)
    } else {
    
      notify('All Fields are required*')
    }
  };

  const UpdateData = async (NewImage) => {

    const sendUM = { image: NewImage, name: Name, email: Email }
    const data = await fetch("/api/Users/UpdateProfile", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        setBtnloading(false)
        if (parsed.ReqData.done) {
          notify('Profile Updated Successfully')
        
        } else {
          notify('Something went wrong')
        }



      })
  }


  return (
    <div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      <div>


        <UploadDp />
        <form onSubmit={UpdateProfile} >
          <div className={MYS.inputlogin}>
            <TextField
              required
              label="Student's Name"
              fullWidth
              value={Name}
              onInput={e => setName(e.target.value)}

            />
          </div>
          <div className={MYS.inputlogin}>
            <TextField
              required
              label="Email Address"
              fullWidth

              value={Email}
              onInput={e => setEmail(e.target.value)}

            />
          </div>


          <input type="hidden" value={UserDp} id="FinalFileName" />


          <div className={MYS.inputlogin}>
            <div className={MYS.MBtnbox}>
              <LoadingButton

                fullWidth
                onClick={UpdateProfile}
                endIcon={<LuArrowRight />}
                loading={Btnloading}
                desabled={Btnloading}
                loadingPosition="end"
                variant="contained"
              >
                <span>Update</span>
              </LoadingButton>
            </div>
          </div>


        </form>

      </div>
    </div>
  )
}

export default EditProfile
