import styles from '../styles/Home.module.css';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react';
import { AxiosApi } from '../config/axios';
import { useAuthContext } from '../context/Auth';
import toast from '../toast/index';

const Home = ({data}) => {

  if(data.status === 500)
    return <h3>Something went wrong!</h3>
  if(!data.data.length)
    return <h3> Sorry! no data found to display. </h3>

  const places = [...data.data];

  // const [counter, setCounter] = useState(0);
  // const interval = useRef(null);
  // useEffect(() => {
  //   interval.current = setInterval(() => {
  //     setCounter((val) => val + 1)
  //   }, 1000);
  //   return () =>{
  //     clearInterval(interval.current)
  //   }
  // }, []);

  const {isAuthenticated, role} = useAuthContext();
  
  const [favourite, setFavourite] = useState([]);


  useEffect(()=>{
    if( isAuthenticated)
    {
      AxiosApi.get('/favourites/all-favourites')
      .then((res)=> {
        console.log(res)
        const fav = res.data.map(val => val.favId)
        setFavourite(fav);
      })
      .catch(err=>{
        console.log('error while getting all favourites ' + err.message)
      })
    }
    
  },[isAuthenticated])

  const handleAddFavourite = async(id) =>{

    const body = {...places[places.findIndex((val) => val.id === id)]}
  
    AxiosApi.post('/favourites/add-to-favourites', body)
    .then((res)=> {
      if(res.status === 200)
      {
        setFavourite((prev) => [...prev, id])
        toast.info('Added to your favourites')
      }
      console.log(res)
    })
    .catch(err=>{
      console.log('error while setting the add to favourites ' + err.message)
    })
  }

  

  const _places = places.map( data => {
    return(
      <div className={styles.touristCard} key={data.id}>
        <div style={{height: '16rem'}} width='full'>
          <img src={`http://localhost:8080/${data.imagePath}`} width={400} height={250} alt={data.imageAlt}/>
        </div>
        <div style={{padding: '1rem'}}>
          <h3> {data.title} 
          { isAuthenticated && role !== 'ADMIN' ? (favourite.includes(data.id)) ? 
          <AiFillHeart style={{cursor: 'pointer', color:'red'}}/>:
          <AiOutlineHeart  style={{cursor: 'pointer', color:'red'}} onClick={() => handleAddFavourite(data.id)}/> : <></> } </h3>
          <p> {data.description} </p>
        </div>
    </div>
    )
  } )

  return (
   <div className={styles.touristContainer}>
    {/* {counter} */}
    {_places}
   </div>
  )
}
export async function getStaticProps() {
  let data = {};
  try{
    const res = await AxiosApi.get('/places/all-places');
    if(res.status === 500)
      throw new Error("Server Error")
    
    data = res;
    if(res.data === null)
      data.data = []
    
  }catch(err)
  {
      return{ props: {data:{status: 500,  data: null, message:'Server Error'}} }
  }

  return { props: { data } }
}


export default Home;