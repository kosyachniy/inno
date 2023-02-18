<script>
	import { token } from '$lib/stores/token'

	let dilters = [
		{ key: 'currencies', value: false },
		{ key: 'crypto', value: false },
		{ key: 'stocks', value: false },
		{ key: 'commodities', value: false },
		{ key: 'etfs', value: false },
		{ key: 'funds', value: false },
		{ key: 'bonds', value: false },
	]
	let dataFilters = [
		'currencies',
		'crypto',
		'stocks',
		'commodities',
		'etfs',
		'funds',
		'bonds',
	]
	let tilters = Object.fromEntries(dataFilters.map(((title) => [title, false])))
	let filters = {
		currencies: false,
		crypto: false,
		stocks: false,
		commodities: false,
		etfs: false,
		funds: false,
		bonds: false,
	}
	let cards = [
		{ title: 'Sunrise', image: 'https://farm6.staticflickr.com/5607/15374495498_db6e120f6c_b.jpg' },
		{ title: 'Sunset', image: 'https://proprikol.ru/wp-content/uploads/2020/09/kartinki-los-andzheles-45.jpg' },
		{ title: 'Darkness', image: 'https://pibig.info/uploads/posts/2021-12/1639642159_79-pibig-info-p-nochnie-gori-priroda-krasivo-foto-87.jpg' },
	]

	async function api() {
		// TODO: process.env.NEXT_PUBLIC_SERVER
		let res = await fetch('http://localhost:8123/', {
			method: 'POST',
			body: JSON.stringify({ token: $token }),
			headers: { 'Content-Type': 'application/json' },
		})

		if (res.ok) {
			return await res.json();
		} else {
			throw new Error(await res.text());
		}
	}
</script>

<svelte:head>
	<title>The App</title>
	<meta name="description" content="The App" />
</svelte:head>

<section>
	<input class="search" placeholder="🔍 Search" />
	<div class="filters">
		{#each Object.entries(filters) as filter}
			<button
				class={ filter[1] ? "active" : "" }
				on:click={ e => filters = { ...filters, [filter[0]]: !filter[1] } }
			>{ filter[0] }</button>
		{/each}
	</div>
	<div class="cards">
		{#each cards as { title, image }}
			<div style="background-image: url({image})">
				{ title }
			</div>
		{/each}
	</div>
	<div class="box">
		{#await api()}
			{#if $token}
				{ $token }
			{:else}
				Loading..
			{/if}
		{:then data}
			<div>
				User #{ data.id }: { data.token.join(', ') }
			</div>
		{:catch error}
			<p style="color: red">{ error.message }</p>
		{/await}

		<ul>
			<li>1</li>
			<li>2</li>
		</ul>

		<textarea>text</textarea>

		<select>
			<option value="1">option 1</option>
			<option value="2">option 2</option>
		</select>
	</div>
	<button class="button">
		Go
	</button>
</section>
