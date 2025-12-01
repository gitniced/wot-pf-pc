import UserStore from './userStore'
import SiteStore from './siteStore'
import type { Stores } from './interface'

export default function mobxStores(): Stores {
    return {
        userStore: new UserStore(),
        siteStore: new SiteStore(),
    }
}
