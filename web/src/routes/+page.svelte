<script>
	import { browser } from '$app/environment'
	import Web3 from 'web3'
	import { token } from '$lib/stores/token'

	let account = null
	if (browser) {
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum)
			console.log(web3)

			window.ethereum.request({ method: 'eth_requestAccounts' }).then(
				accounts => account = accounts[0]
			)
			window.ethereum.on('accountsChanged', accounts => account = accounts[0])
		} else {
			console.log('MetaMask is not installed.')
		}
	}

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
		{ title: 'Sunrise', image: 'https://s3.chill.services/inno/prod/sunrise.jpg' },
		{ title: 'Sunset', image: 'https://s3.chill.services/inno/prod/sunset.jpg' },
		{ title: 'Darkness', image: 'https://s3.chill.services/inno/prod/darkness.jpg' },
	]

	async function api() {
		let res = await fetch(`${import.meta.env.VITE_API_URL}users/save/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: 1, name: 'a1', email: $token }),
		})

		if (res.ok) {
			return await res.json()
		} else {
			throw new Error(await res.text())
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
		{#if account}
			{ account }
		{:else}
			Need to enable MetaMask
		{/if}

		{#await api()}
			{#if $token}
				{ $token }
			{:else}
				Loading..
			{/if}
		{:then data}
			<div>
				@user{ data.id }
				<ul class="tokens">
					{#each data.token as token}
						<li>{ token }</li>
					{/each}
				</ul>
			</div>
		{:catch error}
			<p style="color: red">{ error.message }</p>
		{/await}

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

<style>
	.tokens {
		margin-top: 0;
		padding-left: 1.5em;
		list-style: '#';
	}
</style>
