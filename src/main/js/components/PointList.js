import InputNumber from 'rc-input-number';
import React from 'react';
import Point from './Point';
import Belle from 'belle';
import {Table} from 'react-bootstrap';
const Button = Belle.Button;

export default class PointList extends React.Component{

    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(pageSize) {
        this.props.updatePageSize(pageSize);
    }

    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(0);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.pageState.number - 1);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.pageState.number + 1);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.pageState.totalPages - 1);
    }

    render() {
        let points = this.props.points.map(point =>
            <Point key={point.id}
                   point={point}/>
        );
        let navLinks = [];
        if (!this.props.pageState.first) {
            navLinks.push(<Button key="first" onClick={this.handleNavFirst}>&lt;&lt;</Button>);
            navLinks.push(<Button key="prev" onClick={this.handleNavPrev}>&lt;</Button>);
        }
        if (!this.props.pageState.last) {
            navLinks.push(<Button key="next" onClick={this.handleNavNext}>&gt;</Button>);
            navLinks.push(<Button key="last" onClick={this.handleNavLast}>&gt;&gt;</Button>);
        }
        return (
            <div>
                Количество элементов на странице: <InputNumber onChange={this.handleInput} defaultValue={this.props.pageState.size} min={1} max={5}/>
                <Table responsive bordered condensed hover striped>
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Принадлежит?</th>
                    </tr>
                    </thead>
                    <tbody>
                        {points}
                    </tbody>
                </Table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}
