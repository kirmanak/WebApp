import React from 'react';

 export default class Point extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.point.x.toFixed(2)}</td>
                <td>{this.props.point.y.toFixed(2)}</td>
                <td>{this.props.point.r}</td>
                <td>{this.props.point.inside ? 'Принадлежит':'Не принадлежит'}</td>
            </tr>
        )
    }
}
