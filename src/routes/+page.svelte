<script lang="ts">
	import * as Blockly from 'blockly';
	import { onMount } from 'svelte';

	import { Highlight } from 'svelte-highlight';
	import { java } from 'svelte-highlight/languages';
	import tomorrowNight from 'svelte-highlight/styles/tomorrow-night';

	import { tab, roadrunnerCode, meepmeepCode } from '$lib/code';
	import { blocks, toolbox } from '$lib/workspace';
	import generator from '$lib/generator';

	import Navbar from '$lib/layout/Navbar.svelte';

	let roadrunner: string;
	let meepmeep: string;
	onMount(() => {
		Blockly.defineBlocksWithJsonArray(blocks);

		document.body.style.display = 'block';

		document.querySelectorAll('code').forEach((el) => el.classList.add('p-3'));

		const navHeight = document.querySelector('nav')!.clientHeight;
		const proportion = Math.floor(100 - (navHeight / document.body.clientHeight) * 100);
		// document.querySelector('.row')!.classList.add(`h-${proportion}`)

		const blocklyArea = document.getElementById('blocklyArea')!;
		const blocklyDiv = document.getElementById('blocklyDiv')!;
		const workspace = Blockly.inject(blocklyDiv, { toolbox: toolbox });

		const runCode = () => {
			let buildIdx = roadrunnerCode.indexOf('.build()');
			roadrunner =
				roadrunnerCode.slice(0, buildIdx) +
				`\n${tab(3)}` +
				generator.workspaceToCode(workspace) +
				`\n${tab(3)}` +
				roadrunnerCode.slice(buildIdx);

			buildIdx = meepmeepCode.indexOf('.build()');
			meepmeep =
				meepmeepCode.slice(0, buildIdx) +
				`\n${tab(7)}` +
				generator.workspaceToCode(workspace).replaceAll('\n', `\n${tab(4)}`) +
				`\n${tab(7)}` +
				meepmeepCode.slice(buildIdx);
			
				roadrunner = roadrunner.replaceAll("[URL]", window.location.href)
				meepmeep = meepmeep.replaceAll("[URL]", window.location.href)
		};

		runCode();

		// @ts-ignore
		workspace.addChangeListener((e) => {
			if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || workspace.isDragging()) {
				return;
			}
			runCode();
			onresize(); 
		});

		function onresize() {
			let x = 0;
			let y = 0;
			let element = blocklyArea;

			do {
				x += element.offsetLeft;
				y += element.offsetTop;
				element = <HTMLElement>element.offsetParent!;
			} while (element);

			blocklyDiv.style.left = x + 'px';
			blocklyDiv.style.top = y + 'px';
			blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
			blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

			Blockly.svgResize(workspace);
		}
		window.addEventListener('resize', onresize, false);
		onresize();
	});
</script>

<svelte:head>
	{@html tomorrowNight}
</svelte:head>

<main class="h-100 m-0 p-0">
	<div class="h-100 d-flex flex-column">
		<Navbar />
		<div class="row overflow-auto">
			<div class="col-6" id="blocklyArea" style="height: 100%">
				<div style="position: absolute" id="blocklyDiv" />
			</div>

			<div class="col-6 row overflow-auto p-0 m-0">
				{#if roadrunner}
					<Highlight class="m-0 p-0 overflow-auto" language={java} code={roadrunner} />
				{/if}
				{#if meepmeep}
					<Highlight class="m-0 p-0 overflow-auto" language={java} code={meepmeep} />
				{/if}
			</div>
		</div>
	</div>
</main>
