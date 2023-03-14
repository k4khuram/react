import {useState,useEffect} from 'react'
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';

export const ImageLoader = () => {

 const appStore = useAppSelector((state:RootState)=>state.breedStore);
 const images = appStore?.images;
 const status = appStore?.status;

 const [dogImages, setDogImages] = useState([]);

 const setDogImagesList = async () =>{
    setDogImages(images);
    
 }

 useEffect(() => {
  
  if (status === 'isSuceeded'){

    setDogImagesList();    
  }

 }, [status,images])
 
  return (
    
    <Row>
      
     {dogImages.map((image,index) =>
     {
      return <Col key={index}>
      <Card style={{ width: '20rem' }}>
       <Card.Img variant="top" style={{ width: '100%', aspectRatio: 1 }} src={image} /> 
     </Card>
     </Col>
     }
       )}
    </Row>
    
  )
}
