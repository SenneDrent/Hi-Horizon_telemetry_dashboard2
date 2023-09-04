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
<ReadStatisticTable readStatisticTypes={data.readStatisticTypes}/>

<button on:click={()=>submitchanges()} class="p-2 text-center bg-green-700">Save</button>