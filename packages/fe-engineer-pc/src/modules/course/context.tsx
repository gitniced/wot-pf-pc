import React, { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import CourseStore from './store'

interface CourseStoreContextType {
    courseStore: CourseStore
}

const CourseStoreContext = createContext<CourseStoreContextType | null>(null)

export const useCourseStore = () => {
    const context = useContext(CourseStoreContext)
    if (!context) {
        throw new Error('useCourseStore must be used within a CourseStoreProvider')
    }
    return context.courseStore
}

interface CourseStoreProviderProps {
    children: React.ReactNode
    courseId: string
}

export const CourseStoreProvider: React.FC<CourseStoreProviderProps> = ({ children, courseId }) => {
    const courseStore = useLocalObservable(() => new CourseStore(courseId))

    return (
        <CourseStoreContext.Provider value={{ courseStore }}>
            {children}
        </CourseStoreContext.Provider>
    )
}
