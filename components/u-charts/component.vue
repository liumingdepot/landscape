<template>
	<canvas v-if="canvasId" :id="canvasId" :canvasId="canvasId" 
	:style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 
	'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px',
	'margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
	 @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error">
	</canvas>
</template>

<script>
	import uCharts from './u-charts.js';
	var canvases = {};

	export default {
		props: {
			chartData: {
				required: true,
				type: Object,
			},
			chartType: {
				required: true,
				type: String,
				default: 'column'
			},
			opts: {
				required: true,
				type: Object,
				default () {
					return null;
				},
			},
			canvasId: {
				type: String,
				default: 'u-canvas',
			},
			cWidth: {
				default: 375,
			},
			cHeight: {
				default: 250,
			}
		},
		data() {
			return {
				pixelRatio: 1
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				switch (this.chartType) {
					case 'column':
						this.initHistogramChart();
						break;
					case 'gauge':
						this.initGaugeVhart();
						break;	
					default:
						break;
				}
			},
			//柱状图
			initHistogramChart() {
				canvases[this.canvasId] = new uCharts({
					/**
					 * 通用配置
					 */
					$this: this, //this实例组件内使用图表，必须传入this实例
					canvasId: this.canvasId, //页面组件canvas-id，支付宝中为id
					//图表类型，可选值为pie、line、column、area、ring、radar、arcbar、gauge、candle、bar、mix、rose、word
					type: 'column',
					//图表配色方案，不传则使用系统默认配置，例如['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d']
					colors: ['#66cc99', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
					width: this.cWidth * this.pixelRatio, //canvas宽度，单位为px，支付宝高分屏需要乘像素比
					height: this.cHeight * this.pixelRatio, //canvas高度，单位为px，支付宝高分屏需要乘像素比
					padding: [15, 5, 0, 15], //画布填充边距，顺序为上右下左，同css，但必须4位
					pixelRatio: this.pixelRatio, //像素比，默认为1，仅支付宝小程序需要大于1，其他平台必须为1
					rotate: false, //是否横屏模式，默认为false
					rotateLock: false, //锁定横屏模式
					fontSize: 11, //全局默认字体大小
					background: '#FFFFFF', //canvas背景颜色（如果页面背景颜色不是白色请设置为页面的背景颜色，默认#ffffff）
					enableScroll: false, //是否开启图表可拖拽滚动 默认false 支持line, area, column, candle图表类型(需配合绑定@touchstart, @touchmove, @touchend方法)
					enableMarkLine: false, //是否显示辅助线 默认false 支持line, area, column, candle, mix图表类型
					legend: { show: true },
					animation: true, //是否动画展示
					duration: 1000, //动画展示时长单位毫秒
					dataPointShape: false, //是否在图表中显示数据点图形标识
					dataPointShapeType: "solid", //数据点图形标识类型 可选值：实心solid、空心hollow
					dataLabel: false, //是否在图表中显示数据标签内容值

					/**
					 * 数据配置 其他配置  参照 http://doc.ucharts.cn/1172126
					 */
					categories: this.chartData.categories, //数据类别
					series: this.chartData.series, //数据列表
					xAxis: {
						disableGrid: true,
						rotateLabel:true,
						itemCount:5,
					},
					yAxis:{
						min:0,
						titleFontColor:'#ffffff'
					},
					//柱状图
					extra: {
						column: {
							type: 'group',
							width: this.cWidth * this.pixelRatio * 0.45 / this.chartData.categories.length
						}
					},
					//传入参数
					...this.opts
				});
			},
			initGaugeVhart(){
				const chartData = this.chartData
				canvases[this.canvasId] = new uCharts({
					$this:this,
					canvasId: this.canvasId,
					type: 'gauge',
					fontSize:11,
					legend:false,
					colors: ['#66cc99', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
					title: {
						name: chartData.series[0].name,
						color: '#333333',
						fontSize: 15,
						offsetY:30,
					},
					subtitle: {
						name: chartData.series[0].num,
						color: '#333333',
						fontSize: 45,
						offsetY:-50,
					},
					background:'#FFFFFF',
					pixelRatio:1,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: this.cWidth,
					height: this.cHeight,
					dataLabel: true,
					extra: {
						gauge: {
							width: 10, //仪表盘背景的宽度
							startAngle: 0.75,
							endAngle: 0.25,
							startNumber: 0,
							endNumber: 500,
							labelColor: "#909090",
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: 0, //仪表盘背景的宽度
								color: '#eaeaea',
								childNumber: 0,
								childWidth: 0, //仪表盘背景的宽度
							},
							pointer: {
								width: 0, //指针宽度
								color: 'auto'
							}
						}
					},
					...this.opts
				});
			},
			// 这里仅作为示例传入两个参数，cid为canvas-id,newdata为更新的数据，需要更多参数请自行修改
			changeData(cid, newdata) {
				canvases[cid].updateData({
					series: newdata.series,
					categories: newdata.categories
				});
			},
			touchStart(e) {
				canvases[this.canvasId].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
				canvases[this.canvasId].scrollStart(e);
			},
			touchMove(e) {
				canvases[this.canvasId].scroll(e);
			},
			touchEnd(e) {
				canvases[this.canvasId].scrollEnd(e);
			},
			error(e) {
				console.log(e)
			}
		},
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
</style>
