import React from 'react'


export class ScrollingList extends React.Component {
    listRef

    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position, so we can adjust scroll later.

        const list = this.listRef.current;
        console.log(list.scrollHeight, list.scrollTop);

        return list.scrollHeight - list.scrollTop;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        console.log(snapshot)

        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }
    }

    render() {
        return (
            <div ref={this.listRef} className="main-container">{this.props.children}</div>
        );
    }
}

