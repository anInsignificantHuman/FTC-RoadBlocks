import type * as Blockly from 'blockly';
import { tab } from './code';

export const blocksDefs = {
	rotate: {
		description: 'rotate robot %1 degrees',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.turn(Math.toRadians(?))`)
	},

	forward: {
		description: 'move forward %1 units',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.forward(?)`)
	}, 

	back: {
		description: 'move backward %1 units',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.back(?)`)
	},

	strafe_left: {
		description: 'strafe left %1 units',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.strafeLeft(?)`)
	},

	strafe_right: {
		description: 'strafe right %1 units',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.strafeRight(?)`)
	},

	go_to: {
		description: 'go to position (%1,%2)',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.lineTo(new Vector2d(?, ?))`)
	},

	go_to_angle: {
		description: 'go to x-coordinate %1 y-coordinate %2 end angle %3',
		generator: (block: Blockly.Block) =>
			formatFieldVals(block, `.lineToLinearHeading(new Pose2d(?, ?, Math.toRadians(?)))`)
	},

	spline_to: {
		description: 'spline to x-coordinate %1 y-coordinate %2 end angle %3',
		generator: (block: Blockly.Block) =>
			formatFieldVals(block, `.splineTo(new Vector2d(?, ?), Math.toRadians(?))`)
	},

	wait_for: {
		description: 'wait for %1 seconds',
		generator: (block: Blockly.Block) => formatFieldVals(block, `.waitSeconds(?)`)
	},

	add_marker: {
		description: 'add temporal marker of duration %1 seconds',
		generator: (block: Blockly.Block) =>
			formatFieldVals(
				block,
				`.addTemporalMarker(?, () -> {\n${tab(4)}// TODO: Implement robot code to execute while the marker is running\n${tab(3)}})`
			)
	}
};

function formatFieldVals(block: Blockly.Block, str: string) {
	const matches = [...block.toString().matchAll(/[?|\d\.]+/g)].map((e) => e.toString());
	for (let i = 0; i < matches.length; i++) {
		str = str.replace('?', matches[i]);
	}

	return str;
}

export const blocks = Object.entries(blocksDefs).map(([k, v]) => {
	const numFieldValues = [...v.description.matchAll(/\d/g)];

	return {
		type: k,
		message0: v.description,
		args0: [...numFieldValues.map((f) => parseInt(f[0]))].map((field) => ({
			type: 'input_value',
			name: `VALUE${field}`
		})),
		previousStatement: null,
		nextStatement: null
	};
});

export const toolbox = {
	kind: 'flyoutToolbox',
	contents: ['math_number', ...Object.keys(blocksDefs)].map((k) => ({
		kind: 'block',
		type: k
	}))
};
