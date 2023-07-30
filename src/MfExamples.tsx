import React from 'react';
import { MFComponent } from './core/moduleFederation/MFComponent';

export const MfExamples: React.FC = () => {
    return (
        <div>
            <div>
                its work
            </div>
            <div>
                <MFComponent
                    url="http://localhost:8080/remoteEntry.js"
                    scope="app2"
                    module='./App'
                />
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
