import React from 'react';
import { Row, Col, Button } from 'reactstrap';

export class Paginate extends React.Component {

    render() {
        const { page, onPageChange, cardCount, totalCharacters } = this.props;
        return <Row className="paginate">
            <Col className="text-right">
                <Button disabled={page === 0} onClick={onPageChange.bind(this, page - 1)}>Prev</Button>
            </Col>
            <Col>
                <Button disabled={page * cardCount >= totalCharacters} onClick={onPageChange.bind(this, page + 1)}>Next</Button>
            </Col>
        </Row>
    }
}
