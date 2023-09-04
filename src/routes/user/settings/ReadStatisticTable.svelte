<script lang="ts">
    import { ReadStatisticType } from "$lib/classes/ReadStatisticType";
    import { SettingsLocalChange } from "$lib/classes/SettingsLocalChange";

    export let readStatisticTypes: any = [];
    let readStatisticTypesLocalChangeLog: SettingsLocalChange[] = [];

    let wantsToAdd: boolean = false;
    let addName:string = "";
    let addAbbreviation:string = "";
    let addQuantity:string = "";
    let addUnit:string = "";

    function addReadStatisticType() {
        let newReadStatistic: ReadStatisticType = new ReadStatisticType(addName,addAbbreviation,addQuantity,addUnit);
        let newLocalChange: SettingsLocalChange = new SettingsLocalChange("Add","ReadStatisticType",newReadStatistic);
        readStatisticTypesLocalChangeLog = [...readStatisticTypesLocalChangeLog, newLocalChange];
        
        closeAddForm();
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
            let newLocalChange: SettingsLocalChange = new SettingsLocalChange("Delete","ReadStatisticType", name);
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
                    <tr id={readStatisticType.name + "ReadStatisticRow"}>
                        <td>{readStatisticType.name}</td>
                        <td>{readStatisticType.abbreviation}</td>
                        <td>{readStatisticType.quantity}</td>
                        <td>{readStatisticType.unit}</td>
                        <td><button on:click={()=>deleteRow(readStatisticType.name, true)} class="w-full rounded bg-red-600">x</button></td>
                    </tr>
                {/if}
            {/each}
            {#each readStatisticTypesLocalChangeLog.filter(t => t.operation === "Add") as readStatisticType}
                    <tr id={readStatisticType.structure.name + "Row"}>
                        <td>{readStatisticType.structure.name}</td>
                        <td>{readStatisticType.structure.abbreviation}</td>
                        <td>{readStatisticType.structure.quantity}</td>
                        <td>{readStatisticType.structure.unit}</td>
                        <td><button on:click={()=>deleteRow(readStatisticType.structure.name, false)} class="w-full rounded bg-red-600">x</button></td>
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
                    <td colspan=5><button on:click={()=>revealAddForm()} class="text-center w-full">+</button></td>
                {/if}
            </tr>
        </tbody>
        </table>
    </div>
    <p class="text-left text-xs">note: deleting a type will also delete all the data associated to it, be careful!</p>
    
    
</div>