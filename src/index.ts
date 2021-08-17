interface PieChartDatum {
  label: string,
  value: number,
}

type ColorFn = (d: PieChartDatum) => string

class PieChart {
  d3: any
  data: Array<PieChartDatum>
  width: number
  height: number
  colorFn: ColorFn

  constructor(
    d3: any, 
    data: Array<PieChartDatum>, 
    options: {
      width: number, 
      height: number,
      colorFn?: (d: PieChartDatum) => string
    } = { width: 960, height: 480 }
  ) {
    this.d3 = d3
    this.data = data
    this.width = options.width
    this.height = options.height

    const color = d3.scaleOrdinal(d3.schemeTableau10)
    this.colorFn = options.colorFn || function(d: PieChartDatum) {
      return color(d.label)
    }
  }

  getColorFn(): ColorFn {
    return this.colorFn
  }

  render(el: HTMLElement) {
    const d3 = this.d3

    var svg = d3.select(el).selectAll("svg")
      .data([null])
      .join("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")

    var g = d3.select(el).select("g")

    g.append("g")
      .attr("class", "slices")

    var width = this.width,
        height = this.height,
        radius = Math.min(width, height) / 2

    var pie = d3.pie()
      .value(function(d: PieChartDatum) {
        return d.value
      })


    var arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(0)

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var key = function(d: any) { return d.data.label }

    const change = (data: Array<PieChartDatum>) => {
      /* ------- PIE SLICES -------*/
      var slice = svg.select(".slices").selectAll("path")
        .data(pie(data), key)
        .join("path")
          .attr('stroke', '#fff')
          .attr('d', arc)
          .style("fill", (d: any) => { 
            return this.colorFn(d.data) 
          })
          .attr("class", "slice")

      slice		
        .transition().duration(1000)
        .attrTween("d", function(d: PieChartDatum) {
          this._current = this._current || d
          var interpolate = d3.interpolate(this._current, d)
          this._current = interpolate(0)
          // t is a number between 0 at the start of the transaction and 1 at 
          // the end of the transaction
          return function(t: number) {
            return arc(interpolate(t))
          }
        })
    }

    change(this.data)
  }
}

export default PieChart

