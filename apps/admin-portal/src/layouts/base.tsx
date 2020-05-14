/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AlertInterface } from "@cicis/core/models";
import { initializeAlertSystem } from "@cicis/core/store";
import { Alert } from "@cicis/react-components";
import React, { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UIConstants } from "../constants";
import { AppState } from "../store";

/**
 * Base layout.
 * This layout contains the alert and can be used by any other
 * layout to include the alert.
 *
 * @return {JSX.Element}
 */
export const BaseLayout: React.FunctionComponent<PropsWithChildren<{}>> = (
    props: PropsWithChildren<{}>
): JSX.Element => {

    const alert: AlertInterface = useSelector((state: AppState) => state.global.alert);
    const alertSystem: any = useSelector((state: AppState) => state.global.alertSystem);

    const dispatch = useDispatch();
    const { children } = props;

    const handleAlertSystemInitialize = (system) => {
        dispatch(initializeAlertSystem(system));
    };

    return (
        <>
            { children }
            <Alert
                dismissInterval={ UIConstants.ALERT_DISMISS_INTERVAL }
                alertsPosition="br"
                alertSystem={ alertSystem }
                alert={ alert }
                onAlertSystemInitialize={ handleAlertSystemInitialize }
                withIcon={ true }
            />
        </>
    );
};
