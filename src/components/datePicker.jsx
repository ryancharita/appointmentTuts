import { DatePicker } from 'antd';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);

export default MyDatePicker;
