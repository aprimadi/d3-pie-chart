"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieChart = /** @class */ (function () {
    function PieChart(d3, data, options) {
        if (options === void 0) { options = { width: 960, height: 480 }; }
        this.d3 = d3;
        this.data = data;
        this.width = options.width;
        this.height = options.height;
        var color = d3.scaleOrdinal(d3.schemeTableau10);
        this.colorFn = options.colorFn || function (d) {
            return color(d.label);
        };
    }
    PieChart.prototype.getColorFn = function () {
        return this.colorFn;
    };
    PieChart.prototype.render = function (el) {
        var _this = this;
        var d3 = this.d3;
        var svg = d3.select(el).selectAll("svg")
            .data([null])
            .join("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g");
        var g = d3.select(el).select("g");
        g.append("g")
            .attr("class", "slices");
        var width = this.width, height = this.height, radius = Math.min(width, height) / 2;
        var pie = d3.pie()
            .value(function (d) {
            return d.value;
        });
        var arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(0);
        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var key = function (d) { return d.data.label; };
        var change = function (data) {
            /* ------- PIE SLICES -------*/
            var slice = svg.select(".slices").selectAll("path")
                .data(pie(data), key)
                .join("path")
                .attr('stroke', '#fff')
                .attr('d', arc)
                .style("fill", function (d) {
                return _this.colorFn(d.data);
            })
                .attr("class", "slice");
            slice
                .transition().duration(1000)
                .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                // t is a number between 0 at the start of the transaction and 1 at 
                // the end of the transaction
                return function (t) {
                    return arc(interpolate(t));
                };
            });
        };
        change(this.data);
    };
    return PieChart;
}());
exports.default = PieChart;
