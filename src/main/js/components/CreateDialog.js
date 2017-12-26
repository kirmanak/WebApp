import InputNumber from 'rc-input-number';
import React from 'react';
import {Button} from 'belle';
import {ButtonToolbar, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

const xOptions = [
    {value:"-3", content:"X = -3"},
    {value:"-2", content:"X = -2"},
    {value:"-1", content:"X = -1"},
    {value:"0", content:"X = 0"},
    {value:"1", content:"X = 1"},
    {value:"2", content:"X = 2"},
    {value:"3", content:"X = 3"},
    {value:"4", content:"X = 4"},
    {value:"5", content:"X = 5"}
];
const rOptions = [
    {value:"-3", content:"R = -3"},
    {value:"-2", content:"R = -2"},
    {value:"-1", content:"R = -1"},
    {value:"0", content:"R = 0"},
    {value:"1", content:"R = 1"},
    {value:"2", content:"R = 2"},
    {value:"3", content:"R = 3"},
    {value:"4", content:"R = 4"},
    {value:"5", content:"R = 5"}
];

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            xValue : 0,
            yValue : 0,
            rValue : this.props.r
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let newPoint = {};
        newPoint['x'] = this.state.xValue;
        newPoint['y'] = this.state.yValue;
        newPoint['r'] = this.state.rValue;
        this.props.onCreate(newPoint);
    }

    render() {
        let inputs = [
            <label key="y">
                Y = <InputNumber defaultValue={this.state.yValue}
                             min={-3}
                             max={5}
                             onChange={(value) => {this.setState({yValue:value})}} />
            </label>,
            <Button key="submit" onClick={this.handleSubmit}>Проверить</Button>,
            <ButtonToolbar key='x'>
                <ToggleButtonGroup name="xOptions" onChange={value => this.setState({xValue: value})} type="radio">
                    {
                        xOptions.map((option, index) =>
                                <ToggleButton value={option.value} key={index}>
                                    {option.content}
                                </ToggleButton>
                        )
                    }
                </ToggleButtonGroup>
            </ButtonToolbar>,
            <ButtonToolbar key='r'>
                <ToggleButtonGroup name="rOptions" onChange={value => {
                    this.setState({rValue: value}); this.props.changeRadius(value);
                }} type="radio">
                    {
                        rOptions.map((option, index) => {
                            if (option.value > 0) {
                                return (
                                    <ToggleButton value={option.value} key={index}>
                                        {option.content}
                                    </ToggleButton>
                                )
                            } else {
                                return (
                                    <ToggleButton disabled value={option.value} key={index}>
                                        {option.content}
                                    </ToggleButton>
                                )

                            }
                        })
                    }
                </ToggleButtonGroup>
            </ButtonToolbar>,
            /*
            <RadioGroup horizontal key='r' onChange={(value) => {
                this.setState({rValue: value});
                this.props.changeRadius(value);
            }}>
                {
                    rOptions.map((option, index) => {
                        if (option.value > 0) {
                            return (
                                <RadioButton value={option.value} key={index}>
                                    {option.content}
                                </RadioButton>
                            );
                        } else {
                            return (
                                <RadioButton disabled value={option.value} key={index}>
                                    {option.content}
                                </RadioButton>
                            );
                        }
                    })
                }
            </RadioGroup>
            */
        ];

        return (
            <div>
                <form>
                    {inputs}
                </form>
            </div>
        )
    }

}

