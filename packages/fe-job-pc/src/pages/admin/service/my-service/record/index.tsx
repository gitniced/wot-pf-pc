import { MyServiceContext } from '../components/context'

import PageComponent from '../components'

const MyServiceRecord = () => {
    return (
        <MyServiceContext.Provider value={{ isRecord: true }}>
            <PageComponent />
        </MyServiceContext.Provider>
    )
}

export default MyServiceRecord
