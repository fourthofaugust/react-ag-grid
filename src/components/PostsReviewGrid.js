import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Button} from "react-bootstrap";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as postsAction from "../actions/PostsAction";

const mapStateToProps = (state) => {
    return {
        posts: state.PostsReducer.posts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAllPosts: () => dispatch(postsAction.removeAllPosts()),
        removePostById: (postId) => dispatch(postsAction.removePostById(postId))
    }
};

class PostsReviewGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.columnDefs,
            rowSelection: "multiple"
        };
        this.onGridReady.bind(this);
        this.returnToPosts.bind(this);
        this.sendPosts.bind(this);
        this.removePostById.bind(this);
    }

    gridApi;
    gridColumnApi;
    columnDefs = [{
        headerName: "ID", field: "id", sortable: true, width: 100
    }, {
        headerName: "Title", field: "title", sortable: true, width: 300
    }, {
        headerName: "Body", field: "body", sortable: true, width: 400
    }, {
        headerName: "Custom Number", field: "customNumber", sortable: true, width: 300
    }, {
        headerName: "Custom Number Clone", field: "customNumberClone", sortable: true, width: 300
    }, {
        headerName: "Edit",
        field: "edit",
        cellRendererFramework: (params) => {
            return <Button size="sm" variant="danger" onClick={() => this.removePostById(params.node.data.id)}> Remove </Button>
        }
    }];

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    returnToPosts = (reset) => {
        if (reset) this.props.removeAllPosts();
        this.props.history.push("/");
    };

    removePostById = (postId) => {
        this.props.removePostById(postId);
    };

    sendPosts = () => {
        console.log('Submitting data to the backend');
        console.log(this.props.posts);
        console.log('Removing Posts');
        this.props.removeAllPosts();
    };

    render() {
        return (
            <React.Fragment>
                <h1>Posts Review</h1>
                <div style={{height: '700px', width: '100%'}} className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.props.posts}
                        onGridReady={this.onGridReady}
                    >
                    </AgGridReact>
                </div>
                <Button type="button" onClick={() => this.returnToPosts(false)}>Return to Posts</Button>
                <Button type="button" variant="outline-danger" onClick={() => this.returnToPosts(true)}>Reset</Button>
                <Button type="button" variant="outline-primary" onClick={() => this.sendPosts()}>Send</Button>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostsReviewGrid));