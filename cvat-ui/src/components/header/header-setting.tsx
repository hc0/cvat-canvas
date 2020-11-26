// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import { switchSettingsDialog as switchSettingsDialogAction } from 'actions/settings-actions';
import { CombinedState } from 'reducers/interfaces';
import SettingsModal from './settings-modal/settings-modal';
import "./styles.scss";
interface StateToProps {
  switchSettingsShortcut: string;
  settingsDialogShown: boolean;
}

interface DispatchToProps {
  switchSettingsDialog: (show: boolean) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
  const {
    shortcuts: { normalizedKeyMap },
    settings: { showDialog: settingsDialogShown },
  } = state;

  return {
    switchSettingsShortcut: normalizedKeyMap.SWITCH_SETTINGS,
    settingsDialogShown,
  };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
  return {
    switchSettingsDialog: (show: boolean): void => dispatch(switchSettingsDialogAction(show))
  };
}

type Props = StateToProps & DispatchToProps;

function HeaderContainer(props: Props): JSX.Element {
  const {
    settingsDialogShown,
    switchSettingsShortcut,
    switchSettingsDialog,
  } = props;
  return (
    <div className='header-setting'>
      <Button className="cvat-annotation-header-button" type='link' title={`请 ${switchSettingsShortcut} 进行设置`} onClick={() => switchSettingsDialog(true)}>
        <Icon type='setting' />
        {/* <span>设置</span> */}
      </Button>
      <SettingsModal visible={settingsDialogShown} onClose={() => switchSettingsDialog(false)} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
