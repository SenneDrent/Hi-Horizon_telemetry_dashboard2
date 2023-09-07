<script lang="ts">
    import type { ReadStatisticType } from "$lib/interfaces/ReadStatisticType";
    import type { SettingsLocalChange } from "$lib/interfaces/SettingsLocalChange";

    export let readStatisticTypes: any = [];
    export let readStatisticTypesLocalChangeLog: SettingsLocalChange[] = [];

    let wantsToAdd: boolean = false;
    let addName:string = "";
    let addAbbreviation:string = "";
    let addQuantity:string = "";
    let addUnit:string = "";

    function addReadStatisticType() {
        let newReadStatistic: ReadStatisticType = {name: addName, abbreviation: addAbbreviation, quantity: addQuantity, unit: addUnit};
        let newLocalChange: SettingsLocalChange = {operation: "Add", settingType: "ReadStatisticType", structure: newReadStatistic};
        readStatisticTypesLocalChangeLog = [...readStatisticTypesLocalChangeLog, newLocalChange];
        
        closeAddForm();
        console.log(readStatisticTypesLocalChangeLog);
    }

    function revealAddForm(): void {
        wantsToAdd = true;
    }

    function closeAddForm(): void {
        wantsToAdd = false;
        addName="";
        addAbbreviation="";
        addQuantity="";
        addUnit="";
    }

    function deleteRow(name: string, isServerRow: boolean): void {
        if (isServerRow === false) {
            readStatisticTypesLocalChangeLog = readStatisticTypesLocalChangeLog.filter(t => t.structure.name != name);
        }
        else {
            let newLocalChange: SettingsLocalChange = {operation: "Delete", settingType: "ReadStatisticType", structure: name};
            readStatisticTypesLocalChangeLog = [...readStatisticTypesLocalChangeLog, newLocalChange];
            readStatisticTypes = readStatisticTypes;
        }
        console.log(readStatisticTypesLocalChangeLog);
    }

    function checkIfLocalNotDeleted(name:string): boolean {
        let found:boolean = true;
        readStatisticTypesLocalChangeLog.forEach(change => {
            if (change.structure === name) {
                found=false;
            }
        });
        return found;
    }
</script>

<div>
    <p class="text-left font-bold text-lg">ReadStatistics types</p>
    <div class="p-5 bg-stone-800 rounded">
        <table class="w-full table-fixed">
        <thead class="text-left">
            <tr>
                <th>Name</th>
                <th>Abbreviation</th>
                <th>Quantity</th>
                <th>Unit</th>
            </tr>
        </thead>
        <tbody>
            {#each readStatisticTypes as readStatisticType}
                {#if checkIfLocalNotDeleted(readStatisticType.name) === true}
                    <tr class="odd:bg-stone-700" id={readStatisticType.name + "ReadStatisticRow"}>
                        <td class="pb-1">{readStatisticType.name}</td>
                        <td class="pb-1">{readStatisticType.abbreviation}</td>
                        <td class="pb-1">{readStatisticType.quantity}</td>
                        <td class="pb-1">{readStatisticType.unit}</td>
                        <td class="pb-1 flex justify-center"><button on:click={()=>deleteRow(readStatisticType.name, true)} class="rounded bg-red-600 hover:bg-red-500 flex justify-center"><img src="../icons/trashcan.svg" alt="Delete"></button></td>
                    </tr>
                {/if}
            {/each}
            {#each readStatisticTypesLocalChangeLog.filter(t => t.operation === "Add") as readStatisticType}
                    <tr class="odd:bg-stone-700" id={readStatisticType.structure.name + "Row"}>
                        <td class="pb-1">{readStatisticType.structure.name}</td>
                        <td class="pb-1">{readStatisticType.structure.abbreviation}</td>
                        <td class="pb-1">{readStatisticType.structure.quantity}</td>
                        <td class="pb-1">{readStatisticType.structure.unit}</td>
                        <td class="pb-1 flex justify-center"><button on:click={()=>deleteRow(readStatisticType.structure.name, false)} class="rounded bg-red-600 hover:bg-red-500 flex justify-center"><img src="../icons/trashcan.svg" alt="Delete"></button></td>
                    </tr>
            {/each}
            <tr>
                {#if wantsToAdd}
                    <td><input bind:value={addName} id="addName" class="rounded-sm bg-stone-700 w-full"/></td>
                    <td><input bind:value={addAbbreviation} id="addAbbreviation" class="rounded-sm bg-stone-700 w-full"/></td>
                    <td><input bind:value={addQuantity} id="addQuantity" class="rounded-sm bg-stone-700 w-full"/></td>
                    <td><input bind:value={addUnit} id="addUnit" class="rounded-sm bg-stone-700 w-full"/></td>
                {/if}
                {#if wantsToAdd}
                    <td class="flex justify-evenly">
                        <button on:click={()=>addReadStatisticType()} class="text-center">Add</button>
                        <button on:click={()=>closeAddForm()} class="text-center">Cancel</button>
                    </td>
                {:else}
                    <td colspan=5><button on:click={()=>revealAddForm()} class="text-center w-full hover:bg-stone-600 rounded flex justify-center py-1"><img src="../icons/addCircle.svg" alt="Add"></button></td>
                {/if}
            </tr>
        </tbody>
        </table>
    </div>
    <p class="text-left text-xs">note: deleting a type will also delete all the data associated to it, be careful!</p>
</div>