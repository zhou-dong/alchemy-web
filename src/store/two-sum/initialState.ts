import { Dialog, DialogScroll, Header, BasicInfo, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/two-sum';
import { State } from "./state";

export const basicInfo: BasicInfo = {
    id: 27,
    title: 'Two Sum',
};

const codeFormula: Formula = {
    ...basicInfo,
    formulaOpen: false,
    formulaCroll: DialogScroll.Paper,
    formula: formula,
    handleCloseFormulaClick: closeFormula,
};

const dialog: Dialog = {
    ...basicInfo,
    dialogOpen: false,
    dialogCroll: DialogScroll.Paper,
    description: description,
    example: example,
    alUsecases: alUsecases,
    handleCloseDialogClick: closeDialog,
};

const header: Header = {
    ...basicInfo,
    success: false,
    loading: false,
    steps: 0,
    errors: 0,
    startTime: 0,
    finishTime: 0,
    difficulty: Difficulty.Easy,
    handleRefreshClick: refresh,
    handleOpenDialogClick: openDialog,
    handleOpenFormulaClick: openFormula,
};

const random = (max: number) => Math.floor(Math.random() * max);

export const create = () => {
    const size = 6;
    const nums: number[] = [];
    for (let i = 0; i < size; i++) {
        let flag = true;
        while (flag) {
            const num = random(9) + 1;
            if (!nums.includes(num)) {
                nums.push(num);
                flag = false;
            }
        }
    }
    const one = random(6);
    let two = one;
    while (two === one) {
        two = random(6);
    }
    const target = nums[one] + nums[two];

    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(nums),
        table: helper.createTableMatrix(nums),
        tableStyles: helper.createTableStyles(nums),
        buttons: helper.createButtons(),
        buttonsStyles: helper.createButtonsStyles(nums),
        handleButtonClick: buttonClick,
        target,
        nums,
        results: helper.getIndices(nums, target),
    });
};

export const state: State = create();
