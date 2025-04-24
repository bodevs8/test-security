import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/vi';

dayjs.extend(utc);

export default dayjs;
