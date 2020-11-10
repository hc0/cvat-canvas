// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'antd/dist/antd.css';
import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import Modal from 'antd/lib/modal';
import notification from 'antd/lib/notification';
import Spin from 'antd/lib/spin';
import Text from 'antd/lib/typography/Text';
import GlobalErrorBoundary from 'components/global-error-boundary/global-error-boundary';
import Header from 'components/header/header';
import ResetPasswordPageConfirmComponent from 'components/reset-password-confirm-page/reset-password-confirm-page';
import ResetPasswordPageComponent from 'components/reset-password-page/reset-password-page';
import ShorcutsDialog from 'components/shortcuts-dialog/shortcuts-dialog';
import LoginWithTokenComponent from 'components/login-with-token/login-with-token';
import AnnotationPageContainer from 'containers/annotation-page/annotation-page';
import CreateTaskPageContainer from 'containers/create-task-page/create-task-page';
import LoginPageContainer from 'containers/login-page/login-page';
import ModelsPageContainer from 'containers/models-page/models-page';
import RegisterPageContainer from 'containers/register-page/register-page';
import TaskPageContainer from 'containers/task-page/task-page';
import TasksPageContainer from 'containers/tasks-page/tasks-page';
import getCore from 'cvat-core-wrapper';
import React from 'react';
import { configure, ExtendedKeyMapOptions, GlobalHotKeys } from 'react-hotkeys';
import { Redirect, Route, Switch } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { NotificationsState } from 'reducers/interfaces';
import { customWaViewHit } from 'utils/enviroment';
import showPlatformNotification, { platformInfo, stopNotifications } from 'utils/platform-checker';
import '../styles.scss';

interface CVATAppProps {
    loadFormats: () => void;
    loadUsers: () => void;
    loadAbout: () => void;
    verifyAuthorized: () => void;
    loadUserAgreements: () => void;
    initPlugins: () => void;
    initModels: () => void;
    resetErrors: () => void;
    resetMessages: () => void;
    switchShortcutsDialog: () => void;
    switchSettingsDialog: () => void;
    loadAuthActions: () => void;
    keyMap: Record<string, ExtendedKeyMapOptions>;
    userInitialized: boolean;
    userFetching: boolean;
    pluginsInitialized: boolean;
    pluginsFetching: boolean;
    modelsInitialized: boolean;
    modelsFetching: boolean;
    formatsInitialized: boolean;
    formatsFetching: boolean;
    usersInitialized: boolean;
    usersFetching: boolean;
    aboutInitialized: boolean;
    aboutFetching: boolean;
    userAgreementsFetching: boolean;
    userAgreementsInitialized: boolean;
    authActionsFetching: boolean;
    authActionsInitialized: boolean;
    notifications: NotificationsState;
    user: any;
    isModelPluginActive: boolean;
}

class CVATApplication extends React.PureComponent<CVATAppProps & RouteComponentProps> {
    public componentDidMount(): void {
        const core = getCore();
        const { verifyAuthorized, history, location } = this.props;
        configure({ ignoreRepeatedEventsWhenKeyHeldDown: false });

        // Logger configuration
        const userActivityCallback: (() => void)[] = [];
        window.addEventListener('click', () => {
            userActivityCallback.forEach((handler) => handler());
        });
        core.logger.configure(() => window.document.hasFocus, userActivityCallback);

        customWaViewHit(location.pathname, location.search, location.hash);
        history.listen((_location) => {
            customWaViewHit(_location.pathname, _location.search, _location.hash);
        });

        verifyAuthorized();
    }

    public componentDidUpdate(): void {
        const {
            verifyAuthorized,
            loadFormats,
            loadUsers,
            loadAbout,
            loadUserAgreements,
            initPlugins,
            initModels,
            loadAuthActions,
            userInitialized,
            userFetching,
            formatsInitialized,
            formatsFetching,
            usersInitialized,
            usersFetching,
            aboutInitialized,
            aboutFetching,
            pluginsInitialized,
            pluginsFetching,
            modelsInitialized,
            modelsFetching,
            user,
            userAgreementsFetching,
            userAgreementsInitialized,
            authActionsFetching,
            authActionsInitialized,
            isModelPluginActive,
        } = this.props;

        this.showErrors();
        this.showMessages();

        if (!userInitialized && !userFetching) {
            verifyAuthorized();
            return;
        }

        if (!userAgreementsInitialized && !userAgreementsFetching) {
            loadUserAgreements();
            return;
        }

        if (user == null || !user.isVerified) {
            return;
        }

        if (!authActionsInitialized && !authActionsFetching) {
            loadAuthActions();
        }

        if (!formatsInitialized && !formatsFetching) {
            loadFormats();
        }

        if (!usersInitialized && !usersFetching) {
            loadUsers();
        }

        if (!aboutInitialized && !aboutFetching) {
            loadAbout();
        }

        if (isModelPluginActive && !modelsInitialized && !modelsFetching) {
            initModels();
        }

        if (!pluginsInitialized && !pluginsFetching) {
            initPlugins();
        }
    }

