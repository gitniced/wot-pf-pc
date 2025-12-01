import Container from './Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Index = ({ userMenuConfig }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container userMenuConfig={userMenuConfig} />
        </DndProvider>
    )
}

export default Index
