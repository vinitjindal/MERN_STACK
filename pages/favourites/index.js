import styles from '../../styles/favourites.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { AxiosApi } from '../../config/axios';
import { useEffect, useState } from 'react';
import toast from '../../toast/index.js'

const Favourites = () =>{

    const [_data, setData] = useState([]);

    useEffect(()=>{
      AxiosApi.get('/favourites/all-favourites')
      .then((res)=> {
        if(res.status === 200)
        {
          setData(res.data);
        }
        
      })
      .catch(err=>{
        console.log('error while getting all favourites ' + err.message)
      })  
    },[])

    const handleDeleteFav = async(id) =>{
        AxiosApi.delete(`/favourites/remove-from-favourites/${id}`)
        .then(res => {
          if(res.status === 200)
          {
            
            let result = _data.filter( val => val.favId !== id)
            setData(result);
            toast.success('successfully deleted !')
          }
        })
        .catch(err =>{
          toast.success('something went wrong while deleting the favourite !')
          console.log(err.message)
        })
    }

    const _places = _data.length ? _data.map( pd => {
        return(
          <div className={styles.touristCard} key={pd.favId}>
            <div style={{height: '16rem'}} width='full'>
              <img src={`http://localhost:8080/${pd.imagePath}`} width={400} height={250} alt={pd.imageAlt}/>
            </div>
            <div style={{padding: '1rem'}}>
              <h3> {pd.title} 
              <AiFillHeart color='red'/></h3>
              <div style={{display: 'flex', justifyContent:'space-between'}}>
                <div> {pd.description} </div>
                <div  style={{cursor: 'pointer'}} onClick={() => handleDeleteFav(pd.favId)}>&#10060;</div>
              </div>
            </div>
        </div>
        )} 
    ): <> No Favourite items added yet ! </>

    return(
        <div className={styles.touristContainer}>
            {_places}
        </div>
    )
}



export default Favourites;