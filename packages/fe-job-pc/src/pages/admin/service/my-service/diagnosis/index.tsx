import { MyServiceContext } from '../components/context'

import PageComponent from '../components'

const MyServiceDiagnosis = () => {
    return (
        <MyServiceContext.Provider value={{ isRecord: false }}>
            <PageComponent />
        </MyServiceContext.Provider>
    )
}

export default MyServiceDiagnosis
