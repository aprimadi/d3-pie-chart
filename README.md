# d3-labeled-pie-chart

d3 library for rendering pie chart

## Usage

This library has no d3 dependencies, instead you have to install d3 
dependencies directly via npm or include it in your HTML. The class assumes 
that d3 dependencies will be injected into the class via the constructor, i.e.:

```javascript
import PieChart from 'd3-pie-chart'
import * as d3 from 'd3'

const chart = new PieChart(d3, data)
chart.render(document.querySelector("#chart"))
```

