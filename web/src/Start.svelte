<script>
	export let status;

	function start() {
		status = 1;
	}

	// Изменить положение курсора, если он уже на кнопке
</script>

<div class="start">
	<button on:mouseenter={start}>Привет!</button>
</div>

<style>
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
		padding: 20px 25px;
		border: 2px solid #333;
		border-radius: 15px;
		width: 20vw;
		min-width: 250px;
		font-size: 1.65rem;
		font-weight: 420;
		background-color: #fff;
		cursor: pointer;
		box-shadow:
			0 1px 4px rgba(0, 0, 0, .3),
			-23px 0 20px -23px rgba(0, 0, 0, .8),
			13px 0 20px -23px rgba(0, 0, 0, .8);
	}
</style>
