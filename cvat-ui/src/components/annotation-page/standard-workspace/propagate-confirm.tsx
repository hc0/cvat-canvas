// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import Modal from 'antd/lib/modal';
import InputNumber from 'antd/lib/input-number';
import Text from 'antd/lib/typography/Text';
import { clamp } from 'utils/math';

interface Props {
    visible: boolean;
    propagateFrames: number;
    propagateUpToFrame: number;
    stopFrame: number;
    frameNumber: number;
    propagateObject(): void;
    cancel(): void;
    changePropagateFrames(value: number): void;
    changeUpToFrame(value: number): void;
}

export default function PropagateConfirmComponent(props: Props): JSX.Element {
    const {
        visible,
        propagateFrames,
        propagateUpToFrame,
        stopFrame,
        frameNumber,
        propagateObject,
        changePropagateFrames,
        changeUpToFrame,
        cancel,
    } = props;

    const minPropagateFrames = 1;

    return (
        <Modal
            okType='primary'
            okText='是'
            cancelText='取消'
            onOk={propagateObject}
            onCancel={cancel}
            title='确认传送'
            visible={visible}
        >
            <div className='cvat-propagate-confirm'>
                <Text>你是否要复制对象从</Text>
                <InputNumber
                    size='small'
                    min={minPropagateFrames}
                    value={propagateFrames}
                    onChange={(value: number | undefined) => {
                        if (typeof value === 'number') {
                            changePropagateFrames(
                                Math.floor(clamp(value, minPropagateFrames, Number.MAX_SAFE_INTEGER)),
                            );
                        }
                    }}
                />
                {propagateFrames > 1 ? <Text> 帧 </Text> : <Text> 帧 </Text>}
                <Text>到 </Text>
                <InputNumber
                    size='small'
                    value={propagateUpToFrame}
                    min={frameNumber + 1}
                    max={stopFrame}
                    onChange={(value: number | undefined) => {
                        if (typeof value === 'number') {
                            changeUpToFrame(Math.floor(clamp(value, frameNumber + 1, stopFrame)));
                        }
                    }}
                />
                <Text>帧</Text>
            </div>
        </Modal>
    );
}
