<script lang="ts">
    import ReadStatisticTable from "./ReadStatisticTable.svelte";
    import { pageName } from "../../../stores";
    import type { SettingsLocalChange } from "$lib/interfaces/SettingsLocalChange";
    import { setupPageDefault } from "$lib/setupPageDefault";

    export let data;
    setupPageDefault();
    pageName.set("Settings");

    let readStatisticTypesLocalChangeLog: SettingsLocalChange[] = [];

    function askEmptyLocalChangeConfirmation() {
        let confirmation: boolean = confirm("Are you sure you want to undo all these changes?\nThis cannot be undone.");
        if (confirmation === true) emptyAllLocalChanges();
    }

    function emptyAllLocalChanges() {
        readStatisticTypesLocalChangeLog = [];
        data.readStatisticTypes = data.readStatisticTypes;
    }

    let waitingToSubmit: boolean = false;
    async function submitChanges(): Promise<any> {
        const AllchangeLogs: SettingsLocalChange[][] = [readStatisticTypesLocalChangeLog];
        let confirmation: boolean = confirm("are you sure you want these changes?");
        if (confirmation === true) {
            waitingToSubmit = true;
            const response = await fetch('/user/settings/REST', {
						method: 'POST',
						body: JSON.stringify( AllchangeLogs ),
						headers: {
							'Content-Type': 'application/json'
						}});
            const result = await response.json();
            waitingToSubmit = false;
            emptyAllLocalChanges();
            alert(result.response + "\ncode: "+ result.status);
        }
    }
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="flex flex-col flex-grow">
    <div class="flex-grow">
        <ReadStatisticTable bind:readStatisticTypesLocalChangeLog readStatisticTypes={data.readStatisticTypes}/>
    </div>
    <footer class="self-end">
        <button on:click={()=>askEmptyLocalChangeConfirmation()} class="p-2 text-center bg-stone-500 hover:bg-stone-400 rounded">Undo</button>
        {#if waitingToSubmit === true}
            <button class="p-2 text-center bg-green-600 rounded">loading...</button>
        {:else}
            <button on:click={()=>submitChanges()} class="p-2 text-center bg-green-700 hover:bg-green-600 rounded">
                Save all changes
            </button>
        {/if}
    </footer>
</div>