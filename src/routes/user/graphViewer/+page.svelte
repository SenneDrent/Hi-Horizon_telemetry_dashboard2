<script lang="ts">
    import { goto } from "$app/navigation";
    import { setupPageDefault } from "$lib/setupPageDefault";
import { pageName } from "../../../stores";

setupPageDefault();
pageName.set("Graphs");
</script>

<svelte:head>
	<title>GraphViewer</title>
</svelte:head>

<button on:click={()=>goto("/user/graphViewer/All Data")} class="rounded p-3 text-center w-full bg-stone-700 hover:bg-stone-600">View All Data</button>
