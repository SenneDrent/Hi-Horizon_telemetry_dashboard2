<script lang="ts">
    import { SettingsLocalChange } from "$lib/classes/SettingsLocalChange";
    import ReadStatisticTable from "./ReadStatisticTable.svelte";
    import { pageName } from "../../../stores";
    import { writable } from "svelte/store";

    export let data;
    pageName.set("Settings");

    function submitchanges(): any {
        let confirmation: boolean = confirm("are you sure you want these changes?");
        throw new Error("Function not implemented.");
    }
</script>
<div class="flex flex-col flex-grow">
    <div class="flex-grow">
        <ReadStatisticTable readStatisticTypes={data.readStatisticTypes}/>
    </div>
    <footer class="self-end">
        <button on:click={()=>submitchanges()} class="p-2 text-center bg-stone-500 hover:bg-stone-400 rounded">Undo</button>
        <button on:click={()=>submitchanges()} class="p-2 text-center bg-green-700 hover:bg-green-600 rounded">Save all changes</button>
    </footer>
</div>