import ReactApexChart from 'react-apexcharts';import React, {useEffect, useState} from "react";export default class AreaChart extends React.Component {    constructor(props) {        super(props);        this.state = {            options: {                dataLabels: {                    enabled: false                },                stroke: {                    curve: 'smooth'                },                xaxis: {                    type: 'datetime',                    categories: ["2018-01-19", "2018-02-19", "2018-03-19",                        "2018-04-19", "2018-05-19", "2018-06-19", "2018-07-19", "2018-08-19", "2018-09-19", "2018-10-19", "2018-11-19", "2018-12-19"],                },                tooltip: {                    x: {                        format: 'dd/MM/yy'                    },                }            }        }    }    render() {        console.log("PROPS --> ", this.props.invoices);        this.state.series = [{            name: 'CARD',            data: this.props.card        }, {            name: 'CASH',            data: this.props.cash        }];        return (            <div id="chart">                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="350" width={"600"}/>            </div>        );    }}