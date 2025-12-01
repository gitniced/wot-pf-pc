export interface SearchParams {
    commonJob: string
    composition: string
    title: string
    usedState: string
}
export interface SearchFormProps {
    initSearchParams: SearchParams
    searchParams: SearchParams
    onSearch: (values: SearchParams) => void
}
