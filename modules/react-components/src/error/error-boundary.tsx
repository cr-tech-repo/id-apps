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

import React, { PropsWithChildren } from "react";

/**
 * Error boundary state interface.
 */
interface ErrorBoundaryState {
    error: any;
    errorInfo: any;
}

/**
 * Error boundary props interface.
 */
interface ErrorBoundaryProps {
    fallback: React.ReactNode;
}

/**
 * Error boundary component to avoid JavaScript errors from breaking
 * the entire app due to an error in a specific UI part.
 * This component is an implementation of the error boundary concept
 * introduced in React 16.
 * @see {@link https://reactjs.org/docs/error-boundaries.html}
 *
 * @param {PlaceholderProps} props - Props injected in to the placeholder component.
 * @return {JSX.Element}
 */
export class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        const { errorInfo } = this.state;
        const { children, fallback } = this.props;

        // If there's an error, render the fallback.
        if (errorInfo) {
            return fallback;
        }

        // Just render children
        return children;
    }
}
