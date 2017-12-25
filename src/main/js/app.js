'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PointList from './components/PointList';
import CreateDialog from './components/CreateDialog';
import Graph from './components/Graph';
import axios from 'axios';
import {Button} from 'belle';

const initialPageSize = 3;
const root = '/api/points';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            points: [], r: 2,
            pageState: {
                first: true,
                last: true,
                number: 0,
                totalPages: 1,
                size: initialPageSize
            }
        };
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.handleClick = this.handleClick .bind(this);
        this.changeRadius = this.changeRadius.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

    loadFromServer() {
        axios
            .get(root, {
                params: {
                    size: this.state.pageState.size,
                    page: this.state.pageState.number
                }
            })
            .then((response) => {
                this.setState({
                    points: response.data.content,
                    pageState: {
                        size: response.data.size,
                        number: response.data.number,
                        first: response.data.first,
                        last: response.data.last,
                        totalPages: response.data.totalPages
                    },
                });
        });
    }

    updatePageSize(pageSize) {
        this.state.pageState.size = pageSize;
        this.loadFromServer();
    }

    onCreate(newPoint) {
        axios.post(root, newPoint).then(() => {
            this.loadFromServer();
        });
    }

    onNavigate(newPage) {
        this.state.pageState.number = newPage;
        this.loadFromServer();
    }

    handleClick(x,y) {
        const newPoint = {};
        newPoint['x'] = x;
        newPoint['y'] = y;
        newPoint['r'] = this.state.r;
        this.onCreate(newPoint);
    }

    changeRadius(radius) {
        this.setState({
            r: radius
        });
    }

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col>
                            <Button onClick={() =>  {
                                document.location = "/logout"
                            }}>Выйти</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs>
                            <Graph handleClick={this.handleClick} points={this.state.points}
                                    height={350} width={350} r={this.state.r}
                                    minX={-6} maxX={6} minY={-6} maxY={6} unitsPerTick={1} />
                        </Col>
                        <Col xs>
                            <PointList points={this.state.points}
                                       pageState={this.state.pageState}
                                       onNavigate={this.onNavigate}
                                       updatePageSize={this.updatePageSize}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs>
                            <CreateDialog changeRadius={this.changeRadius}
                                          r={this.state.r}
                                          onCreate={this.onCreate}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
