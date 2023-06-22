import { DatePicker } from 'antd';
import React from 'react';

const TimePicker = React.forwardRef((props, ref) => <DatePicker {...props} picker="time" mode={undefined} ref={ref} />);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
