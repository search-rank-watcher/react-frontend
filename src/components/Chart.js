import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Scatter, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
moment.locale("ja", { weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"], weekdaysShort: ["日","月","火","水","木","金","土"], });

class CustomizedLabel extends PureComponent {
  render() {
    const {x, y, index} = this.props;
    return (
      <text x={x-5} y={y} dy={-10} fontSize={10} textAnchor="start" fill={this.props.data[index].color}>
        <tspan >
          {this.props.data[index].note}
        </tspan>
      </text>
    )
  }
}

const CustomizedDot = (props) => {
  const {
    r, cx, cy, width, height, index
  } = props;
  console.log(props.data[index])
  if (props.data[index].note) {
    const color = props.data[index].color
    return (
      <circle r={r} stroke={color} strokeWidth="1" fill={color} width={width} height={height} className="recharts-dot recharts-line-dot" cx={cx} cy={cy}/>
    );
  } else {
    return null
  }
}

const CustomizedActiveDot = (props) => {
  const {
    r, cx, cy, width, height, index
  } = props;
  console.log(props.data[index])
  if (props.data[index].note) {
    const color = props.data[index].color
    return (
      <circle r={r} stroke="#000" stroke-width="1" fill={color} width={width} height={height} class="recharts-dot recharts-line-dot" cx={cx} cy={cy}/>
    );
  } else {
    const color = "#78909c"
    return (
      <circle r={r} stroke="#000" stroke-width="1" fill={color} width={width} height={height} class="recharts-dot recharts-line-dot" cx={cx} cy={cy}/>
    );
  }
}

const CustomizedAxisTick = (props) => {
    const {x, y, payload} = props;
		
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={8} fill="#666" fontSize={10} >
          <tspan textAnchor="middle" x="0">{moment(payload.value).format('M/D')}</tspan>
          <tspan textAnchor="middle" x="0" dy="12" fontSize={8}>{moment(payload.value).format('(ddd)')}</tspan>
        </text>
      </g>
    );
};

export default (props) => {
  const data = props.data
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart data={data} margin={{top: 24, right: 16, bottom: 0, left: -24}}>
          
          <XAxis dataKey="date" tickLine={false} tick={<CustomizedAxisTick/>} 
          ticks={['2019/11/04', '2019/11/11', '2019/11/18', '2019/11/25', '2019/12/02', '2019/12/09', '2019/12/16', '2019/12/23', '2019/12/30']}/>
          <YAxis reversed={true} tickLine={false} type="number" domain={[1, 100]} ticks={[1, 20, 40, 60, 80, 100]} tickMargin={8} fontSize={10}/>

          <CartesianGrid stroke="#cfd8dc" fill='#eceff1'/>
          <Tooltip active={true}/>
          <Scatter data={data}/>
          <Line dataKey="value" stroke="#78909c" 
            dot={<CustomizedDot data={data}/>} 
            activeDot={<CustomizedActiveDot data={data}/>} 
            label={<CustomizedLabel data={data}/>} 
            isAnimationActive={false}/>}/>/>

        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
