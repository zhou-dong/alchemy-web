import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Highlight from 'react-highlight';

import "../../node_modules/highlight.js/styles/atom-one-light.css"

const styles = (theme: Theme) => createStyles({
    code: {
        fontSize: "16px",
    },
});

export enum Languares {
    Javascript = 'javascript',
    Markdown = 'markdown',
}

interface Props extends WithStyles<typeof styles> {
    code: string;
    language: Languares;
}

const Code = (props: Props) => (
    <Highlight className={`${props.language} ${props.classes.code}`}>
        {props.code}
    </Highlight>
);

export default withStyles(styles)(Code);
