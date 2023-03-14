import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { SearchBar } from './SearchBar';
import { ImageLoader } from './ImageLoader';


export const Home = () => {

  return (
    <>
    <Row>

    <Navbar bg="dark" variant="dark" className="d-inline  text-center">
        <h5 className='text-white' >Dog Image Finder App</h5>
      </Navbar>
    </Row>
     <section className='p-5'>
    <Row >
        <Col>
          <SearchBar></SearchBar>
       </Col>
    </Row>

  
    </section>  

    <section className='p-4'>
          <ImageLoader></ImageLoader>
    </section>

    </>    
  )
}
