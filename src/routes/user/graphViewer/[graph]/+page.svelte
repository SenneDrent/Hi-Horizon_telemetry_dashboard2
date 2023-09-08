<script lang="ts" type="module">
import Chart from 'chart.js/auto';
import { pageName, showBackButton } from "../../../../stores";
import type { ActionData, PageData } from "./$types";
import { onMount } from 'svelte';
import { setupPageDefault } from '$lib/setupPageDefault';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

export let data: PageData;

setupPageDefault();
pageName.set(data.graphName);
showBackButton.set(true);

let xAxesOption:string;
let yAxesOption:string;
let GraphType:string;

let chartCanvas: any;
let ctx: any;
let chart:any

onMount(() => {
		  ctx = chartCanvas.getContext('2d');
			chart = new Chart(ctx, {
				type: 'line',
				data: {
						labels: [],
						datasets: [{
								label: "none",
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
								data: []
						}]
				},
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "none"
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "none"
                            }
                        }
                    }
                }
		});

});

async function displayNewGraph(x:any, y:any) {
    chart.type = GraphType;
    chart.options.scales.x.title.text = x.name;
    chart.data.labels = x.points
    chart.options.scales.y.title.text = y.name;
    chart.data.datasets[0].data = y.points
    chart.update();
}

async function fetchGraphDataPoints() {
    const response = await fetch('./REST?x='+xAxesOption+"&y="+yAxesOption);
    const message = await response.json();

    displayNewGraph(message.x, message.y);
}

$:console.log(chart)
</script>

<svelte:head>
    <title>GraphViewer - {data.graphName}</title>
</svelte:head>

<div class="flex flex-col items-start space-y-5 h-full">
    <div class="flex space-x-3 w-full h-full">
        <div class="flex flex-col w-1/6 space-y-3">
        <!-- <form class="flex flex-col w-1/6 space-y-3" method="POST" action="?/getGraphDataPoints"> -->
            <label for="X-axis" class="font-bold">X-axis</label>
            <select bind:value={xAxesOption} name="X-axis" class="p-3 rounded bg-stone-600">
                <option value="UnixTime">Time</option>
                {#each data.readStatisticTypes as readStatisticsType}
                    <option value={readStatisticsType.abbreviation}>{readStatisticsType.name}</option>
                {/each}
            </select>
            <label for="Y-axis" class="font-bold">Y-axis</label>
            <select bind:value={yAxesOption} name="Y-axis" class="p-3 rounded bg-stone-600">
                {#each data.readStatisticTypes as readStatisticsType}
                    <option value={readStatisticsType.abbreviation}>{readStatisticsType.name}</option>
                {/each}
                <option value="UnixTime">Time</option>
            </select>
            <label for="GraphType" class="font-bold">Graph Type</label>
            <select bind:value={GraphType} name="GraphType" class="p-3 rounded bg-stone-600">
                <option value="line">Line</option>
                <option value="scatter">Scatter</option>
                <option value="bar">Bar</option>
            </select>
            <button on:click={()=>fetchGraphDataPoints()} class="bg-stone-700 hover:bg-stone-600 rounded p-2">View</button>
        <!-- </form> -->
        </div>
        <div class="flex-grow rounded-xl h-full bg-stone-800">
            <canvas bind:this={chartCanvas} id="dataChart"></canvas>
        </div>
    </div>
</div>