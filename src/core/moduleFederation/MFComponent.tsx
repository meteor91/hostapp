import React, {Suspense} from "react";
import {useFederatedComponent} from "./hooks/useFederatedComponent";

interface Props<ModuleProps = undefined> {
    url: string;
    scope: string;
    module: string;
    moduleProps?: ModuleProps
}

export const MFComponent = <T,>(props: Props<T>) => {


    const {url, scope, module, moduleProps = {}} = props;

    const {Component: FederatedComponent, failed} = useFederatedComponent(url, scope, module);


    return (
        <Suspense fallback="Loading Module">
            {FederatedComponent && <FederatedComponent {...moduleProps}/>}
        </Suspense>
    );
}