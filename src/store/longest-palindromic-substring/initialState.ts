import { Dialog, DialogScroll, Header, BasicInfo, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/longest-palindromic-substring';
import { State } from './state';

export const basicInfo: BasicInfo = {
    id: 12,
    title: 'Longest Palindromic Substring',
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

const size = 6;
const random = (sequence: string): string => {
    const index = Math.floor(Math.random() * sequence.length);
    return sequence.charAt(index);
};

export const create = () => {
    const sequence = 'bcd';
    const input = Array(size).fill(sequence).map(random).join('');

    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(input),
        table: helper.createTableMatrix(input),
        tableStyles: helper.createTableStyles(input),
        buttons: helper.createButtons(),
        buttonsStyles: helper.createButtonsStyles(),
        handleButtonClick: buttonClick,
        length: 1,
        marksTable: helper.createComparedMarksTable(input),
    });
};

export const state: State = create();
