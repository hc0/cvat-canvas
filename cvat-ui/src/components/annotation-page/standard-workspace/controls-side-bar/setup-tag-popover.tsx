// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Text from 'antd/lib/typography/Text';

interface Props {
    labels: any[];
    selectedLabeID: number;
    repeatShapeShortcut: string;
    onChangeLabel(value: string): void;
    onSetup(labelID: number): void;
}

function SetupTagPopover(props: Props): JSX.Element {
    const { labels, selectedLabeID, repeatShapeShortcut, onChangeLabel, onSetup } = props;

    return (
        <div className='cvat-draw-shape-popover-content'>
            <Row type='flex' justify='start'>
                <Col>
                    <Text className='cvat-text-color' strong>
                    设置标签
                    </Text>
                </Col>
            </Row>
            <Row type='flex' justify='start'>
                <Col>
                    <Text className='cvat-text-color'>标签</Text>
                </Col>
            </Row>
            <Row type='flex' justify='center'>
                <Col span={24}>
                    <Select value={`${selectedLabeID}`} onChange={onChangeLabel}>
                        {labels.map((label: any) => (
                            <Select.Option key={label.id} value={`${label.id}`}>
                                {label.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row type='flex' justify='space-around'>
                <Col span={24}>
                    <Tooltip title={`按 ${repeatShapeShortcut} 添加标签`} mouseLeaveDelay={0}>
                        <Button onClick={() => onSetup(selectedLabeID)}>标签</Button>
                    </Tooltip>
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(SetupTagPopover);
