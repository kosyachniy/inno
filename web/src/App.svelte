<script>
	let status = 0;
	let header = 'Это приложение без кнопок';
	let startText = 'Я покажу тебе инновационный интерфейс';

	function start () {
		status = 1;
	}

	$: if (status) {
		if (header !== 'Логотип') {
			setTimeout(() => {
				header = 'Логотип';
				let marquee = document.getElementsByClassName('marquee')[0];
				marquee.classList.remove('marquee');
				void marquee.offsetWidth;
				marquee.classList.add('marquee');
			}, 4800);
		}
	}

	$: if (startText === '') {
		let hint = document.getElementsByClassName('hint')[0];
		hint.classList.remove('active');
	}
</script>

<main>
	{#if status === 0}
		<div class="start">
			<button on:mouseenter={start}>Привет!</button>
		</div>
	{:else if status === 1}
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
		Опасный раздел!
	{/if}
</main>

<style>
	main {
		padding: 8px;
	}

	.start {
		position: fixed;
		top: 0;
		left: 0;
		text-align: center;
		width: 100vw;
		height: 100vh;
		cursor: pointer;
		line-height: 100vh;
	}

	.start button {
		padding: 15px 25px;
		border: 2px solid #333;
		border-radius: 15px;
		width: 20vw;
		min-width: 50px;
		font-size: 1.65rem;
		font-weight: 420;
		background-color: #fff;
		cursor: pointer;
		box-shadow:
			0 1px 4px rgba(0, 0, 0, .3),
			-23px 0 20px -23px rgba(0, 0, 0, .8),
			13px 0 20px -23px rgba(0, 0, 0, .8);
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
		border: 1.5px solid #333;
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
		animation-delay: 6.8s;
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
