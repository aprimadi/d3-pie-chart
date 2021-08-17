interface PieChartDatum {
    label: string;
    value: number;
}
declare type ColorFn = (d: PieChartDatum) => string;
declare class PieChart {
    d3: any;
    data: Array<PieChartDatum>;
    width: number;
    height: number;
    colorFn: ColorFn;
    constructor(d3: any, data: Array<PieChartDatum>, options?: {
        width: number;
        height: number;
        colorFn?: (d: PieChartDatum) => string;
    });
    getColorFn(): ColorFn;
    render(el: HTMLElement): void;
}
export default PieChart;
