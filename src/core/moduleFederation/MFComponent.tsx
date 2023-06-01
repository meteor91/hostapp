import React, { type JSX, Suspense } from 'react';
import { useFederatedComponent } from './hooks/useFederatedComponent';

interface Props<ModuleProps = undefined> {
    url: string
    scope: string
    module: string
    moduleProps?: ModuleProps
}

// const WithGeneric = <T,>(): React.FC<TestProps<T>> =>
//   (props: TestProps<T>) => (

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const MFComponent = <T,>(props: Props<T>): JSX.Element => {
// export const MFComponent = <T,>(): React.FC<Props<T>> => (props: Props<T>) => {
    const { url, scope, module, moduleProps = {} } = props;
    const { Component: FederatedComponent } = useFederatedComponent(url, scope, module);

    return (
        <div>
            <Suspense fallback="Loading Module">
                {FederatedComponent && <FederatedComponent {...moduleProps}/>}
            </Suspense>
        </div>
    );
};
