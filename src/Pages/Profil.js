import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayUser from '../components/DisplayUser';
import Header from '../components/Header';
import loader from '../__Iphone-spinner-1.gif';
import { getUserData } from '../service/api';


const Profil = () => {

   const id = useParams();
   const [data,setData] = useState();
   const [loading,setLoading] = useState(false);
   
   useEffect(() => {
      getUserData(id).then(response => setData(response));
      setLoading(true)
   },[id]);

   return (
      <>
            <Header />
            <div className="card p-3 py-lg-5 col-12 col-lg-8 col-xxl-10 mx-auto">
               {loading ? 
               <>
                  <DisplayUser profil={data}/>
               </>
               :
                  <img src={loader} className="loader mx-auto" alt="Loader data" width={50} height={50} />
               }
          </div>
      </>
   );
};



export default Profil;