// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select, { SelectValue, LabeledValue } from 'antd/lib/select';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import Tooltip from 'antd/lib/tooltip';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';

import {
    changeAnnotationsFilters as changeAnnotationsFiltersAction,
    fetchAnnotationsAsync,
} from 'actions/annotation-actions';
import { CombinedState } from 'reducers/interfaces';

interface StateToProps {
    annotationsFilters: string[];
    annotationsFiltersHistory: string[];
    searchForwardShortcut: string;
    searchBackwardShortcut: string;
}

interface DispatchToProps {
    changeAnnotationsFilters(value: SelectValue): void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const {
        annotation: {
            annotations: { filters: annotationsFilters, filtersHistory: annotationsFiltersHistory },
        },
        shortcuts: { normalizedKeyMap },
    } = state;

    return {
        annotationsFilters,
        annotationsFiltersHistory,
        searchForwardShortcut: normalizedKeyMap.SEARCH_FORWARD,
        searchBackwardShortcut: normalizedKeyMap.SEARCH_BACKWARD,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        changeAnnotationsFilters(value: SelectValue) {
            if (typeof value === 'string') {
                dispatch(changeAnnotationsFiltersAction([value]));
                dispatch(fetchAnnotationsAsync());
            } else if (
                Array.isArray(value) &&
                value.every((element: string | number | LabeledValue): boolean => typeof element === 'string')
            ) {
                dispatch(changeAnnotationsFiltersAction(value as string[]));
                dispatch(fetchAnnotationsAsync());
            }
        },
    };
}

function filtersHelpModalContent(searchForwardShortcut: string, searchBackwardShortcut: string): JSX.Element {
    return (
        <>
            <Paragraph>
                <Title level={3}>通用</Title>
            </Paragraph>
            <Paragraph>
            您可以使用过滤器来显示帧上对应子集的对象，或者使用搜索键来匹配过滤器。

                <Text strong>{` ${searchForwardShortcut} `}</Text>
                和
                <Text strong>{` ${searchBackwardShortcut} `}</Text>
            </Paragraph>
            <Paragraph>
                <Text strong>支持的属性: </Text>
                宽度、高度、标签、服务器 ID、客户端 ID、类型、形状、遮挡
                <br />
                <Text strong>支持的操作: </Text>
                ==, !=, &gt;, &gt;=, &lt;, &lt;=, (), &amp; and |
                <br />
                <Text strong>
                如果查询字符串中有双引号，请使用反斜杠进行转义: \&quot; (见最新示例)
                </Text>
                <br />
                所有的属性和值都是区分大小写的，CVAT使用json查询来执行搜索。
            </Paragraph>
            <Paragraph>
                <Title level={3}>例如</Title>
                <ul>
                    <li>label==&quot;car&quot; | label==[&quot;road sign&quot;]</li>
                    <li>shape == &quot;polygon&quot;</li>
                    <li>width &gt;= height</li>
                    <li>attr[&quot;Attribute 1&quot;] == attr[&quot;Attribute 2&quot;]</li>
                    <li>clientID == 50</li>
                    <li>
                        (label==&quot;car&quot; &amp; attr[&quot;parked&quot;]==true) | (label==&quot;pedestrian&quot;
                        &amp; width &gt; 150)
                    </li>
                    <li>
                        (( label==[&quot;car \&quot;mazda\&quot;&quot;]) &amp; (attr[&quot;sunglasses&quot;]==true |
                        (width &gt; 150 | height &gt; 150 &amp; (clientID == serverID)))))
                    </li>
                </ul>
            </Paragraph>
        </>
    );
}

function AnnotationsFiltersInput(props: StateToProps & DispatchToProps): JSX.Element {
    const {
        annotationsFilters,
        annotationsFiltersHistory,
        searchForwardShortcut,
        searchBackwardShortcut,
        changeAnnotationsFilters,
    } = props;

    const [underCursor, setUnderCursor] = useState(false);

    return (
        <Select
            className='cvat-annotations-filters-input'
            allowClear
            value={annotationsFilters}
            mode='tags'
            style={{ width: '100%' }}
            placeholder={
                underCursor ? (
                    <>
                        <Tooltip title='点击打开帮助' mouseLeaveDelay={0}>
                            <Icon
                                type='filter'
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    Modal.info({
                                        okText:'确定',
                                        width: 700,
                                        title: '如何使用过滤器?',
                                        content: filtersHelpModalContent(searchForwardShortcut, searchBackwardShortcut),
                                    });
                                }}
                            />
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Icon style={{ transform: 'scale(0.9)' }} type='filter' />
                        <span style={{ marginLeft: 5 }}>注释</span>
                    </>
                )
            }
            onChange={changeAnnotationsFilters}
            onMouseEnter={() => setUnderCursor(true)}
            onMouseLeave={() => setUnderCursor(false)}
        >
            {annotationsFiltersHistory.map(
                (element: string): JSX.Element => (
                    <Select.Option key={element} value={element}>
                        {element}
                    </Select.Option>
                ),
            )}
        </Select>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationsFiltersInput);
