import React, {Suspense, useEffect} from "react";
import {MFComponent} from "./core/moduleFederation/MFComponent";
// @ts-ignore
// const RemoteApp = React.lazy(() => import("app2/App"));

// @ts-ignore
// const RemoteButton = React.lazy(() => import("app2/Button"));
export const App = () => {
    // useEffect(() => {
    //     console.log(RemoteApp);
    // }, [])
    return (
        <div>
            <div>
                its work kekis
            </div>
            <div>
            {/*<Suspense fallback={"loading..."}>*/}
            {/*    <RemoteApp/>*/}
            {/*</Suspense>*/}
            <MFComponent
                url="http://localhost:8080/remoteEntry.js"
                scope="app2"
                module='./App'
            />
            {/*<Suspense fallback={"loading..."}>*/}
            {/*    <RemoteButton label="kek" onClick={() => console.log('keknul')}/>*/}
            {/*</Suspense>*/}
                <MFComponent<{onClick: () => void; label: string}>
                    url="http://localhost:8080/remoteEntry.js"
                    scope="app2"
                    module='./Button'
                    moduleProps={{
                        label: "kek", onClick: () => console.log('keknul')
                    }}
                />
            </div>
        </div>
    )
}
//@ts-ignore
window.ww = __webpack_share_scopes__;