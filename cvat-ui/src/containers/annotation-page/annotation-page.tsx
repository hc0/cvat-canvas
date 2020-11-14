// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import AnnotationPageComponent from 'components/annotation-page/annotation-page';
import { getJobAsync, saveLogsAsync, closeJob as closeJobAction } from 'actions/annotation-actions';

import { CombinedState, Workspace } from 'reducers/interfaces';

type OwnProps = RouteComponentProps<{
    tid: string;
    jid: string;
}>;

interface StateToProps {
    job: any | null | undefined;
    fetching: boolean;
    workspace: Workspace;
}

interface DispatchToProps {
    getJob(): void;
    saveLogs(): void;
    closeJob(): void;
}
const searchParams = new URLSearchParams(window.location.search);
function mapStateToProps(state: CombinedState, own: any): StateToProps {
    const { params } = own.match;
    const jobID = Number(searchParams.get("job"));
    const {
        annotation: {
            job: { requestedId, instance: job, fetching },
            workspace,
        },
    } = state;

    return {
        job: jobID === requestedId ? job : null,
        fetching,
        workspace,
    };
}

function mapDispatchToProps(dispatch: any, own: any): DispatchToProps {
    const { params } = own.match;
    const taskID = Number(searchParams.get("task"));
    const jobID = Number(searchParams.get("job"));
    const initialFilters: string[] = [];
    let initialFrame = 0;
    if (searchParams.has('frame')) {
        const searchFrame = +(searchParams.get('frame') as string);
        if (!Number.isNaN(searchFrame)) {
            initialFrame = searchFrame;
        }
    }

    if (searchParams.has('serverID') && searchParams.has('type')) {
        const serverID = searchParams.get('serverID');
        const type = searchParams.get('type');
        if (serverID && !Number.isNaN(+serverID)) {
            initialFilters.push(`serverID==${serverID} & type=="${type}"`);
        }
    }

    if (searchParams.has('frame') || searchParams.has('object')) {
        own.history.replace(own.history.location.state);
    }

    return {
        getJob(): void {
            console.log(taskID, jobID, initialFrame, initialFilters,'taskID, jobID, initialFrame, initialFilters')
            dispatch(getJobAsync(taskID, jobID, initialFrame, initialFilters));
        },
        saveLogs(): void {
            dispatch(saveLogsAsync());
        },
        closeJob(): void {
            dispatch(closeJobAction());
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnotationPageComponent));
