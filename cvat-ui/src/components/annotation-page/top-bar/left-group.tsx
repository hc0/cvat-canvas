// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col } from 'antd/lib/grid';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Timeline from 'antd/lib/timeline';
import Dropdown from 'antd/lib/dropdown';

import AnnotationMenuContainer from 'containers/annotation-page/top-bar/annotation-menu';
import { MainMenuIcon, SaveIcon, UndoIcon, RedoIcon } from 'icons';

interface Props {
    saving: boolean;
    savingStatuses: string[];
    undoAction?: string;
    redoAction?: string;
    saveShortcut: string;
    undoShortcut: string;
    redoShortcut: string;
    onSaveAnnotation(): void;
    onUndoClick(): void;
    onRedoClick(): void;
}

function LeftGroup(props: Props): JSX.Element {
    const {
        saving,
        savingStatuses,
        undoAction,
        redoAction,
        saveShortcut,
        undoShortcut,
        redoShortcut,
        onSaveAnnotation,
        onUndoClick,
        onRedoClick,
    } = props;

    let mapObj: object = {
        'Created objects are being saved on the server': '在服务器上保存创建的对象',
        'Updated objects are being saved on the server': '在服务器上保存更新的对象',
        'Deleted objects are being deleted from the server': '从服务器上删除被删除的对象'
    }

    let newSavingStatuses: any[] = savingStatuses.map((item: string) => {
        let list: any = mapObj[item];
        return list;
    })


    return (
        <Col className='cvat-annotation-header-left-group'>
            {/* <Dropdown overlay={<AnnotationMenuContainer />}>
                <Button type='link' className='cvat-annotation-header-button'>
                    <Icon component={MainMenuIcon} />
                    Menu
                </Button>
            </Dropdown> */}
            <Button
                title={`保存当前更改 ${saveShortcut}`}
                onClick={saving ? undefined : onSaveAnnotation}
                type='link'
                className={saving ? 'cvat-annotation-disabled-header-button' : 'cvat-annotation-header-button'}
            >
                <Icon component={SaveIcon} />
                {/* {saving ? '保存中...' : '保存'} */}
                <Modal title='保存服务器上的更改' visible={saving} footer={[]} closable={false}>
                    <Timeline pending={newSavingStatuses[savingStatuses.length - 1] || '等待..'}>
                        {newSavingStatuses.slice(0, -1).map((status: string, id: number) => (
                            <Timeline.Item key={id}>{status}</Timeline.Item>
                        ))}
                    </Timeline>
                </Modal>
            </Button>
            <Button
                title={`撤销: ${undoAction} ${undoShortcut}`}
                disabled={!undoAction}
                style={{ pointerEvents: undoAction ? 'initial' : 'none', opacity: undoAction ? 1 : 0.5 }}
                type='link'
                className='cvat-annotation-header-button'
                onClick={onUndoClick}
            >
                <Icon component={UndoIcon} />
                {/* <span>撤销</span> */}
            </Button>
            <Button
                title={`恢复: ${redoAction} ${redoShortcut}`}
                disabled={!redoAction}
                style={{ pointerEvents: redoAction ? 'initial' : 'none', opacity: redoAction ? 1 : 0.5 }}
                type='link'
                className='cvat-annotation-header-button'
                onClick={onRedoClick}
            >
                <Icon component={RedoIcon} />
                {/* 恢复 */}
            </Button>
        </Col>
    );
}

export default React.memo(LeftGroup);
