import React from 'react';
import { MFComponent } from './core/moduleFederation/MFComponent';
import { Button } from 'redrock';

export const App: React.FC = () => {
    return (
        <div>
            <div>
                its work kekis
            </div>
            <div>
                <Button label='test' onClick={(_e) => { console.log('kekis'); }}/>
            </div>
            <div>
                {/* <Suspense fallback={"loading..."}> */}
                {/*    <RemoteApp/> */}
                {/* </Suspense> */}
                <MFComponent
                    url="http://localhost:8080/remoteEntry.js"
                    scope="app2"
                    module='./App'
                />
                {/* <Suspense fallback={"loading..."}> */}
                {/*    <RemoteButton label="kek" onClick={() => console.log('keknul')}/> */}
                {/* </Suspense> */}
                <MFComponent<{ onClick: () => void, label: string }>
                    url="http://localhost:8080/remoteEntry.js"
                    scope="app2"
                    module='./Button'
                    moduleProps={{
                        label: 'kek', onClick: () => { console.log('keknul'); },
                    }}
                />
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.ww = __webpack_share_scopes__;
