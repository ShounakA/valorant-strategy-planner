import React, { Component } from "react";
import * as d3 from 'd3';
class Agent extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            name: this.props.name,
            cdn: this.props.cdn,
            team: this.props.team,
            d3_circle_radius: 10,
            id:this.props.team+this.props.name,

        }
    }
    componentDidMount(){
        this.addPlayer();
    }
    componentWillUnmount(){
        d3.select('#'+this.state.id).remove();
    }
    addPlayer(){
        var team = this.state.team;
        var cdn = this.state.cdn;
        var name = this.state.name;
        var layer = d3.select("#Draggables")

        layer.append('g')
        .attr("id", team+name)

        layer = d3.select('#'+team+name)
        
        let teamcolor ='#24E8AD'
        if (team==='attack')
            teamcolor = '#FF5859'
        layer.style('cursor','grab')
        layer.append("circle")
            .attr('cx', 50)
            .attr('cy', 50)
            .attr('r', this.state.d3_circle_radius)
            .style("fill", teamcolor)
            .style("stroke", teamcolor)
            .style('stroke-width', 5)
        layer.append('polygon')
            .attr('points',"40,50 60,50 50,30")
            .style("fill", teamcolor)
        layer.append("image")
            .attr("href", cdn)
            .attr('x', 35)
            .attr('y', 35)
            .attr('width',30)
            .attr('height', 30)

        this.cursorSetup(layer)
        //make draggable
        let translateX = 0
        let translateY = 0

        const handleDrag = d3.drag()
        .subject(
            function() {
                d3.select(this);
                return { x: translateX, y: translateY }
            }
        ).on('drag', 
            function() {
                const me = d3.select(this);
                const transform = `translate(${d3.event.x}, ${d3.event.y})`;
                translateX = d3.event.x;
                translateY = d3.event.y;
                me.attr('transform', transform);
            }
        );
        handleDrag(layer);
    }
    cursorSetup(layer){
        layer.on('mousedown', function(){
            console.log('down')
            const me =d3.select(this);
            me.style('cursor', 'grabbing')
        })
        layer.on('mousemove', function(){

            const me =d3.select(this);
            me.style('cursor', 'grab')
        })
    }
    deleteAgent(){
        this.props.onDelete(this.state.name, this.state.team)
    }
    render(){
        return <div>
                {this.state.name} &nbsp;
                <button onClick={this.deleteAgent.bind(this)}>Delete</button>  
            </div>;
    }
}
export default Agent;