import React from 'react'
import LayoutPage from '@/components/Order/LayoutPage'
import InvoiceHeader from '@/components/Order/InvoiceHeader'
function CustomLayout({
    isShowLayout,
    isShowHeader,
    noUser = false,
    children,
}: {
    isShowLayout?: boolean
    isShowHeader?: boolean
    noUser?: boolean
    children: JSX.Element
}) {
    if (isShowLayout) {
        return (
            <LayoutPage>
                {isShowHeader && <InvoiceHeader noUser={noUser} />}
                {children}
            </LayoutPage>
        )
    } else {
        return <>{children}</>
    }
}

export default CustomLayout
