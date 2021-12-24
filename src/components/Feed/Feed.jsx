import React from 'react'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

function Feed(props) {
    return (
        <div>
            feed
        </div>
    )
}

export default withAuthRedirect(Feed);
