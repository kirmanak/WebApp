import React from 'react';

export default class Graph extends React.Component {
    
    constructor(props) {
        super(props);
        this.minX = props.minX;
        this.minY = props.minY;
        this.maxX = props.maxX;
        this.maxY = props.maxY;
        this.unitsPerTick = props.unitsPerTick;
        this.drawXAxis = this.drawXAxis.bind(this);
        this.drawYAxis = this.drawYAxis.bind(this);
        this.drawPoint = this.drawPoint.bind(this);
        this.drawEquationX = this.drawEquationX.bind(this);
        this.drawEquationY = this.drawEquationY.bind(this);
        this.transformContext = this.transformContext.bind(this);
        this.getClickCoords = this.getClickCoords.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.axisColor = 'black';
        this.font = '8pt Calibri';
        this.tickSize = 15;

        this.context = this.plot.getContext('2d');
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = this.plot.width / this.rangeX;
        this.unitY = this.plot.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.plot.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.plot.width);
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.plot.width / this.rangeX;
        this.scaleY = this.plot.height / this.rangeY;
    }
    
    drawXAxis () {
        let context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo(this.plot.width, this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        let xPosIncrement = this.unitsPerTick * this.unitX;
        let xPos, unit;
        context.font = this.font;
        context.textAlign = 'center';
        context.textBaseline = 'top';

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (xPos > 0) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit -= this.unitsPerTick;
            xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while (xPos < this.plot.width) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit += this.unitsPerTick;
            xPos = Math.round(xPos + xPosIncrement);
        }
        context.restore();
    }
    
    drawYAxis () {
        let context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 0);
        context.lineTo(this.centerX, this.plot.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        let yPosIncrement = this.unitsPerTick * this.unitY;
        let yPos, unit;
        context.font = this.font;
        context.textAlign = 'right';
        context.textBaseline = 'middle';

        // draw top tick marks
        yPos = this.centerY - yPosIncrement;
        unit = this.unitsPerTick;
        while (yPos > 0) {
            context.moveTo(this.centerX - this.tickSize / 2, yPos);
            context.lineTo(this.centerX + this.tickSize / 2, yPos);
            context.stroke();
            context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
            unit += this.unitsPerTick;
            yPos = Math.round(yPos - yPosIncrement);
        }

        // draw bottom tick marks
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (yPos < this.plot.height) {
            context.moveTo(this.centerX - this.tickSize / 2, yPos);
            context.lineTo(this.centerX + this.tickSize / 2, yPos);
            context.stroke();
            context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
            unit -= this.unitsPerTick;
            yPos = Math.round(yPos + yPosIncrement);
        }
        context.restore();
    }

    drawEquationX (equation, color, thickness) {
        const context = this.context;
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(this.minX, equation(this.minX));

        for (let x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
            if (equation(x) !== null)
                context.lineTo(x, Number(equation(x)));
            else
                context.moveTo(x, 0);
        }

        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    }

    drawEquationY (equation, color, thickness) {
        const context = this.context;
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(equation(this.minY), this.minY);

        for (let y = this.minY + this.iteration; y <= this.maxY; y += this.iteration) {
            if (equation(y) !== null)
                context.lineTo(Number(equation(y)), y);
            else
                context.moveTo(0, y);
        }

        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    }

    transformContext () {
        const context = this.context;

        // move context to center of canvas
        this.context.translate(this.centerX, this.centerY);

        context.scale(this.scaleX, -this.scaleY);
    }

    getClickCoords (evt) {
        const rect = this.plot.getBoundingClientRect();
        this.props.handleClick(
            (evt.clientX - rect.left - this.centerX) / this.unitX,
            (this.centerY + rect.top - evt.clientY) / this.unitY
        );
    }

    drawPoint (X, Y, color) {
        const context = this.context;
        context.save();
        context.save();
        this.transformContext();
        context.beginPath();
        context.arc(X, Y, 0.05, 0, 2 * Math.PI);
        context.restore();
        context.strokeStyle = color;
        context.stroke();
        context.fillStyle = color;
        context.fill();
        context.restore();
    }
    
    clear () {
        const R = this.props.r;
        this.context.clearRect(0, 0, this.plot.width, this.plot.height);
        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();

        this.drawEquationX((x) => {
            const y = 0;
            if (x > R || x < -R) return null;
            return y; 
        }, 'blue', 3);

        this.drawEquationX((x) => {
            const y = R/2;
            if (x > 0 || x < -R) return null;
            return y; 
        }, 'blue', 3);

        this.drawEquationX((x) => {
            const y = x /2 - R/2;
            if (x < 0 || x > R) return null;
            return y; 
        }, 'blue', 3);

        this.drawEquationX((x) => {
            const y = -Math.sqrt(R * R / 4 - x * x);
            if (isNaN(y) || x > 0 || y > 0) return null;
            return y; 
        }, 'blue', 3);

        this.drawEquationY((y) => {
            const x = 0;
            if (y > R/2 || y < -R/2) return null;
            return x; 
        }, 'blue', 3);
    }
  
    componentDidUpdate() {
        this.clear();
        this.props.points.map(point => {
            if (point.inhere == true) {
                this.drawPoint(point.x, point.y, 'green');
            } else {
                this.drawPoint(point.x, point.y, 'red');
            }
        });
    }

    render() {
        return (
            <canvas onClick={this.getClickCoords} ref={(plot) => {this.plot = plot}} height={this.props.height} width={this.props.width}/>
        );
    }

}
