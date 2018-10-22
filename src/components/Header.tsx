
import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import WrongIcon from '@material-ui/icons/ErrorOutline';
import StepsIcon from '@material-ui/icons/PollOutlined';
import TimerIcon from '@material-ui/icons/AccessTimeOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import PauseIcon from '@material-ui/icons/PauseCircleOutline';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        padding: 5,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        zIndex: 1,
    },
    groupA: {
        padding: 0,
        paddingTop: 3,
        maxWidth: 180,
    },
    groupB: {
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 180,
        float: 'right',
    },
    metric: {
        fontSize: 24,
        color: green[500],
        verticalAlign: 'middle',
        textAlign: 'center',
    }
});

interface Props extends WithStyles<typeof styles> {
    success: boolean;
    loading: boolean;
    steps: number;
    errors: number;
    title: string;
    difficulty: string;
    handleRefreshClick: () => any;
}

interface MetricProps extends WithStyles<typeof styles> {
    icon: React.ReactElement<any>;
    label: string;
    metric: string | number;
}

const Metric = ({ icon, label, metric, classes }: MetricProps) => (
    <div className={classes.metric} style={{ marginLeft: 7 }}>
        <div style={{ marginTop: 3 }}>
            {icon}
        </div>
        <Typography style={{ fontSize: 14, color: 'grey', marginTop: -8 }}>
            {label}
        </Typography>
        <Typography style={{ fontSize: 12, color: 'gray', marginTop: -4 }}>
            {metric}
        </Typography>
    </div>
);

const CardHeaderActions = (props: Props) => {
    const { classes } = props;
    return (
        <div>
            <IconButton style={{ padding: 5 }}>
                <PlayIcon className={classes.metric} />
            </IconButton>
            <IconButton style={{ padding: 5 }}>
                <HelpIcon className={classes.metric} />
            </IconButton>
            <IconButton onClick={props.handleRefreshClick} style={{ padding: 5 }}>
                <RefreshIcon className={classes.metric} />
            </IconButton>
        </div>
    );
};

const HeaderTitle = ({ title, success, loading, classes }: Props) => {
    return (
        <div style={{ paddingLeft: 5, display: 'flex' }}>
            {success ? <CheckIcon className={classes.metric} /> : <AssignmentIcon className={classes.metric} />}
            {loading && <CircularProgress size={36} className={classes.fabProgress} />}
            <Typography style={{ fontSize: 15, lineHeight: '24px', color: 'grey', marginLeft: 2 }}>
                {title.toUpperCase()}
            </Typography>
        </div>
    );
};

const GroupA = (props: Props) => (
    <List className={props.classes.groupA}>
        <ListItem style={{ float: 'left', padding: 0 }}>
            <HeaderTitle {...props} />
        </ListItem>
        <ListItem style={{ float: 'left', padding: 0 }}>
            <CardHeaderActions {...props} />
        </ListItem>
    </List>
);

const GroupB = (props: Props) => {
    const { classes, steps, errors } = props;
    return (
        <div className={classes.groupB}>
            <Metric icon={<StepsIcon />} label="Steps" metric={steps} {...props} />
            <Metric icon={<WrongIcon />} label="Errors" metric={errors} {...props} />
            <Metric icon={<TimerIcon />} label="Time" metric={'00:05'} {...props} />
        </div>
    );
};

const Header = (props: Props) => (
    <Grid container className={props.classes.root} >
        <Grid item xs={6} sm={6}>
            <GroupA {...props} />
        </Grid>
        <Grid item xs={6} sm={6}>
            <GroupB {...props} />
        </Grid>
    </Grid>
);

export default withStyles(styles)(Header);