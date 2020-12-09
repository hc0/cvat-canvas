// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import { Row, Col } from 'antd/lib/grid';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import Slider from 'antd/lib/slider';
import Select from 'antd/lib/select';
import Popover from 'antd/lib/popover';
import InputNumber from 'antd/lib/input-number';
import Icon from 'antd/lib/icon';
import Text from 'antd/lib/typography/Text';
import { CompactPicker } from 'react-color';

import { clamp } from 'utils/math';
import { BackJumpIcon, ForwardJumpIcon } from 'icons';
import { FrameSpeed, GridColor } from 'reducers/interfaces';
import consts from 'consts';

interface Props {
    frameStep: number;
    frameSpeed: FrameSpeed;
    resetZoom: boolean;
    rotateAll: boolean;
    grid: boolean;
    gridSize: number;
    gridColor: GridColor;
    gridOpacity: number;
    brightnessLevel: number;
    contrastLevel: number;
    saturationLevel: number;
    canvasBackgroundColor: string;
    onChangeFrameStep(step: number): void;
    onChangeFrameSpeed(speed: FrameSpeed): void;
    onSwitchResetZoom(enabled: boolean): void;
    onSwitchRotateAll(rotateAll: boolean): void;
    onSwitchGrid(grid: boolean): void;
    onChangeGridSize(gridSize: number): void;
    onChangeGridColor(gridColor: GridColor): void;
    onChangeGridOpacity(gridOpacity: number): void;
    onChangeBrightnessLevel(level: number): void;
    onChangeContrastLevel(level: number): void;
    onChangeSaturationLevel(level: number): void;
    onChangeCanvasBackgroundColor(color: string): void;
}

