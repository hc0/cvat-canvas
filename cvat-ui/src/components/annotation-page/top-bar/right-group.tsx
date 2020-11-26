// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col } from 'antd/lib/grid';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';

import { Workspace } from 'reducers/interfaces';
import { InfoIcon, FullscreenIcon } from 'icons';
import Setting from "../../header/header-setting"

interface Props {
    workspace: Workspace;
    showStatistics(): void;
    changeWorkspace(workspace: Workspace): void;
}

function RightGroup(props: Props): JSX.Element {
    const { showStatistics, changeWorkspace, workspace } = props;

    return (
        <Col className='cvat-annotation-header-right-group'>
            <Button
                type='link'
                className='cvat-annotation-header-button'
                onClick={(): void => {
                    if (window.document.fullscreenEnabled) {
                        if (window.document.fullscreenElement) {
                            window.document.exitFullscreen();
                        } else {
                            window.document.documentElement.requestFullscreen();
                        }
                    }
                }}
            >
                <Icon component={FullscreenIcon} />
                全屏
            </Button>
            <Setting />
            <Button type='link' className='cvat-annotation-header-button' onClick={showStatistics}>
                <Icon component={InfoIcon} />
                信息
            </Button>
            <div>
                <Select className='cvat-workspace-selector' onChange={changeWorkspace} value={workspace}>
                    {Object.values(Workspace).map((ws) => (
                        <Select.Option key={ws} value={ws}>
                            {ws}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </Col>
    );
}

export default React.memo(RightGroup);
