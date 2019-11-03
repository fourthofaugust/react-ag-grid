import React, {Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import {Button} from "react-bootstrap";

class PostsGrid extends Component {

    POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
    gridApi;
    gridColumnApi;
    columnDefs = [{
        headerName: "ID", field: "id", sortable: true, width: 100, checkboxSelection: true
    }, {
        headerName: "Title", field: "title", sortable: true, width: 300
    }, {
        headerName: "Body", field: "body", sortable: true, width: 'auto'
    }];

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.columnDefs ,
            rowSelection: "multiple",
            disableSubmit: true,
        };

        this.onGridReady.bind(this);
        this.onRowSelected.bind(this);
        this.reviewPosts.bind(this);
    }

    componentDidMount() {
        fetch(this.POSTS_URL)
            .then(result => result.json())
            .then(rowData => {
                this.setState({
                    rowData: rowData
                })
            })
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onRowSelected = () => {
        const selectedRows = this.gridApi.getSelectedRows();
        this.setState({
            disableSubmit: selectedRows.length === 0
        })
    };

    reviewPosts = (event) => {
        event.preventDefault();
        console.log(`Clicked Submit`)
    };

    render() {
        return (
            <React.Fragment>
            <h1>Posts</h1>
                <div style={{ height: '100vh', width: '100%' }} className="ag-theme-balham">
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

export default PostsGrid;