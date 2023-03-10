import * as Blockly from 'blockly';
import { blocksDefs } from './workspace';

import {tab} from './code'; 

const generator = new Blockly.CodeGenerator('roadrunner');

// @ts-ignore
Object.entries(blocksDefs).forEach(([k, v]) => { generator[k] = v.generator })

// @ts-ignore
generator.scrub_ = (block, code, thisOnly) => {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + `\n${tab(3)}` + generator.blockToCode(nextBlock);
    }
    return code;
};

export default generator; 