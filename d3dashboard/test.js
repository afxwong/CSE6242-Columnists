document.addEventListener("DOMContentLoaded", function() {
    // When the DOM content is loaded, execute this function

    // Select the container div
    const container = d3.select("#container");

    // Append an SVG element to the container
    const svg = container.append("svg")
        .attr("width", 200)
        .attr("height", 200);

    // Append a circle to the SVG
    svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 50)
        .attr("fill", "steelblue");
});

// const D3Node = require('d3-node');
// const d3 = require('d3');
// const fs = require('fs');
// const sharp = require('sharp');


// const options = {
//     d3Module: d3,
//     selector: '#chart',
//     container: '<div id="container"><div id="chart"></div></div>'
//   };
  
// // Create a d3-node object with the selector and the required d3 module. 
// const d3n = new D3Node(options);

// const margin = {
// top: 10, right: 5, bottom: 30, left: 5 
// };
// const width = 1000 - margin.left - margin.right;
// const height = 450 - margin.top - margin.bottom;
// const svgWidth = width + margin.left + margin.right;
// const svgHeight = height + margin.top + margin.bottom;

// // Create an svg element with the width and height defined.
// const svg = d3n.createSVG(svgWidth, svgHeight);

// const tempData = [{ year: 2020, value: 100 }, { year: 2019, value: 200 }, { year: 2018, value: 30 }, { year: 2017, value: 50 }, { year: 2016, value: 80 }];

// // Create the scales for x-axis and y-axis. 
// const xScale = d3.scaleBand().range([0, width]).padding(0.4);
// const yScale = d3.scaleLinear().range([height, 0]);

// let yMax = d3.max(tempData, (d) => { return d.value; });
// yMax += yMax * 0.3;
// xScale.domain(tempData.map((d) => { return d.year; }));
// yScale.domain([0, yMax]);


// svg.append('rect')
//     .attr('width', '100%')
//     .attr('height', '100%')
//     .style('fill', 'white');

// // Add a title text to your bar chart. 
// svg.append('text')
//   .attr('transform', 'translate(150,0)')
//   .attr('x', 50)
//   .attr('y', 50)
//   .attr('font-size', '24px')
//   .text('Node and D3 Bar chart');

// // Append a group element to which the bars and axes will be added to.
// svg.append('g').attr('transform', `translate(${ 100 },${ 100 })`);

// // Appending x-axis
// svg.append('g')
// .attr('transform', `translate(50,${ height })`)
// .call(d3.axisBottom(xScale))
// .append('text')
// .attr('y', height - 380)
// .attr('x', width - 500)
// .attr('text-anchor', 'end')
// .attr('stroke', 'black')
// .attr('font-size', '20px')
// .text('Year');


// // Appending y-aixs
// svg.append('g')
//   .attr('transform', 'translate(50,0)')
//   .call(d3.axisLeft(yScale).tickFormat((d) => {
//     return `$${ d }`;
//   })
//     .ticks(5))
//   .append('text')
//   .attr('transform', 'rotate(-90)')
//   .attr('y', 150)
//   .attr('x', -150)
//   .attr('dy', '-9.1em')
//   .attr('text-anchor', 'end')
//   .attr('stroke', 'black')
//   .attr('font-size', '20px')
//   .text('Cost');

  
//   // Appending the bars
//   svg.selectAll('.bar')
//          .data(tempData)
//          .enter().append('rect')
//          .attr('transform', 'translate(50,0)')
//          .attr('class', 'bar')
//          .attr('x', (d) => { return xScale(d.year); })
//          .attr('y', (d) => { return yScale(d.value); })
//          .attr('width', xScale.bandwidth())
//          .attr('height', (d) => { return height - yScale(d.value); })
//          .style('fill', 'orange');