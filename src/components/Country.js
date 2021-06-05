import React, { Fragment, useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles, Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import styles from 'styled-components'

const StyledTableContainer = withStyles((theme) => createStyles({
    root: {
        margin: theme.spacing(5, 'auto'),
        overflowX: 'auto',
        maxWidth: '80vw'
    }
}), { name: "StyledTableContainer" })(TableContainer)

const StyledTableCellHead = withStyles((theme) => createStyles({
    root: {
        color: 'white',
        backgroundColor: 'black'
    }
}), { name: "StyledTableCellHead" })(TableCell)

const Country = () => {
    const location = useLocation()
    const { continentCountries, continentName } = location.state
    const [displayedRow, setDisplayedRow] = useState(5)
    const [displayLoadMore, setDisplayLoadMore] = useState(true)
    useEffect(() => {
        setDisplayedRow(5)
    }, [continentName])
    const loadMore = () => {
        setDisplayedRow(displayedRow + 5)
        if (continentCountries.length < displayedRow) {
            setDisplayLoadMore(false)
        }
    }
    if (!location.state) {
        // block direct access
        return <Redirect to='/' />
    } else {
        return (
            <div>
                <Fragment>
                    <h1>{ continentName }</h1>
                    <StyledTableContainer component={ Paper }>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCellHead align="center">Code</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Name</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Native</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Capital</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Currency</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Languages</StyledTableCellHead>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { continentCountries.filter((_, index) => index < displayedRow).map(item => (
                                    <TableRow key={ item.code }>
                                        <TableCell align="center">{ item.code }</TableCell>
                                        <TableCell align="center">{ item.name }</TableCell>
                                        <TableCell align="center">{ item.native }</TableCell>
                                        <TableCell align="center">{ item.capital }</TableCell>
                                        <TableCell align="center">{ item.currency }</TableCell>
                                        <TableCell align="center">
                                            {
                                                item.languages.map((language, index) => (<p key={ index }>{ language.name }</p>))
                                            }
                                        </TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                    <ButtonContainer>
                        <Button disabled={ !displayLoadMore } style={ { visibility: !displayLoadMore && 'hidden' } } onClick={ loadMore } variant="contained" color="primary">Load More</Button>
                    </ButtonContainer>
                </Fragment >
            </div>
        )
    }

}

const ButtonContainer = styles.div`
    display: flex;
    justify-content: center; 
    margin-bottom: 2rem;
`


export default Country
