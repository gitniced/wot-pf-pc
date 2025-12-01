import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import styles from './index.module.less'

export default function MdViewer({ content }: any) {
    return (
        <div className={styles.md_viewer}>
            <Viewer value={content} plugins={[gfm()]} />
        </div>
    )
}
