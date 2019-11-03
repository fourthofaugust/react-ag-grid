import React, {Component} from 'react';
// import { AgGridReact } from 'ag-grid-react';

class PostsGrid extends Component {

    POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
   /* columnDefs = [{
        headerName: "ID", field: "id", sortable: true
    }, {
        headerName: "Title", field: "title", sortable: true
    }, {
        headerName: "Body", field: "body", sortable: true
    }];*/

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "ID", field: "id", sortable: true
            }, {
                headerName: "Title", field: "title", sortable: true
            }, {
                headerName: "Body", field: "body", sortable: true
            }]
        }
    }

    componentDidMount() {
        fetch(this.POSTS_URL)
            .then(result => result.json())
            .then(rowData => console.log(rowData))
    }

    render() {
        return (
            <React.Fragment>
            <h1>Posts</h1>
            </React.Fragment>
        );
    }
}

export default PostsGrid;