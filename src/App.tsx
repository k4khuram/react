import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home'
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  
  return (
    <div className="App">

     <Container fluid>
      <Row >
        <Col><Home></Home></Col>
      </Row>
    </Container>

      
    </div>
  )
}

export default App
