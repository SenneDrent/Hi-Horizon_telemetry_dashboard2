<script lang="ts">
    import { pageName } from "../../../../stores";
    import type { PageData } from "./$types";
    
    
    export let data: PageData;
    pageName.set(data.graphName);
</script>

<svelte:head>
    <title>GraphViewer - {data.graphName}</title>
</svelte:head>

<div class="flex flex-col items-start space-y-5">
    <a href="./" class="hover:bg-stone-600 rounded text-center p-3"><img src="/icons/arrowBack.svg" alt="Go Back"></a>
    <div class="flex space-x-3 w-full">
        <form class="flex flex-col flex-none space-y-3">
            <input type="datetime-local" class="bg-stone-800 py-1 rounded" placeholder="from: ss/mm/hh - dd/mm/yy"/>
            <input type="datetime-local" class="bg-stone-800 py-1 rounded" placeholder="from: ss/mm/hh - dd/mm/yy"/>
            <button class="bg-stone-700 hover:bg-stone-600 rounded p-2">View</button>
        </form>
        <div class="flex-grow rounded-xl p-3 bg-stone-800">
            To be Added...
        </div>
    </div>
</div>