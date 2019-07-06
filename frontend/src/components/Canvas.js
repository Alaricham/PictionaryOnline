import React, {
    Component
} from 'react';

class Canvas extends Component {

    canvasRef = React.createRef();
    state = {
        paint: false,
        click: {
            x: [],
            y: [],
            drag: [],
            color: [],
            stroke: []
        },
    }

    addClick = (xAxis, yAxis, dragging) => {
        let {
            y,
            x,
            drag,
            color,
            stroke
        } = this.state.click;
        let {
            strokeSize,
            sendDrawData
        } = this.props;
        let colorProp = this.props.color;
        let clickX = [xAxis];
        let clickY = [yAxis];
        let clickDrag = [dragging];
        let clickColor = [colorProp];
        let clickStroke = [strokeSize];

        this.setState({
            click: {
                x: x.concat(clickX),
                y: y.concat(clickY),
                drag: drag.concat(clickDrag),
                color: color.concat(clickColor),
                stroke: stroke.concat(clickStroke)
            }
        }, () => sendDrawData(this.state.click))
    }

    mousedown = (event) => {
        if (this.props.atCanvas) {
            let boundRect = this.canvasRef.current.getBoundingClientRect();
            let mouseX = event.pageX - boundRect.left;
            let mouseY = event.pageY - boundRect.top;
            this.setState({
                paint: true
            });
            this.addClick(mouseX, mouseY);
            this.redraw();
        }
    }

    mousemove = (event) => {
        let {
            color,
            strokeSize,
            atCanvas
        } = this.props;
        if (this.state.paint && atCanvas) {
            let boundRect = this.canvasRef.current.getBoundingClientRect();
            this.addClick(
                event.pageX - boundRect.left,
                event.pageY - boundRect.top,
                true,
                color,
                strokeSize);
            this.redraw();
        }
    };

    mouseleave = (event) => {
        this.setState({
            paint: false
        });
    };

    clearUpdate = () => {
        let {
            clearLift,
            clear
        } = this.props;
        if (clear) {
            this.setState({
                click: {
                    x: [],
                    y: [],
                    drag: [],
                    color: [],
                    stroke: []
                }
            }, clearLift())
        }
    }

    updateDrawingData = () => {
        const {
            x,
            y,
            color,
            stroke,
            drag
        } = this.props.drawData;
        return {
            x,
            y,
            color,
            drag,
            stroke
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.drawData !== this.props.drawData) {
            this.setState({
                click: this.updateDrawingData()
            })

        }

        this.redraw()

    }

    redraw = () => {
        const canvas = this.canvasRef;
        const context = canvas.current.getContext('2d')
        context.clearRect(0, 0, 300, 300); // Clears the canvas
        context.lineJoin = "round";
        let {
            x,
            y,
            color,
            stroke,
            drag
        } = this.state.click;
        let len = x.length;
        for (let i = 0; i < len; i++) {
            context.beginPath();
            if (drag[i] && i) {
                context.moveTo(x[i - 1], y[i - 1]);
            } else {
                context.moveTo(x[i] - 1, y[i]);
            }
            context.lineTo(x[i], y[i]);
            context.closePath();
            context.strokeStyle = color[i];
            context.lineWidth = stroke[i]
            context.stroke();
        }
    }


    render() {
        this.clearUpdate()
        return (
            <canvas
                ref={this.canvasRef}
                height={300}
                width={300}
                onMouseDown={this.mousedown}
                onMouseMove={this.mousemove}
                onMouseUp={this.mouseleave}
            />
        )
    }
}


export default Canvas;