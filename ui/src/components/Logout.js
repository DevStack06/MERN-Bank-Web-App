import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const Logout = ({
    visible,
    onClick
}) => (
        <span>
            {
                visible &&
                <FlatButton label="Logout" onClick={onClick} />
            }
        </span>
    )

export default Logout