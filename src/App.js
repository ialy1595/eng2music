import React, {useState, useEffect, useMemo} from 'react';
import './App.scss';
import RepeatYoutube from './components/RepeatYoutube';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import phraseData from './data/phraseData'
import ResultView from './components/ResultView';


function App() {
  const [vi, setVi] = useState("");
  const [st, setSt] = useState(0);
  const [ed, setEd] = useState(0);
  const [yp, setYp] = useState(null);
  const [prevQuery, setPrevQuery] = useState("");
  const [queryRes, setQueryRes] = useState([]);
  const [prevRes, setPrevRes] = useState([]);
  const [selected, setSelected] = useState(null);
  
  function searchQuery(query) {
    if(query.length < 2) {
      setPrevQuery(query);
      setQueryRes([]);
    }
    else {
      const filterTarget = (prevQuery.length >= 2 && query.includes(prevQuery)) ? prevRes : phraseData;
      setPrevQuery(query);
      const newRes = filterTarget.filter(x => x.text.includes(query.toLowerCase()));
      setQueryRes(newRes);
      setPrevRes(newRes);
    }
  }

  function deleteViedo() {
    setVi("");
    setSelected(null);
  }

  function setVideo(data) {
    setSt(data.start - 0,1);
    setEd(data.end + 0.1);
    setVi(data.url);
    setSelected(<ResultView key={data.key} data={data} clickHandler={deleteViedo} isSelected={true}></ResultView>)
  }  

  useEffect(() => {
    setYp(<RepeatYoutube key={new Date().getTime()} videoId={vi} startTime={st} endTime={ed} />);
  }, [vi, st, ed]);

  function SearchResult() {
    if(prevQuery.length < 2) return (<div className="search-info">Type at least two characters</div>);
    const res = [];
    if(queryRes.length === 0) return (<div className="search-info">There is no result</div>);
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
      <ResultView key={d.key} data={d} clickHandler={setVideo} isSelected={false}></ResultView>
    ))
  }

  const SearchResultView = useMemo(SearchResult, [queryRes])

  function preventSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  

  return (
    <div className="box">
      <div className="wrap">
        <Container className="center">
          {selected ?
          <Row>
            {yp}
          </Row>
          :
          <Row className="disc">
            <div>Find English sentences in pop songs</div>
            <div>Enjoy them on YouTube.</div>
          </Row>
          }
          <div className="result-wrap">
            {selected}
          </div>
          <Form onSubmit={preventSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="videoId">
                <Form.Control onChange={(event) => (searchQuery(event.target.value))}/>
              </Form.Group>
            </Form.Row>
          </Form>
          <div className="result-wrap">
            {SearchResultView}
          </div>
        </Container>
        <div className="blank"></div>
      </div>
      <div className="footer">
        <div>Lyrics sync data by <a href="https://github.com/gabolsgabs/DALI">DALI</a> (<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">LICENSE</a>)</div>
      </div>
    </div>
  );
}

export default App;