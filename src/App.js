import React, {useState, useEffect} from 'react';
import './App.scss';
import RepeatYoutube from './components/RepeatYoutube';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import phraseData from './data/phraseData'


function App() {
  const [vi, setVi] = useState("");
  const [st, setSt] = useState(0);
  const [ed, setEd] = useState(0);
  const [yp, setYp] = useState();
  const [prevQuery, setPrevQuery] = useState("");
  const [queryRes, setQueryRes] = useState([]);
  const [prevRes, setPrevRes] = useState([]);
  
  function searchQuery(query) {
    if(query.length < 2) {
      setPrevQuery(query)
    }
    else {
      const filterTarget = (prevQuery.length >= 2 && query.includes(prevQuery)) ? prevRes : phraseData;
      setPrevQuery(query);
      const newRes = filterTarget.filter(x => x.text.includes(query));
      setQueryRes(newRes);
      setPrevRes(newRes);
    }
  }

  function setVideo(newSt, newEd, newVi) {
    setSt(newSt);
    setEd(newEd);
    setVi(newVi);
  }

  useEffect(() => {
    setYp(<RepeatYoutube key={new Date().getTime()} videoId={vi} startTime={st} endTime={ed} />);
  }, [vi, st, ed]);

  function SearchResult() {
    if(prevQuery.length < 2) return (<div>type at least two characters</div>);
    const res = [];
    if(queryRes.length === 0) return (<div>There is no result</div>);
    else if(queryRes.length <= 10) queryRes.forEach(d => res.push(d)); 
    else {
      const randomRes = [];
      while(randomRes.length < 10) {
        const r = Math.round((Math.random() * (queryRes.length - 1)));
        if(!randomRes.includes(r)) randomRes.push(r);
      }
      randomRes.forEach(i => res.push(queryRes[i])); 
    }
    return res.map(d => (
      <div key={d.key}>{`${d.text} (${d.title} by ${d.artist})`}</div>
    ))
  }

  return (
    <div className="wrap">
      <Container>
        <Row>
          {yp}
        </Row>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="videoId">
              <Form.Label>At least two characters</Form.Label>
              <Form.Control onChange={(event) => (searchQuery(event.target.value))}/>
            </Form.Group>
          </Form.Row>
        </Form>
        <Row className="center">
          {SearchResult()}
        </Row>
      </Container>
    </div>
  );
}

export default App;