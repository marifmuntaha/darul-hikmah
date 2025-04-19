import React, {forwardRef} from "react";
import {Icon} from "../index.jsx";

const DateInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <div onClick={onClick} ref={ref}>
        <div className="form-icon form-icon-left">
            <Icon name="calendar"></Icon>
        </div>
        <input className="form-control date-picker" type="text" value={value} onChange={onChange} />
    </div>
));

export default DateInput;