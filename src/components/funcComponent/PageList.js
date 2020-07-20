/* eslint-disable no-console */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

import {AutoSizer, Column, SortDirection, Table} from "react-virtualized";
const axios = require('axios');
var selectRow

const styles = theme => ({
    table: {
        fontFamily: theme.typography.fontFamily
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box"
    },
    tableRow: {
        cursor: "pointer"
    },
    tableRowHover: {
        "&:hover": {
            backgroundColor: theme.palette.grey[200]
        }
    },
    tableCell: {
        flex: 1
    },
    noClick: {
        cursor: "initial"
    },
    button: {
        position: "absolute",
        right: "0px"
    }
});

class MuiVirtualizedTable extends React.PureComponent {

    getRowClassName = ({index}) => {
        const {classes, rowClassName, onRowClick} = this.props;

        return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null
        });
    };

    cellRenderer = ({
        cellData,
        columnIndex = null
    }) => {
        const {columns, classes, rowHeight, onRowClick} = this.props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                [classes.noClick]: onRowClick == null
            })}
                variant="body"
                style={{
                height: rowHeight
            }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false
                ? "right"
                : "left"}>
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({label, columnIndex, dataKey, sortBy, sortDirection}) => {
        const {headerHeight, columns, classes, sort} = this.props;
        const direction = {
            [SortDirection.ASC]: "asc",
            [SortDirection.DESC]: "desc"
        };

        const inner = !columns[columnIndex].disableSort && sort != null
            ? (
                <TableSortLabel
                    active={dataKey === sortBy}
                    direction={direction[sortDirection]}>
                    {label}
                </TableSortLabel>
            )
            : (label);

        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{
                height: headerHeight
            }}
                align={columns[columnIndex].numeric || false
                ? "right"
                : "left"}>
                {inner}
            </TableCell>
        );
    };


    render() {
        const {
            classes,
            columns,
            ...tableProps
        } = this.props;
        return (
            <AutoSizer>
                {({height, width}) => (
                    <div>
                        <Table
                            className={classes.table}
                            height={height}
                            width={width}
                            {...tableProps}
                            rowClassName={this.getRowClassName}>
                            {columns.map(({
                                cellContentRenderer = null,
                                className,
                                dataKey,
                                ...other
                            }, index) => {
                                let renderer;
                                if (cellContentRenderer != null) {
                                    renderer = cellRendererProps => this.cellRenderer({cellData: cellContentRenderer(cellRendererProps), columnIndex: index});
                                } else {
                                    renderer = this.cellRenderer;
                                }

                                return (<Column
                                    key={dataKey}
                                    headerRenderer={headerProps => this.headerRenderer({
                                    ...headerProps,
                                    columnIndex: index
                                })}
                                    className={classNames(classes.flexContainer, className)}
                                    cellRenderer={renderer}
                                    dataKey={dataKey}
                                    {...other}/>);
                            })}
                        </Table>

                    </div>
                )}

            </AutoSizer>

        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes
        .arrayOf(PropTypes.shape({cellContentRenderer: PropTypes.func, dataKey: PropTypes.string.isRequired, width: PropTypes.number.isRequired}))
        .isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
    headerHeight: 56,
    rowHeight: 56
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);


////////////////////////上面為table的component/////////////////////

class PageList extends React.PureComponent {

    state = {
        rows: []
    };

    componentWillMount() {
        axios({method: 'get', url: 'http://127.0.0.1:8088/v1/listPage'}).then((response) => { //不用箭頭的話會讀不到this.state     //handle success
            var tmpRows = []
            tmpRows.push(...response.data.ResultMessage)
            this.setState({rows: tmpRows})
        })
        .catch(function (response) { //handle error
            console.log(response);
        });
    }

    handleClick(event) {//////////處理選擇哪個頁面
        selectRow = event.rowData.id
    }

    render() {
        return (
            <div>
                <Paper
                    style={{
                    height: 400,
                    width: "100%"
                }}>
                    <WrappedVirtualizedTable
                        handleSelectPage={this.props.handleSelectPage}
                        rowCount={this.state.rows.length}
                        rowGetter={({index}) => this.state.rows[index]}
                        onRowClick={(event) => this.props.handleSelectPage(event.rowData.id)}
                        columns={[
                        {
                            width: 120,
                            label: "Page ID",
                            dataKey: "id"
                        }, {
                            width: 200,
                            flexGrow: 1.0,
                            label: "Page Name",
                            dataKey: "name"
                        }, {
                            width: 200,
                            flexGrow: 1.0,
                            label: "Page Describe",
                            dataKey: "describe"
                        }
                    ]}/>
                </Paper>

            </div>

        );
    }
}

export default withStyles(styles)(PageList);
