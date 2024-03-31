import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-Us');

export default timeAgo;