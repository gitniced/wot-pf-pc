import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'

dayjs.locale('zh-cn')

dayjs.extend(weekday)
dayjs.extend(localeData)

export default dayjs
