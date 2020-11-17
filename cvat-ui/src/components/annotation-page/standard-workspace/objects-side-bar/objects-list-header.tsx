// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Text from 'antd/lib/typography/Text';
import Tooltip from 'antd/lib/tooltip';

import AnnotationsFiltersInput from 'components/annotation-page/annotations-filters-input';
import { StatesOrdering } from 'reducers/interfaces';

interface StatesOrderingSelectorComponentProps {
    statesOrdering: StatesOrdering;
    changeStatesOrdering(value: StatesOrdering): void;
}

function StatesOrderingSelectorComponent(props: StatesOrderingSelectorComponentProps): JSX.Element {
    const { statesOrdering, changeStatesOrdering } = props;

    return (
        <Col span={16}>
            <Text strong>排序方式</Text>
            <Select value={statesOrdering} onChange={changeStatesOrdering}>
                <Select.Option key={StatesOrdering.ID_DESCENT} value={StatesOrdering.ID_DESCENT}>
                    降序
                </Select.Option>
                <Select.Option key={StatesOrdering.ID_ASCENT} value={StatesOrdering.ID_ASCENT}>
                    升序
                </Select.Option>
                <Select.Option key={StatesOrdering.UPDATED} value={StatesOrdering.UPDATED}>
                    更新时间
                </Select.Option>
            </Select>
        </Col>
    );
}

const StatesOrderingSelector = React.memo(StatesOrderingSelectorComponent);

interface Props {
    statesHidden: boolean;
    statesLocked: boolean;
    statesCollapsed: boolean;
    statesOrdering: StatesOrdering;
    switchLockAllShortcut: string;
    switchHiddenAllShortcut: string;
    changeStatesOrdering(value: StatesOrdering): void;
    lockAllStates(): void;
    unlockAllStates(): void;
    collapseAllStates(): void;
    expandAllStates(): void;
    hideAllStates(): void;
    showAllStates(): void;
}

function ObjectListHeader(props: Props): JSX.Element {
    const {
        statesHidden,
        statesLocked,
        statesCollapsed,
        statesOrdering,
        switchLockAllShortcut,
        switchHiddenAllShortcut,
        changeStatesOrdering,
        lockAllStates,
        unlockAllStates,
        collapseAllStates,
        expandAllStates,
        hideAllStates,
        showAllStates,
    } = props;

    return (
        <div className='cvat-objects-sidebar-states-header'>
            <Row>
                <Col>
                    <AnnotationsFiltersInput />
                </Col>
            </Row>
            <Row type='flex' justify='space-between' align='middle'>
                <Col span={2}>
                    <Tooltip title={`锁定所有属性 ${switchLockAllShortcut}`} mouseLeaveDelay={0}>
                        {statesLocked ? (
                            <Icon type='lock' onClick={unlockAllStates} theme='filled' />
                        ) : (
                            <Icon type='unlock' onClick={lockAllStates} />
                        )}
                    </Tooltip>
                </Col>
                <Col span={2}>
                    <Tooltip title={`隐藏所有属性 ${switchHiddenAllShortcut}`} mouseLeaveDelay={0}>
                        {statesHidden ? (
                            <Icon type='eye-invisible' onClick={showAllStates} />
                        ) : (
                            <Icon type='eye' onClick={hideAllStates} />
                        )}
                    </Tooltip>
                </Col>
                <Col span={2}>
                    <Tooltip title='全部展开/收起' mouseLeaveDelay={0}>
                        {statesCollapsed ? (
                            <Icon type='caret-down' onClick={expandAllStates} />
                        ) : (
                            <Icon type='caret-up' onClick={collapseAllStates} />
                        )}
                    </Tooltip>
                </Col>
                <StatesOrderingSelector statesOrdering={statesOrdering} changeStatesOrdering={changeStatesOrdering} />
            </Row>
        </div>
    );
}

export default React.memo(ObjectListHeader);
