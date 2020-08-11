import React, {useState, useEffect} from 'react';
import './App.scss';
import RepeatYoutube from './components/RepeatYoutube';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function App() {
  const [vi, setVi] = useState("");
  const [st, setSt] = useState(0);
  const [ed, setEd] = useState(0);
  const [formVi, setFormVi] = useState("");
  const [formSt, setFormSt] = useState(0);
  const [formEd, setFormEd] = useState(0);
  const [yp, setYp] = useState();

  const setVideo = () => {
    setSt(formSt);
    setEd(formEd);
    setVi(formVi);
  }

  useEffect(() => {
    setYp(<RepeatYoutube key={new Date().getTime()} videoId={vi} startTime={st} endTime={ed} />);
  }, [vi, st, ed]);

  return (
    <div className="wrap">
      <Container>
        <Row>
          {yp}
        </Row>
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs="8"controlId="videoId">
              <Form.Label>Video Id</Form.Label>
              <Form.Control placeholder="after https://www.youtube.com/watch?v=" onChange={(event) => (setFormVi(event.target.value))}/>
            </Form.Group>
            <Form.Group as={Col} controlId="startTime">
              <Form.Label>Start Time(s)</Form.Label>
              <Form.Control placeholder="start time" onChange={(event) => (setFormSt(parseInt(event.target.value)))}/>
            </Form.Group>
            <Form.Group as={Col} controlId="endTime">
              <Form.Label>End Time(s)</Form.Label>
              <Form.Control placeholder="end time" onChange={(event) => (setFormEd(parseInt(event.target.value)))}/>
            </Form.Group>
          </Form.Row>
          <Button variant="primary" onClick={setVideo}>play</Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;