export default function PlayerSettingsComponent(props: Props): JSX.Element {
    const {
        frameStep,
        frameSpeed,
        resetZoom,
        rotateAll,
        grid,
        gridSize,
        gridColor,
        gridOpacity,
        brightnessLevel,
        contrastLevel,
        saturationLevel,
        canvasBackgroundColor,
        onChangeFrameStep,
        onChangeFrameSpeed,
        onSwitchResetZoom,
        onSwitchRotateAll,
        onSwitchGrid,
        onChangeGridSize,
        onChangeGridColor,
        onChangeGridOpacity,
        onChangeBrightnessLevel,
        onChangeContrastLevel,
        onChangeSaturationLevel,
        onChangeCanvasBackgroundColor,
    } = props;

    const minFrameStep = 2;
    const maxFrameStep = 1000;
    const minGridSize = 5;
    const maxGridSize = 1000;

    return (
        <div className='cvat-player-settings'>
            <Row type='flex' align='bottom' className='cvat-player-settings-step'>
                <Col>
                    <Text className='cvat-text-color'> 播放步长 </Text>
                    <InputNumber
                        min={minFrameStep}
                        max={maxFrameStep}
                        value={frameStep}
                        onChange={(value: number | undefined): void => {
                            if (typeof value === 'number') {
                                onChangeFrameStep(Math.floor(clamp(value, minFrameStep, maxFrameStep)));
                            }
                        }}
                    />
                </Col>
                <Col offset={1}>
                    <Text type='secondary'>
                        选择跳过的帧数
                        <Icon component={BackJumpIcon} />
                        或
                        <Icon component={ForwardJumpIcon} />
                    </Text>
                </Col>
            </Row>
            <Row type='flex' align='middle' className='cvat-player-settings-speed'>
                <Col>
                    <Text className='cvat-text-color'> 播放速度 </Text>
                    <Select
                        value={frameSpeed}
                        onChange={(speed: FrameSpeed): void => {
                            onChangeFrameSpeed(speed);
                        }}
                    >
                        <Select.Option key='fastest' value={FrameSpeed.Fastest}>
                            最快速
                        </Select.Option>
                        <Select.Option key='fast' value={FrameSpeed.Fast}>
                            快速
                        </Select.Option>
                        <Select.Option key='usual' value={FrameSpeed.Usual}>
                            匀速
                        </Select.Option>
                        <Select.Option key='slow' value={FrameSpeed.Slow}>
                            慢速
                        </Select.Option>
                        <Select.Option key='slower' value={FrameSpeed.Slower}>
                            较慢
                        </Select.Option>
                        <Select.Option key='slowest' value={FrameSpeed.Slowest}>
                            最慢速
                        </Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row type='flex' className='cvat-player-settings-canvas-background'>
                <Col>
                    <Popover
                        content={
                            <CompactPicker
                                colors={consts.CANVAS_BACKGROUND_COLORS}
                                color={canvasBackgroundColor}
                                onChange={(e) => onChangeCanvasBackgroundColor(e.hex)}
                            />
                        }
                        overlayClassName='canvas-background-color-picker-popover'
                        trigger='click'
                    >
                        <Button type='default'>选择画布背景色</Button>
                    </Popover>
                </Col>
            </Row>
            <Row type='flex'>
                <Col>
                    <Checkbox
                        className='cvat-text-color cvat-player-settings-grid'
                        checked={grid}
                        onChange={(event: CheckboxChangeEvent): void => {
                            onSwitchGrid(event.target.checked);
                        }}
                    >
                        显示网格
                    </Checkbox>
                </Col>
            </Row>
            <Row type='flex' justify='space-between'>
                <Col span={8} className='cvat-player-settings-grid-size'>
                    <Text className='cvat-text-color'> 网格尺寸 </Text>
                    <InputNumber
                        min={minGridSize}
                        max={maxGridSize}
                        value={gridSize}
                        disabled={!grid}
                        onChange={(value: number | undefined): void => {
                            if (typeof value === 'number') {
                                onChangeGridSize(Math.floor(clamp(value, minGridSize, maxGridSize)));
                            }
                        }}
                    />
                </Col>
                <Col span={8} className='cvat-player-settings-grid-color'>
                    <Text className='cvat-text-color'> 网格颜色 </Text>
                    <Select
                        value={gridColor}
                        disabled={!grid}
                        onChange={(color: GridColor): void => {
                            onChangeGridColor(color);
                        }}
                    >
                        <Select.Option key='white' value={GridColor.White}>
                            白色
                        </Select.Option>
                        <Select.Option key='black' value={GridColor.Black}>
                            黑色
                        </Select.Option>
                        <Select.Option key='red' value={GridColor.Red}>
                            红色
                        </Select.Option>
                        <Select.Option key='green' value={GridColor.Green}>
                            绿色
                        </Select.Option>
                        <Select.Option key='blue' value={GridColor.Blue}>
                            蓝色
                        </Select.Option>
                    </Select>
                </Col>
                <Col span={8} className='cvat-player-settings-grid-opacity'>
                    <Text className='cvat-text-color'> 网格不透明度 </Text>
                    <Slider
                        min={0}
                        max={100}
                        value={gridOpacity}
                        disabled={!grid}
                        onChange={(value: number | [number, number]): void => {
                            onChangeGridOpacity(value as number);
                        }}
                    />
                    <Text className='cvat-text-color'>{`${gridOpacity} %`}</Text>
                </Col>
            </Row>
            <Row type='flex' justify='start'>
                <Col>
                    <Row className='cvat-player-settings-reset-zoom'>
                        <Col className='cvat-player-settings-reset-zoom-checkbox'>
                            <Checkbox
                                className='cvat-text-color'
                                checked={resetZoom}
                                onChange={(event: CheckboxChangeEvent): void => {
                                    onSwitchResetZoom(event.target.checked);
                                }}
                            >
                                设置变焦
                            </Checkbox>
                        </Col>
                        <Col>
                            <Text type='secondary'> 换帧后合适的图像</Text>
                        </Col>
                    </Row>
                </Col>
                <Col offset={5}>
                    <Row className='cvat-player-settings-rotate-all'>
                        <Col className='cvat-player-settings-rotate-all-checkbox'>
                            <Checkbox
                                className='cvat-text-color'
                                checked={rotateAll}
                                onChange={(event: CheckboxChangeEvent): void => {
                                    onSwitchRotateAll(event.target.checked);
                                }}
                            >
                                旋转所有图像
                            </Checkbox>
                        </Col>
                        <Col>
                            <Text type='secondary'> 同时旋转所有图像 </Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row className='cvat-player-settings-brightness'>
                        <Col className='cvat-text-color'>亮度</Col>
                        <Col>
                            <Slider
                                min={50}
                                max={200}
                                value={brightnessLevel}
                                onChange={(value: number | [number, number]): void => {
                                    onChangeBrightnessLevel(value as number);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='cvat-player-settings-contrast'>
                        <Col className='cvat-text-color'>对比度</Col>
                        <Col>
                            <Slider
                                min={50}
                                max={200}
                                value={contrastLevel}
                                onChange={(value: number | [number, number]): void => {
                                    onChangeContrastLevel(value as number);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='cvat-player-settings-saturation'>
                        <Col className='cvat-text-color'>饱和度</Col>
                        <Col>
                            <Slider
                                min={0}
                                max={300}
                                value={saturationLevel}
                                onChange={(value: number | [number, number]): void => {
                                    onChangeSaturationLevel(value as number);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='cvat-player-reset-color-settings'>
                        <Col>
                            <Button
                                onClick={() => {
                                    onChangeBrightnessLevel(100);
                                    onChangeContrastLevel(100);
                                    onChangeSaturationLevel(100);
                                }}
                            >
                                颜色重置
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
