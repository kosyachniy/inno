<script>
	import Start from './Start.svelte';

	let status = 0;
	let header = 'Это приложение без кнопок';
	let startText = 'Я покажу тебе инновационный интерфейс';
	let clear = false;

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
		clear = true;

		let hint = document.getElementsByClassName('hint')[0];
		hint.classList.remove('active');
	}

	$: if (clear && startText.length > 0) {
		// let space = document.getElementsByClassName('space')[0];
		// space.classList.remove('unvisible');
		// space.innerHTML = '<div class="loading">123</div>';
		let loading = document.getElementsByClassName('loading')[0];
		loading.classList.remove('unvisible');
		let text = document.getElementsByClassName('text')[0];
		text.innerHTML = '';
	}
</script>

<main>
	{#if status === 0}
		<Start
			bind:status={status}
		/>
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
				<div class="loading unvisible"></div>
				<div class="text">Пустой блок</div>
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
		min-width: 2rem;
	}

	.hint {
		font-size: 18px;
		opacity: 0;
	}

	.hint.active {
		animation: hint 2.7s infinite;
		animation-fill-mode: forwards;
		animation-delay: 6.9s;
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

	.unvisible {
		display: none;
	}

	/* Загрузка */

	.loading {
		position: relative;
		top: -1.4rem;
	}

	.loading:after, .loading:before {
		content: "";
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		width: 1.8rem; /* 100%; */
		height: 1.8rem; /* 100%; */
		transform-origin: center center;
	}

	.loading:before {
		box-shadow:
			inset 0 5px 0 rgba(0, 250, 250, 0.6),
			inset 5px 0 0 rgba(0, 200, 200, 0.6),
			inset 0 -5px 0 rgba(0, 150, 200, 0.6),
			inset -5px 0 0 rgba(0, 200, 250, 0.6);
		animation: rotate-before 2s -0.5s linear infinite;
	}

	.loading:after {
		box-shadow:
			inset 0 5px 0 rgba(250, 250, 0, 0.6),
			inset 5px 0 0 rgba(250, 200, 0, 0.6),
			inset 0 -5px 0 rgba(250, 150, 0, 0.6),
			inset -5px 0 0 rgba(250, 100, 0, 0.6);
		animation: rotate-after 2s -0.5s linear infinite;
	}

	@keyframes rotate-after {
		0% {transform: rotateZ(0deg) scaleX(1) scaleY(1);}
		50% {transform: rotateZ(180deg) scaleX(0.82) scaleY(0.95);}
		100% {transform: rotateZ(360deg) scaleX(1) scaleY(1);}
	}

	@keyframes rotate-before {
		0% {transform: rotateZ(0deg) scaleX(1) scaleY(1);}
		50% {transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.85);}
		100% {transform: rotateZ(-360deg) scaleX(1) scaleY(1);}
	}
</style>
