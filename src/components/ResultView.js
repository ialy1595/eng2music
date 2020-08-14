import React from 'react';
import './ResultView.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import recordImage from '../images/recordImage.svg';
import youtubeImage from '../images/youtubeImage.png';
import minusImage from '../images/minusImage.svg'

function ResultView({data, clickHandler, isSelected}) {

    function handler() {
        clickHandler(data);
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
                {<img className="result-click" src={isSelected ? minusImage : youtubeImage} alt="" onClick={handler}></img>}
            </Col>
        </Row>
      );
}

export default ResultView;