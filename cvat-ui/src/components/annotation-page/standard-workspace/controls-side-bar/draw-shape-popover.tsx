// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Select, { OptionProps } from 'antd/lib/select';
import Button from 'antd/lib/button';
import InputNumber from 'antd/lib/input-number';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Tooltip from 'antd/lib/tooltip';
import Text from 'antd/lib/typography/Text';

import { RectDrawingMethod, CuboidDrawingMethod } from 'cvat-canvas-wrapper';
import { ShapeType, ShapeTypeText } from 'reducers/interfaces';
import { clamp } from 'utils/math';

interface Props {
    shapeType: ShapeType;
    labels: any[];
    minimumPoints: number;
    rectDrawingMethod?: RectDrawingMethod;
    cuboidDrawingMethod?: CuboidDrawingMethod;
    numberOfPoints?: number;
    selectedLabeID: number;
    repeatShapeShortcut: string;
    onChangeLabel(value: string): void;
    onChangePoints(value: number | undefined): void;
    onChangeRectDrawingMethod(event: RadioChangeEvent): void;
    onChangeCuboidDrawingMethod(event: RadioChangeEvent): void;
    onDrawTrack(): void;
    onDrawShape(): void;
}

function DrawShapePopoverComponent(props: Props): JSX.Element {
    const {
        labels,
        shapeType,
        minimumPoints,
        selectedLabeID,
        numberOfPoints,
        rectDrawingMethod,
        cuboidDrawingMethod,
        repeatShapeShortcut,
        onDrawTrack,
        onDrawShape,
        onChangeLabel,
        onChangePoints,
        onChangeRectDrawingMethod,
        onChangeCuboidDrawingMethod,
    } = props;

    return (
        <div className='cvat-draw-shape-popover-content'>
            <Row type='flex' justify='start'>
                <Col>
                    <Text className='cvat-text-color' strong>{`绘制 ${ShapeTypeText[shapeType]}`}</Text>
                </Col>
            </Row>
            <Row type='flex' justify='start'>
                <Col>
                    <Text className='cvat-text-color'>标签</Text>
                </Col>
            </Row>
            <Row type='flex' justify='center'>
                <Col span={24}>
                    <Select
                        showSearch
                        filterOption={(input: string, option: React.ReactElement<OptionProps>) => {
                            const { children } = option.props;
                            if (typeof children === 'string') {
                                return children.toLowerCase().includes(input.toLowerCase());
                            }

                            return false;
                        }}
                        value={`${selectedLabeID}`}
                        onChange={onChangeLabel}
                    >
                        {labels.map((label: any) => (
                            <Select.Option key={label.id} value={`${label.id}`}>
                                {label.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            {shapeType === ShapeType.RECTANGLE && (
                <>
                    <Row>
                        <Col>
                            <Text className='cvat-text-color'> 画图方式 </Text>
                        </Col>
                    </Row>
                    <Row type='flex' justify='space-around'>
                        <Col>
                            <Radio.Group
                                style={{ display: 'flex' }}
                                value={rectDrawingMethod}
                                onChange={onChangeRectDrawingMethod}
                            >
                                <Radio value={RectDrawingMethod.CLASSIC} style={{ width: 'auto' }}>
                                2点定位
                                </Radio>
                                <Radio value={RectDrawingMethod.EXTREME_POINTS} style={{ width: 'auto' }}>
                                4点定位
                                </Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                </>
            )}
            {shapeType === ShapeType.CUBOID && (
                <>
                    <Row>
                        <Col>
                            <Text className='cvat-text-color'> 画图方式 </Text>
                        </Col>
                    </Row>
                    <Row type='flex' justify='space-around'>
                        <Col>
                            <Radio.Group
                                style={{ display: 'flex' }}
                                value={cuboidDrawingMethod}
                                onChange={onChangeCuboidDrawingMethod}
                            >
                                <Radio value={CuboidDrawingMethod.CLASSIC} style={{ width: 'auto' }}>
                                矩形绘制
                                </Radio>
                                <Radio value={CuboidDrawingMethod.CORNER_POINTS} style={{ width: 'auto' }}>
                                4点绘制
                                </Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                </>
            )}
            {shapeType !== ShapeType.RECTANGLE && shapeType !== ShapeType.CUBOID && (
                <Row type='flex' justify='space-around' align='middle'>
                    <Col span={14}>
                        <Text className='cvat-text-color'> 输入点数: </Text>
                    </Col>
                    <Col span={10}>
                        <InputNumber
                            onChange={(value: number | undefined) => {
                                if (typeof value === 'number') {
                                    onChangePoints(Math.floor(clamp(value, minimumPoints, Number.MAX_SAFE_INTEGER)));
                                } else if (!value) {
                                    onChangePoints(undefined);
                                }
                            }}
                            className='cvat-draw-shape-popover-points-selector'
                            min={minimumPoints}
                            value={numberOfPoints}
                            step={1}
                        />
                    </Col>
                </Row>
            )}
            <Row type='flex' justify='space-around'>
                <Col span={12}>
                    <Tooltip title={`按 ${repeatShapeShortcut} 再次绘制`} mouseLeaveDelay={0}>
                        <Button onClick={onDrawShape}>形状</Button>
                    </Tooltip>
                </Col>
                <Col span={12}>
                    <Tooltip title={`按 ${repeatShapeShortcut} 再次绘制`} mouseLeaveDelay={0}>
                        <Button onClick={onDrawTrack}>轨迹</Button>
                    </Tooltip>
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(DrawShapePopoverComponent);
