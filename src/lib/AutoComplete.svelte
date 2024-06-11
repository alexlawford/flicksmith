<script lang="ts">
	export let items: string[] = [];

	let inputVal: string = ''
	
	function onItemClicked(item: string) {
		document.activeElement?.blur()
		inputVal = item
	}

	$: filteredItems = items.filter(function(item) {
		return item.toLowerCase().includes(inputVal.toLowerCase())
	})

</script>

<div class="dropdown w-96">
  <input 
		name="category"
		class="input input-bordered mb-5 w-96 text-black" 
		placeholder="Pick a category"
		bind:value={inputVal}
   />
  <ul tabindex="-2" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto text-black">
    {#each filteredItems as item}
			<li>
				<button tabindex="-1" on:click|preventDefault={() => onItemClicked(item)}>{item}</button>
			</li>
		{/each}
  </ul>
</div>