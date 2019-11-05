import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Button} from "react-bootstrap";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as postsAction from "../actions/PostsAction"
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapDispatchToProps = (dispatch) => {
    return {
        updatePosts: posts => dispatch(postsAction.updatePosts(posts))
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.PostsReducer.posts
    }
};

class PostsGrid extends Component {

    POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
    gridApi;
    gridColumnApi;
    columnDefs = [{
        headerName: "ID", field: "id", sortable: true, width: 100, checkboxSelection: true
    }, {
        headerName: "Title", field: "title", sortable: true, width: 300
    }, {
        headerName: "Body", field: "body", sortable: true, width: 900
    }];

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.columnDefs,
            rowSelection: "multiple",
            disableSubmit: true,
            showToast: false,
            toastId: 'NA'
        };

        this.onGridReady.bind(this);
        this.onRowSelected.bind(this);
        this.reviewPosts.bind(this);
        this.navigateTo.bind(this);
        this.autoSelectRows.bind(this);
    }

    componentDidMount = () => {
        fetch(this.POSTS_URL)
            .then(result => result.json())
            .then(rowData => {
                this.setState({
                    rowData: rowData
                });
                if (this.props.posts.length > 0) {
                    this.autoSelectRows(this.props.posts)
                }
            });
        if (this.props.posts.length > 0) {
            this.setState({
                    showToast: true
                }
            );
            const reLoadedToastId = toast.info(`${this.props.posts.length} post(s) selected to review`);
            this.setState({
                toastId: reLoadedToastId
            })
        }
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        console.log('Grid Ready')
    };

    autoSelectRows = (posts) => {
        /*this.gridApi.forEachNode( (node, index) => {
            posts.forEach(post => {
                console.log(post.id);
                console.log(node.id);
               if(post.id == node.id) {
                   node.selected = true;
                   this.gridApi.get
               }
            })
        });*/
    };

    onRowSelected = () => {
        const selectedRows = this.gridApi.getSelectedRows();
        this.props.updatePosts(selectedRows);
        if (this.state.toastId !== 'NA') {
            toast.dismiss(this.state.toastId);
        }
        const currentToastId = toast.info(`${this.props.posts.length} post(s) selected to review`);
        if (selectedRows.length === 0) {
            toast.dismiss(currentToastId);
            this.setState({
                disableSubmit: selectedRows.length === 0,
                toastId: 'NA'
            });
        } else {
            this.setState({
                disableSubmit: selectedRows.length === 0,
                toastId: currentToastId
            });
        }

    };

    reviewPosts = (event) => {
        event.preventDefault();
        // const selectedRows = this.gridApi.getSelectedRows();
        // this.props.updatePosts(selectedRows);
        this.navigateTo("review");
    };

    navigateTo = (destination) => {
        this.props.history.push(`/${destination}`);
    };

    render = () => {
        return (
            <React.Fragment>
                <h1>Posts</h1>
                <ToastContainer
                    position="top-right"
                    autoClose={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable={false}
                    closeButton={false}
                    onClick={() => this.navigateTo("review")}
                />
                <div style={{height: '700px', width: '100%'}} className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        rowSelection={this.state.rowSelection}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onRowSelected={this.onRowSelected}
                    >
                    </AgGridReact>
                </div>
                <Button type="button" disabled={this.state.disableSubmit} onClick={this.reviewPosts}> Submit </Button>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostsGrid));