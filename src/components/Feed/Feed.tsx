import React from 'react'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

function Feed(props: any) {
    return (
        <div>
            feed
        </div>
    )
}

export default withAuthRedirect(Feed);
