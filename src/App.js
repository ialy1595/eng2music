import React, {useState, useEffect, useMemo} from 'react';
import './App.scss';
import RepeatYoutube from './components/RepeatYoutube';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import phraseData from './data/phraseData';
import ResultView from './components/ResultView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [vi, setVi] = useState("");
  const [st, setSt] = useState(0);
  const [ed, setEd] = useState(0);
  const [yp, setYp] = useState(null);
  const [prevQuery, setPrevQuery] = useState("");
  const [queryRes, setQueryRes] = useState([]);
  const [prevRes, setPrevRes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [nowPage, setNowPage] = useState(1);
  const [phraseData, setPhraseData] = useState([]);

  useEffect(() => {
    import('./data/phraseData.json').then(d => {
      const rawData = JSON.parse(JSON.stringify(d));
      setPhraseData(rawData.default);
    })
  }, []);

  const pageSize = 10;

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
      setNowPage(1);
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
    if(phraseData.length === 0) return (<div className="search-info">Data loading...</div>);
    if(prevQuery.length < 2) return (<div className="search-info">Type at least two characters</div>);
    const res = [];
    if(queryRes.length === 0) return (<div className="search-info">There is no result</div>);
    else queryRes.slice(pageSize * (nowPage - 1), Math.min(pageSize * nowPage, queryRes.length)).forEach(d => res.push(d));
    return res.map(d => (
      <ResultView key={d.key} data={d} clickHandler={setVideo} isSelected={false}></ResultView>
    ))
  }

  const SearchResultView = useMemo(SearchResult, [queryRes, nowPage, phraseData])

  function setPageHandler(x) {
    return (function() {setNowPage(x);});
  }

  function PageNavigator() {
    if(prevQuery.length < 2) return null;
    if(queryRes.length === 0) return null;
    const maxPage = Math.floor((queryRes.length - 1) / pageSize) + 1;
    const res = [];
    const pageSt = Math.floor((nowPage - 1) / 5) * 5 + 1;
    const pageEd = Math.min(pageSt + 4, maxPage);
    res.push(<Button 
      className="page-button" 
      key={`page-dleft`} 
      variant="outline-primary"
      onClick={setPageHandler(Math.max(nowPage - 5, 1))}
    ><FontAwesomeIcon icon={faAngleDoubleLeft} /></Button>);
    res.push(<Button 
      className="page-button" 
      key={`page-left`} 
      variant="outline-primary"
      onClick={setPageHandler(Math.max(nowPage - 1, 1))}
    ><FontAwesomeIcon icon={faChevronLeft} /></Button>);
    for(let pp = pageSt; pp <= pageEd; pp++) {
      res.push(<Button 
        className="page-button" 
        key={`pagenav-${pp}`} 
        variant={pp === nowPage ? "primary" : "outline-primary"}
        onClick={setPageHandler(pp)}
      >{pp}</Button>);
    }
    res.push(<Button 
      className="page-button" 
      key={`page-right`} 
      variant="outline-primary"
      onClick={setPageHandler(Math.min(nowPage + 1, maxPage))}
    ><FontAwesomeIcon icon={faChevronRight} /></Button>);
    res.push(<Button 
      className="page-button" 
      key={`page-dright`} 
      variant="outline-primary"
      onClick={setPageHandler(Math.min(nowPage + 5, maxPage))}
    ><FontAwesomeIcon icon={faAngleDoubleRight} /></Button>);
    return res;
  }

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
            <div>Find English phrases in music</div>
            <div>Enjoy them on YouTube.</div>
          </Row>
          }
          <div className="result-wrap">
            {selected}
          </div>
          {phraseData.length ?
          <Form onSubmit={preventSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="videoId">
                <Form.Control onChange={(event) => (searchQuery(event.target.value))}/>
              </Form.Group>
            </Form.Row>
          </Form>
          : null}
          <div className="result-wrap">
            {SearchResultView}
          </div>
          <div className="page-wrap">
            {PageNavigator()}
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