import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { LineData } from "../../constant/line-data.constant";
import { AreaData } from "../../constant/area-data.constant";
import { PieData } from "../../constant/pie-data.constant";

const D3Chart = () => {
  const chRef = useRef();
  const barChartRef = useRef();
  const lineChartRef = useRef();
  const areaChartRef = useRef();
  const pieChartRef = useRef();
  const data = [
    { name: "Mark", value: 90 },
    { name: "Robert", value: 12 },
    { name: "Emily", value: 34 },
    { name: "Marion", value: 53 },
    { name: "Nicolas", value: 98 },
    { name: "Mélanie", value: 23 },
    { name: "Gabriel", value: 18 },
    { name: "Jean", value: 104 },
    { name: "Paul", value: 2 },
  ];
  const width = 700,
    height = 400;
  const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
  const BAR_PADDING = 0.3;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [data, height]);

  const xScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.value));
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <g key={i}>
        <rect
          x={xScale(0)}
          y={yScale(d.name)}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          opacity={0.7}
          stroke="#9d174d"
          fill="#9d174d"
          fillOpacity={0.3}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={xScale(d.value) - 7}
          y={yScale(d.name) + yScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.value}
        </text>
        <text
          x={xScale(0) + 7}
          y={yScale(d.name) + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.name}
        </text>
      </g>
    );
  });

  const grid = xScale
    .ticks(5)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          x1={xScale(value)}
          x2={xScale(value)}
          y1={0}
          y2={boundsHeight}
          stroke="#808080"
          opacity={0.2}
        />
        <text
          x={xScale(value)}
          y={boundsHeight + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          stroke="#808080"
          opacity={0.8}
        >
          {value}
        </text>
      </g>
    ));

  useEffect(() => {
    drawChart();
    drawBarChart();
    drawLineChart();
    drawAreaChart();
    drawPieChart();
  });
  // 2nd chart
  const drawChart = () => {
    const colors = [
      "#8ce8ad",
      "#57e188",
      "#34c768",
      "#2db757",
      "#27acaa",
      "#42c9c2",
      "#60e6e1",
      "#93f0e6",
      "#87d3f2",
      "#4ebeeb",
      "#35a4e8",
      "#188ce5",
      "#542ea5",
      "#724bc3",
      "#9c82d4",
      "#c981b2",
      "#b14891",
      "#ff6d00",
      "#ff810a",
      "#ff9831",
      "#ffb46a",
      "#ff9a91",
      "#ff736a",
      "#f95d54",
      "#ff4136",
      "#c4c4cd",
    ];

    const data = [
      { name: "<5", value: 19 },
      { name: "5-9", value: 20 },
      { name: "10-14", value: 19 },
      { name: "15-19", value: 24 },
      { name: "20-24", value: 22 },
      { name: "25-29", value: 29 },
      { name: "30-34", value: 22 },
      { name: "35-39", value: 18 },
      { name: "40-44", value: 23 },
      { name: "45-49", value: 19 },
      { name: "50-54", value: 16 },
      { name: "55-59", value: 19 },
      { name: "60-64", value: 28 },
      { name: "65-69", value: 17 },
      { name: "70-74", value: 20 },
      { name: "75-79", value: 17 },
      { name: "80-84", value: 18 },
      { name: "≥85", value: 21 },
    ];
    const svgContainer = d3.select(chRef.current).node();
    const width = svgContainer.getBoundingClientRect().width;
    const height = width;
    const margin = 15;
    let radius = Math.min(width, height) / 2 - margin;
    // legend Position
    let legendPosition = d3
      .arc()
      .innerRadius(radius / 1.75)
      .outerRadius(radius);

    // Create SVG
    const svg = d3
      .select(chRef.current)
      .append("svg")
      .attr("width", "500px")
      .attr("height", "500px")
      .attr("viewBox", "0 0 " + width + " " + width)
      //.attr('preserveAspectRatio','xMinYMin')
      .append("g")
      .attr(
        "transform",
        "translate(" +
          Math.min(width, height) / 2 +
          "," +
          Math.min(width, height) / 2 +
          ")"
      );

    let pie = d3.pie().value((d) => d.value);
    let data_ready = pie(data);

    // Donut partition
    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius / 1.75) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr("fill", (d) => colors[d.index])
      .attr("stroke", "#fff")
      .style("stroke-width", "2")
      .style("opacity", "0.8");

    // Legend group and legend name
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${legendPosition.centroid(d)})`)
      .attr("class", "legend-g")
      .style("user-select", "none")
      .append("text")
      .text((d) => d.data.name)
      .style("text-anchor", "middle")
      .style("font-weight", 700)
      .style("fill", "#222")
      .style("font-size", 14);

    //Label for value
    svg
      .selectAll(".legend-g")
      .append("text")
      .text((d) => {
        return d.data.value;
      })
      .style("fill", "#444")
      .style("font-size", 12)
      .style("text-anchor", "middle")
      .attr("y", 16);
  };
  // 3rd chart
  const drawBarChart = () => {
    const DATA = [
      {
        id: 1,
        value: 100,
      },
      {
        id: 2,
        value: 70,
      },
      {
        id: 3,
        value: 150,
      },
      {
        id: 4,
        value: 50,
      },
      {
        id: 5,
        value: 200,
      },
      {
        id: 6,
        value: 130,
      },
    ];

    const MARGIN = { top: 20, right: 20, bottom: 50, left: 50 };
    const WIDTH = 300 - MARGIN.left - MARGIN.right;
    const HEIGHT = 500 - MARGIN.top - MARGIN.bottom;
    d3.select(barChartRef.current).append("svg").attr("id", "barchartsvg");
    const chart = d3
      .select("#barchartsvg")
      .attr("width", WIDTH + MARGIN.left + MARGIN.right)
      .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
      .append("g")
      .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

    const getY = d3.scaleLinear().domain([0, 200]).range([HEIGHT, 0]);

    const getX = d3
      .scaleBand()
      .rangeRound([0, WIDTH])
      .padding(0.2)
      .domain(
        DATA.map(function (d) {
          return d.id;
        })
      );

    const bar = chart
      .selectAll("g")
      .data(DATA)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(" + getX(d.id) + ",0)";
      });

    bar
      .append("rect")
      .attr("fill", "skyblue")
      .attr("y", function (d) {
        return getY(d.value);
      })
      .attr("height", function (d) {
        return HEIGHT - getY(d.value);
      })
      .attr("width", getX.bandwidth());

    chart.append("g").call(d3.axisLeft(getY));

    chart
      .append("g")
      .attr("transform", "translate(0," + HEIGHT + ")")
      .call(d3.axisBottom(getX));
  };

  // 4th chart
  const drawLineChart = () => {
    const margin = { top: 10, right: 30, bottom: 30, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const svg = d3
      .select(lineChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const data = LineData;
    const sumstat = [];
    data.forEach((d) => {
      const existStrat = sumstat.find((i) => i.key === d.name);
      if (!existStrat) {
        sumstat.push({ key: d.name, values: [d] });
      } else {
        existStrat.values.push(d);
      }
    });

    // Add X axis --> it is a date format
    var x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.year;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.n;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // color palette
    var res = sumstat.map(function (d) {
      return d.key;
    }); // list of group names
    var color = d3
      .scaleOrdinal()
      .domain(res)
      .range([
        "#e41a1c",
        "#377eb8",
        "#4daf4a",
        "#984ea3",
        "#ff7f00",
        "#ffff33",
        "#a65628",
        "#f781bf",
        "#999999",
      ]);
    // Draw the line
    svg
      .selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return color(d.key);
      })
      .attr("stroke-width", 1.5)
      .attr("d", function (d) {
        return d3
          .line()
          .x(function (d) {
            return x(d.year);
          })
          .y(function (d) {
            return y(+d.n);
          })(d.values);
      });
  };

  //5th chart
  const drawAreaChart = () => {
    var margin = { top: 10, right: 30, bottom: 30, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(areaChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const data = AreaData.filter(function (d, i) {
      return i < 90;
    }).map((i) => ({ ...i, date: new Date(i.date) }));
    console.log("data", data);
    // Add X axis --> it is a date format
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return +d.value;
        })
      )
      .range([height, 0]);
    svg
      .append("g")
      .attr("transform", "translate(-5,0)")
      .call(d3.axisLeft(y).tickSizeOuter(0));

    // Add the area
    svg
      .append("path")
      .datum(data)
      .attr("fill", "#69b3a2")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "none")
      .attr(
        "d",
        d3
          .area()
          .x(function (d) {
            return x(d.date);
          })
          .y0(height)
          .y1(function (d) {
            return y(d.value);
          })
      );

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.value);
          })
      );

    // Add the line
    svg
      .selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "red")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("r", 3);
  };

  //6th chart
  const drawPieChart = () => {
    const width = 450,
      height = 450,
      margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
      .select(pieChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create dummy data
    const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

    // set the color scale
    const color = d3
      .scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value(function (d) {
      return d[1];
    });
    const data_ready = pie(Object.entries(data));

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("whatever")
      .data(data_ready)
      .join("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", function (d) {
        return color(d.data[1]);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);
  };
  return (
    <div>
      <div>
        <svg width={width} height={height}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          >
            {grid}
            {allShapes}
          </g>
        </svg>
      </div>

      <div ref={chRef}></div>
      <div ref={barChartRef}></div>
      <div ref={lineChartRef}></div>
      <div ref={areaChartRef}></div>
      <div ref={pieChartRef}></div>
    </div>
  );
};

export default D3Chart;
