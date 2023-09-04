import React, { type JSX, Suspense } from 'react';
import { useFederatedComponent } from './hooks/useFederatedComponent';
import { ModuleProps } from '../models';
import { useAppNavigationManager } from './hooks/useAppNavigationManager';

interface Props<ModuleProps> {
    url: string
    scope: string
    module: string
    moduleProps: ModuleProps
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const MFComponent = <T extends ModuleProps,>(props: Props<T>): JSX.Element => {
    const { url, scope, module, moduleProps = {} } = props;
    const { Component: FederatedComponent, failed } = useFederatedComponent(url, scope, module);

    useAppNavigationManager(props.moduleProps.basename);

    return (
        <div>
            <Suspense fallback="Loading Module">
                {FederatedComponent && <FederatedComponent {...moduleProps}/>}
                {failed && (
                    <div>something goes wrong</div>
                )}
            </Suspense>
        </div>
    );
};
