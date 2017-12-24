'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Belle from 'belle';
import { Grid, Row, Col } from 'react-flexbox-grid';

import client from './services/client';
import follow from './services/follow'; // function to hop multiple links by "rel"

import PointList from './components/PointList';
import CreateDialog from './components/CreateDialog';
import Graph from './components/Graph';

const TextInput = Belle.TextInput;

const initialPageSize = 3;
const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {points: [], attributes: [], pageSize: initialPageSize, links: {}};
        this.state.r = 2;
		    this.updatePageSize = this.updatePageSize.bind(this);
		    this.onCreate = this.onCreate.bind(this);
		    this.onDelete = this.onDelete.bind(this);
		    this.onNavigate = this.onNavigate.bind(this);
		    this.handleClick = this.handleClick .bind(this);
        this.changeRadius = this.changeRadius.bind(this);
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

	  loadFromServer(pageSize) {
		  follow(client, root, [
			  {rel: 'points', params: {size: pageSize}}]
		  ).then(pointCollection => {
			  return client({
				  method: 'GET',
				  path: pointCollection.entity._links.profile.href,
				  headers: {'Accept': 'application/schema+json'}
			  }).then(schema => {
				  this.schema = schema.entity;
				  return pointCollection;
			  });
		  }).done(pointCollection => {
			  this.setState({
				  points: pointCollection.entity._embedded.points,
				  attributes: Object.keys(this.schema.properties),
				  pageSize: pageSize,
				  links: pointCollection.entity._links});
		  });
	  }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    onCreate(newPoint) {
        const x = newPoint['x'],
              y = newPoint['y'],
              r = newPoint['r'];
        newPoint['inhere'] = ((x >= -r) && (x <= 0) && (y <= r/2) && (y >= 0)) // rectangle
          || ((x <= 0) && (y <= 0) && (x*x + y*y <= r*r/4)) // circle
          || ((x >= 0) && (y <= 0) && (x - y*2 <= r));  // triangle

        follow(client, root, ['points']).then(pointsCollection => {
            return client({
                method: 'POST',
                path: pointsCollection.entity._links.self.href,
                entity: newPoint,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'points', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            if (typeof response.entity._links.last !== "undefined") {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        });
    }

    onDelete(point) {
        client({method: 'DELETE', path: point._links.self.href}).done(response => {
            this.loadFromServer(this.state.pageSize);
        });
    }

	  onNavigate(navUri) {
		    client({method: 'GET', path: navUri}).done(pointCollection => {
			      this.setState({
                points: pointCollection.entity._embedded.points,
				        attributes: this.state.attributes,
				        pageSize: this.state.pageSize,
				        links: pointCollection.entity._links
			      });
        });
	  }

    handleClick(x,y) {
        const newPoint = {};
        newPoint['x'] = x;
        newPoint['y'] = y;
        newPoint['r'] = this.state.r;
        this.onCreate(newPoint);
    }

    changeRadius(radius) {
        this.setState({r: radius}); 
    }

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs>
                            <Graph handleClick={this.handleClick} points={this.state.points}
                                    height={350} width={350} r={this.state.r}
                                    minX={-6} maxX={6} minY={-6} maxY={6} unitsPerTick={1} />
                        </Col>
                        <Col xs>
                            <PointList points={this.state.points} attributes={this.state.attributes}
                                        links={this.state.links} pageSize={this.state.pageSize}
                                        onNavigate={this.onNavigate} onDelete={this.onDelete}
                                        updatePageSize={this.updatePageSize}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs>
                            <CreateDialog changeRadius={this.changeRadius} r={this.state.r} 
                                          attributes={this.state.attributes} onCreate={this.onCreate}/>
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
