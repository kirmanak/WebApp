import InputNumber from 'rc-input-number';
import React from 'react';
import Point from './Point';
import Belle from 'belle';
const Button = Belle.Button;

const initialPageSize = 3;

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
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        let points = this.props.points.map(point =>
            <Point key={point._links.self.href} 
                   attributes={this.props.attributes}
                   onDelete={this.props.onDelete}
                   point={point}/>
        );
        let navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<Button key="first" onClick={this.handleNavFirst}>&lt;&lt;</Button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<Button key="prev" onClick={this.handleNavPrev}>&lt;</Button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<Button key="next" onClick={this.handleNavNext}>&gt;</Button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<Button key="last" onClick={this.handleNavLast}>&gt;&gt;</Button>);
        }
        return (
            <div>
                Количество элементов на странице: <InputNumber onChange={this.handleInput} defaultValue={initialPageSize} min={1} max={10}/>
                <table>
                    <tbody>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Принадлежит?</th>
                    </tr>
                    {points}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}
