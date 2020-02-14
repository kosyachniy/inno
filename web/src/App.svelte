<script>
	let history = [];
	let header = 'Это приложение без кнопок';
	let startText = 'Я покажу тебе инновационный интерфейс';

	function move() {
		history = [...history, 'new'];
	}

	$: if (history.length) {
		setTimeout(() => {
			header = 'Логотип.';
		}, 7000);
	}
</script>

<main>
	{#if history.length}
		<h1>
			<div class="marquee">{header}</div>
		</h1>

		<h2>
			<input
				autofocus
				bind:value={startText}
				size={Math.max(startText.length, 2)}
			/>
			<div class="space">
				Пустой блок
			</div>
		</h2>
		<br />

		<div class="hint">
			↑<br />
			Здесь ты можешь написать запрос
		</div>
	{:else}
		<button on:click={move}>Generate</button>
	{/if}
	{history.join(' -> ')}
</main>

<style>
	main {
		padding: 8px;
	}

	h1 {
		width: 100%;
		margin-bottom: 9px;
	}

	.marquee {
		width: 100%;
		text-indent: 0;
		animation: marquee 1.7s linear 1;
		animation-fill-mode: forwards;
	}

	@keyframes marquee {
		0% {
			transform: translate(100%, 0);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	h2 {
		opacity: 0;
		animation: show 1.5s 1;
		animation-fill-mode: forwards;
		animation-delay: .3s;
	}

	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	input {
		border: 0;
		outline: none;
	}

	.space {
		border: 1.5px solid #000;
		border-radius: 9px;
		padding: 3px 11px 5px 11px;
		font-weight: normal;
	}

	.hint {
		font-size: 18px;
		opacity: 0;
		animation: hint 4s 1;
		animation-fill-mode: forwards;
		animation-delay: 6s;
	}

	@keyframes hint {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>