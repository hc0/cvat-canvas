// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import { Row, Col } from 'antd/lib/grid';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import InputNumber from 'antd/lib/input-number';
import Text from 'antd/lib/typography/Text';

import { clamp } from 'utils/math';

interface Props {
    autoSave: boolean;
    autoSaveInterval: number;
    aamZoomMargin: number;
    showAllInterpolationTracks: boolean;
    showObjectsTextAlways: boolean;
    automaticBordering: boolean;
    onSwitchAutoSave(enabled: boolean): void;
    onChangeAutoSaveInterval(interval: number): void;
    onChangeAAMZoomMargin(margin: number): void;
    onSwitchShowingInterpolatedTracks(enabled: boolean): void;
    onSwitchShowingObjectsTextAlways(enabled: boolean): void;
    onSwitchAutomaticBordering(enabled: boolean): void;
}

export default function WorkspaceSettingsComponent(props: Props): JSX.Element {
    const {
        autoSave,
        autoSaveInterval,
        aamZoomMargin,
        showAllInterpolationTracks,
        showObjectsTextAlways,
        automaticBordering,
        onSwitchAutoSave,
        onChangeAutoSaveInterval,
        onChangeAAMZoomMargin,
        onSwitchShowingInterpolatedTracks,
        onSwitchShowingObjectsTextAlways,
        onSwitchAutomaticBordering,
    } = props;

    const minAutoSaveInterval = 1;
    const maxAutoSaveInterval = 60;
    const minAAMMargin = 0;
    const maxAAMMargin = 1000;

    return (
        <div className='cvat-workspace-settings'>
            <Row type='flex'>
                <Col>
                    <Checkbox
                        className='cvat-text-color cvat-workspace-settings-auto-save'
                        checked={autoSave}
                        onChange={(event: CheckboxChangeEvent): void => {
                            onSwitchAutoSave(event.target.checked);
                        }}
                    >
                        自动保存
                    </Checkbox>
                </Col>
            </Row>
            <Row type='flex'>
                <Col className='cvat-workspace-settings-auto-save-interval'>
                    <Text type='secondary'> 每 </Text>
                    <InputNumber
                        min={minAutoSaveInterval}
                        max={maxAutoSaveInterval}
                        step={1}
                        value={Math.round(autoSaveInterval / (60 * 1000))}
                        onChange={(value: number | undefined): void => {
                            if (typeof value === 'number') {
                                onChangeAutoSaveInterval(
                                    Math.floor(clamp(value, minAutoSaveInterval, maxAutoSaveInterval)) * 60 * 1000,
                                );
                            }
                        }}
                    />
                    <Text type='secondary'> 分钟自动保存 </Text>
                </Col>
            </Row>
            <Row className='cvat-workspace-settings-show-interpolated'>
                <Col>
                    <Checkbox
                        className='cvat-text-color'
                        checked={showAllInterpolationTracks}
                        onChange={(event: CheckboxChangeEvent): void => {
                            onSwitchShowingInterpolatedTracks(event.target.checked);
                        }}
                    >
                        显示所有插值轨迹
                    </Checkbox>
                </Col>
                <Col>
                    <Text type='secondary'> 在面板中显示隐藏的插值 </Text>
                </Col>
            </Row>
            <Row className='cvat-workspace-settings-show-text-always'>
                <Col>
                    <Checkbox
                        className='cvat-text-color'
                        checked={showObjectsTextAlways}
                        onChange={(event: CheckboxChangeEvent): void => {
                            onSwitchShowingObjectsTextAlways(event.target.checked);
                        }}
                    >
                        始终显示对象详细信息
                    </Checkbox>
                </Col>
                <Col>
                    <Text type='secondary'>
                        {' '}
                        在画布上显示对象文本(不仅在激活对象时){' '}
                    </Text>
                </Col>
            </Row>
            <Row className='cvat-workspace-settings-autoborders'>
                <Col>
                    <Checkbox
                        className='cvat-text-color'
                        checked={automaticBordering}
                        onChange={(event: CheckboxChangeEvent): void => {
                            onSwitchAutomaticBordering(event.target.checked);
                        }}
                    >
                        自动边框
                    </Checkbox>
                </Col>
                <Col>
                    <Text type='secondary'>
                        {' '}
                        在绘图和编辑过程中为多边形和折线启用自动边框{' '}
                    </Text>
                </Col>
            </Row>
            <Row className='cvat-workspace-settings-aam-zoom-margin'>
                <Col>
                    <Text className='cvat-text-color'> 属性注释模式(AAM) 变焦边距 </Text>
                    <InputNumber
                        min={minAAMMargin}
                        max={maxAAMMargin}
                        value={aamZoomMargin}
                        onChange={(value: number | undefined): void => {
                            if (typeof value === 'number') {
                                onChangeAAMZoomMargin(Math.floor(clamp(value, minAAMMargin, maxAAMMargin)));
                            }
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
}
