import React from 'react';
import './ResultView.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import recordImage from '../images/recordImage.svg';
import youtubeImage from '../images/youtubeImage.png';

function ResultView({data, setVideo}) {

    function handler() {
        setVideo(data);
    }

    return (
        <Row className="result-wrapper">
            <Col xs={2}>
                <img className="result-cover" src={data.cover ? data.cover : recordImage} alt="cover"></img>
            </Col>
            <Col className="result-main">
                <div className="result-text">
                    {data.text}
                </div>
                <div className="result-info">
                    {`${data.title} - ${data.artist}`}
                </div>
            </Col>
            <Col xs={2}>
                {setVideo ? <img className="result-youtube" src={youtubeImage} alt="cover" onClick={handler}></img> : null}
            </Col>
        </Row>
      );
}

export default ResultView;