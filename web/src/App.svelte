<script>
	let history = [];
	let header = 'Это приложение без кнопок';
	let startText = 'Я покажу тебе инновационный интерфейс';

	function move() {
		history = [...history, 'new'];
	}

	$: if (history.length) {
		if (header !== 'Логотип') {
			setTimeout(() => {
				header = 'Логотип';
				let marquee = document.getElementsByClassName('marquee')[0];
				marquee.classList.remove('marquee');
				void marquee.offsetWidth;
				marquee.classList.add('marquee');
			}, 5000);
		}
	}

	$: if (startText === '') {
		let hint = document.getElementsByClassName('hint')[0];
		hint.classList.remove('active');
	}
</script>

<main>
	{#if history.length}
		<h1>
			<div class="marquee">{header}</div>
			<div class="over-marquee">&nbsp;</div>
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

		<div class="hint active">
			↑<br />
			Здесь ты можешь написать запрос
		</div>
	{:else}
		<button on:click={move}>Generate</button>
	{/if}
</main>

<style>
	main {
		padding: 8px;
	}

	h1 {
		width: 100%;
		margin-bottom: 9px;
		font-weight: 700;
		height: 38px;
	}

	.marquee {
		width: 100%;
		text-indent: 0;
		animation: marquee 1.1s ease-in-out 1;
		animation-fill-mode: forwards;
	}

	.over-marquee {
		position: absolute; /* relative */
		width: 100%;
		height: 38px;
		top: 8px; /* -38px; */
		left: 8px;
		box-shadow: -500px 0 100px -100px #fff inset;
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
		animation: show 2.8s 1;
		animation-fill-mode: forwards;
		animation-delay: 1.7s;
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
	}

	.hint.active {
		animation: hint 2.7s infinite;
		animation-fill-mode: forwards;
		animation-delay: 7s;
	}

	@keyframes hint {
		0% {
			opacity: 0;
		}
		55% {
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