    private showMessages(): void {
        function showMessage(title: string): void {
            notification.info({
                message: (
                    <div
                        // eslint-disable-next-line
                        dangerouslySetInnerHTML={{
                            __html: title,
                        }}
                    />
                ),
                duration: null,
            });
        }

        const { notifications, resetMessages } = this.props;

        let shown = false;
        for (const where of Object.keys(notifications.messages)) {
            for (const what of Object.keys((notifications as any).messages[where])) {
                const message = (notifications as any).messages[where][what];
                shown = shown || !!message;
                if (message) {
                    showMessage(message);
                }
            }
        }

        if (shown) {
            resetMessages();
        }
    }

    private showErrors(): void {
        function showError(title: string, _error: any): void {
            const error = _error.toString();
            notification.error({
                message: (
                    <div
                        // eslint-disable-next-line
                        dangerouslySetInnerHTML={{
                            __html: title,
                        }}
                    />
                ),
                duration: null,
                description: error.length > 200 ? 'Open the Browser Console to get details' : error,
            });

            // eslint-disable-next-line no-console
            console.error(error);
        }

        const { notifications, resetErrors } = this.props;

        let shown = false;
        for (const where of Object.keys(notifications.errors)) {
            for (const what of Object.keys((notifications as any).errors[where])) {
                const error = (notifications as any).errors[where][what];
                shown = shown || !!error;
                if (error) {
                    showError(error.message, error.reason);
                }
            }
        }

        if (shown) {
            resetErrors();
        }
    }

    // Where you go depends on your URL
    public render(): JSX.Element {
        const {
            userInitialized,
            usersInitialized,
            aboutInitialized,
            pluginsInitialized,
            formatsInitialized,
            switchShortcutsDialog,
            switchSettingsDialog,
            user,
            keyMap,
            isModelPluginActive,
        } = this.props;

        const readyForRender =
            (userInitialized && (user == null || !user.isVerified)) ||
            (userInitialized && formatsInitialized && pluginsInitialized && usersInitialized && aboutInitialized);

        const subKeyMap = {
            SWITCH_SHORTCUTS: keyMap.SWITCH_SHORTCUTS,
            SWITCH_SETTINGS: keyMap.SWITCH_SETTINGS,
        };

        const handlers = {
            SWITCH_SHORTCUTS: (event: KeyboardEvent | undefined) => {
                if (event) event.preventDefault();

                switchShortcutsDialog();
            },
            SWITCH_SETTINGS: (event: KeyboardEvent | undefined) => {
                if (event) event.preventDefault();

                switchSettingsDialog();
            },
        };

        if (showPlatformNotification()) {
            stopNotifications(false);
            const info = platformInfo();
            Modal.warning({
                title: 'Unsupported platform detected',
                content: (
                    <>
                        <Row>
                            <Col>
                                <Text>
                                    {`The browser you are using is ${info.name} ${info.version} based on ${info.engine} .` +
                                        ' CVAT was tested in the latest versions of Chrome and Firefox.' +
                                        ' We recommend to use Chrome (or another Chromium based browser)'}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text type='secondary'>{`The operating system is ${info.os}`}</Text>
                            </Col>
                        </Row>
                    </>
                ),
                onOk: () => stopNotifications(true),
            });
        }

        if (readyForRender) {
            if (user && user.isVerified) {
                return (
                    <GlobalErrorBoundary>
                        <Layout>
                            <Header />
                            <Layout.Content style={{ height: '100%' }}>
                                <ShorcutsDialog />
                                <GlobalHotKeys keyMap={subKeyMap} handlers={handlers}>
                                    <Switch>
                                        <Route exact path='/tasks' component={TasksPageContainer} />
                                        <Route exact path='/tasks/create' component={CreateTaskPageContainer} />
                                        <Route exact path='/tasks/:id' component={TaskPageContainer} />
                                        <Route exact path='/tasks/:tid/jobs/:jid' component={AnnotationPageContainer} />
                                        {isModelPluginActive && (
                                            <Route exact path='/models' component={ModelsPageContainer} />
                                        )}
                                        <Redirect push to='/tasks' />
                                    </Switch>
                                </GlobalHotKeys>
                                {/* eslint-disable-next-line */}
                                <a id='downloadAnchor' style={{ display: 'none' }} download />
                            </Layout.Content>
                        </Layout>
                    </GlobalErrorBoundary>
                );
            }

            return (
                <GlobalErrorBoundary>
                    <Switch>
                        <Route exact path='/auth/register' component={RegisterPageContainer} />
                        <Route exact path='/auth/login' component={LoginPageContainer} />
                        <Route
                            exact
                            path='/auth/login-with-token/:sessionId/:token'
                            component={LoginWithTokenComponent}
                        />
                        <Route exact path='/auth/password/reset' component={ResetPasswordPageComponent} />
                        <Route
                            exact
                            path='/auth/password/reset/confirm'
                            component={ResetPasswordPageConfirmComponent}
                        />
                        <Redirect to='/auth/login' />
                    </Switch>
                </GlobalErrorBoundary>
            );
        }

        return <Spin size='large' className='cvat-spinner' />;
    }
}

export default withRouter(CVATApplication);
