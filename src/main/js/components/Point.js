import Belle from 'belle';
import React from 'react';

const Button = Belle.Button;

 export default class Point extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.point);
    }

    render() {
        return (
            <tr>
                <td>{this.props.point.x.toFixed(2)}</td>
                <td>{this.props.point.y.toFixed(2)}</td>
                <td>{this.props.point.r}</td>
                <td>{this.props.point.inside ? 'Принадлежит':'Не принадлежит'}</td>
                <td>
                    <Button onClick={this.handleDelete}>Удалить</Button>
                </td>
            </tr>
        )
    }
}
