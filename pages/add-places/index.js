import styles from '../../styles/AddPlaces.module.css';
import { AxiosApi } from '../../config/axios';
import toast from '../../toast/index.js'


 
const AddPlaces = () =>{

    const resetForm = () =>{
        const form = document.getElementById('add-places-form');
        form.elements['title'].value = "";
        form.elements['description'].value = "";
        form.elements['imageAlt'].value = "";
        form.elements['pic'].files = undefined;
    }

    const handleSubmit = () =>{
        const form = document.getElementById('add-places-form')
        const body = {}
        body.title = form.elements['title'].value
        body.description = form.elements['description'].value
        body.imageAlt = form.elements['imageAlt'].value
        body.file = form.elements['pic'].files[0];
        AxiosApi.post('/places/add-places', body, { headers: {'content-type' : 'multipart/form-data'} })
        .then(res=>{
            console.log(res)
            if(res.status === 200)
            {
                resetForm();
                toast.success('Data submitted successfully !')
            }
            
        }).catch(err =>{
            console.log(err)
            toast.error('Something went wrong !')
        })
    }


    return(
        <>
            <div className={styles.formContainer}>
                <div className={styles.formBody}>
                    <h2>Add more places to visit for tourists !</h2>
                    <form id='add-places-form' className={styles.formFields}>
                        <label htmlFor="title" style={{paddingTop:'1rem'}}>Title:</label> <input type='text' name='title' />
                        <label htmlFor="description" style={{paddingTop:'1rem'}}>Description:</label> <input type='text' name='description' />
                        <label htmlFor="imageAlt" style={{paddingTop:'0.2rem'}}>Image Alternative:</label> <input type='text' name='imageAlt' />
                        <label htmlFor="pic" style={{paddingTop:'0.8rem'}}>Image:</label> <input type='file' name='pic'/>
                    </form>
                    <div  style={{display:'flex', justifyContent:'center', paddingTop:'1rem'}}>
                    <button type='submit' style={{padding:'0.5rem', fontSize:'1rem'}} onClick={handleSubmit}>Upload </button></div>
                </div>
            </div>
        </>
    )
}

export default AddPlaces;