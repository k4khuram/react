import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useState,useEffect} from 'react'
import { useAppDispatch } from '../app/hooks';
import { resetState, setImages,setStatus } from '../features/dog/breedSlice';
import { useGetBreedsQuery, useLazyGetSubBreedsQuery, useLazyGetBreedImagesQuery, useLazyGetSubBreedImagesQuery } from '../features/dog/dogApi';

import Button from 'react-bootstrap/Button';
import { UseQueryStateResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const SearchBar = () => {

    const [breeds, setBreeds] = useState([]);
    const [subBreeds, setSubBreeds] = useState([]);

    const [selectedBreed, setSelectedBreed] = useState("");
    const [selectedSubBreed, setSelectedSubBreed] = useState("");
    const [selectedNumber, setSelectedNumber] = useState(0);

    const {data,isSuccess,isLoading} = useGetBreedsQuery(0);
    const [getSubBreeds,SubBreedsResult] = useLazyGetSubBreedsQuery();
    
    const [getBreedImages,BreedImagesResult] = useLazyGetBreedImagesQuery();
    const [getSubBreedImages,SubBreedImagesResult] = useLazyGetSubBreedImagesQuery();
      
    const dispatch = useAppDispatch();

    

    const handleBreedSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
      //console.log(event.target.value);
      setSubBreeds([]);
      setSelectedSubBreed("");
      setSelectedBreed(event.target.value);
      if (event.target.value !==""){
      getSubBreeds(event.target.value);
      }
    }

    const handleSubBreedSelectChange = async(event: React.ChangeEvent<HTMLSelectElement>) =>{
      setSelectedSubBreed(event.target.value);
    }

    const handleNumberSelectChange = async(event: React.ChangeEvent<HTMLSelectElement>) =>{

      setSelectedNumber(parseInt(event.target.value, 10));
    }
    const handleOnclick = async() =>{
      //dispatch(setStatus('isLoading'));

      console.log('breed legnth:'+ breeds.length);
      console.log('subbread legnth:'+subBreeds.length);
      console.log('selected breed:'+selectedBreed);
      console.log('selected subbreed:'+selectedSubBreed);
      console.log('selected number:'+selectedNumber);

      if (selectedNumber === 0){
        alert ("please select no of images");
        return;
      }

      if (!selectedSubBreed && subBreeds){
        alert ("please select a subbreed");
        return;
      }
       
      if (!selectedSubBreed  && !!selectedBreed  && selectedNumber !==0){
      getBreedImages({"breed":selectedBreed,"number":selectedNumber});
      
      }
      else if (!!selectedSubBreed  && !!selectedBreed  && selectedNumber !==0){
      getSubBreedImages({"breed":selectedBreed,"subBreed":selectedSubBreed,"number":selectedNumber});
      
      }
    }
    
    const setBreedList = async() =>{
        setBreeds(data?.message); 
    }
   
    const setSubBreedList = async() => {
      setSubBreeds(SubBreedsResult.data.message);
    }

    const setImagesToStore = async(imagesResult:any) =>{
      dispatch(setImages((imagesResult.data.message)));
    }

   
    useEffect(() => {  
      if(isSuccess){
        setBreedList();
      }
    }, [isSuccess])

    useEffect(()=>{
      
         if(SubBreedsResult.isSuccess){
          setSubBreedList();
         }
      
     },[SubBreedsResult])

    useEffect(() => {
      
      const imagesResult = (!selectedSubBreed && BreedImagesResult) || (!!selectedSubBreed && SubBreedImagesResult) as any
      console.log(imagesResult.isSuccess);
      if (imagesResult.isSuccess){
              setImagesToStore(imagesResult);
              //console.log(result.data.message)
       }
       
    
    }, [BreedImagesResult,SubBreedImagesResult])
     
  return (
  
    <Row>
   <Col> 
    <Form.Label htmlFor="breeds-select">Breed</Form.Label>
        <Form.Select onChange={handleBreedSelectChange} 
        id="breeds-select" value={selectedBreed} defaultValue="">
        <option key="" value="">Select</option>
        {breeds &&
          Object.keys(breeds).map((b, index)=> 
          <option key={index} value={b}>{b}</option>
          )}
    </Form.Select>
   </Col> 
  
    {(subBreeds?.length>0) &&
   <Col>
    <Form.Label htmlFor="subbreeds-select">Sub breed</Form.Label>
        <Form.Select onChange={handleSubBreedSelectChange} 
        id="subbreeds-select" value={selectedSubBreed} defaultValue="">
        <option key="">Select</option>
          {Object.values(subBreeds).map((b, index)=> 
          (<option key={index} value={b}>{b}</option>
          ))}
    </Form.Select>
    </Col>
    } 
    <Col>
    <Form.Label htmlFor="breeds-select">Number of images</Form.Label>
        <Form.Select onChange={handleNumberSelectChange} 
        id="breeds-select" value={selectedNumber} defaultValue="">
        <option key="" value= {0} >Select</option>
        
          {Array.from({ length: 50 }, (_, index) => (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
            ))}

        </Form.Select>
    </Col>

     <Col>
     <Button variant="primary" onClick={handleOnclick}  style={{marginTop:'28px'}}>View Images</Button>
    </Col>

    </Row>
    
  )
}
