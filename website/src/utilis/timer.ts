import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const timer = (date)=>{
    return dayjs(date).fromNow()
}