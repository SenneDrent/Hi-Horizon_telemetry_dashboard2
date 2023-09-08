<script lang="ts" type="module">
import Chart from 'chart.js/auto';
import { pageName } from "../../../../stores";
import type { ActionData, PageData } from "./$types";
import { onMount } from 'svelte';


export let data: PageData;
pageName.set(data.graphName);

export let form: ActionData;

let chartCanvas: any;
let ctx: any;

onMount(() => {
		  ctx = chartCanvas.getContext('2d');
			var chart = new Chart(ctx, {
				type: 'line',
				data: {
						labels: form?.x.points,
						datasets: [{
								label: form?.y.name,
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
								data: form?.y.points
						}]
				}
		});

});
</script>

<svelte:head>
    <title>GraphViewer - {data.graphName}</title>
</svelte:head>

<div class="flex flex-col items-start space-y-5">
    <a href="./" class="hover:bg-stone-600 rounded text-center p-3"><img src="/icons/arrowBack.svg" alt="Go Back"></a>
    <div class="flex space-x-3 w-full">
        <form class="flex flex-col w-1/6 space-y-3" method="POST" action="?/getGraphDataPoints">
            <label for="X-axis" class="font-bold">X-axis</label>
            <select name="X-axis" class="p-3 rounded bg-stone-600">
                <option value="UnixTime">Time</option>
                {#each data.readStatisticTypes as readStatisticsType}
                    <option value={readStatisticsType.abbreviation}>{readStatisticsType.name}</option>
                {/each}
            </select>
            <label for="Y-axis" class="font-bold">Y-axis</label>
            <select name="Y-axis" class="p-3 rounded bg-stone-600">
                {#each data.readStatisticTypes as readStatisticsType}
                    <option value={readStatisticsType.abbreviation}>{readStatisticsType.name}</option>
                {/each}
                <option value="UnixTime">Time</option>
            </select>
            <button class="bg-stone-700 hover:bg-stone-600 rounded p-2">View</button>
        </form>
        
        <div class="flex-grow rounded-xl p-3 bg-stone-800">
            <canvas bind:this={chartCanvas} id="dataChart"></canvas>
        </div>
    </div>
</div>