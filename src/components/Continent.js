import React, { useEffect, useState, Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_DATA } from '../GraphQL/Queries'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles } from '@material-ui/core'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Country from './Country'

const StyledTableContainer = withStyles((theme) => createStyles({
    root: {
        overflowX: 'auto',
        maxWidth: '40vw',
        marginBottom: theme.spacing(8)
    }
}), { name: "StyledTableContainer" })(TableContainer)

const StyledTableCellHead = withStyles((theme) => createStyles({
    root: {
        color: 'white',
        backgroundColor: 'blue'
    }
}), { name: "StyledTableCellHead" })(TableCell)

const Continent = () => {
    const { loading, data } = useQuery(LOAD_DATA)
    const [continentData, setContinentData] = useState([])
    useEffect(() => {
        if (data) {
            setContinentData(data.continents)
        }
    }, [continentData, data, setContinentData])
    if (!loading) {
        return (
            <Router>
                <Fragment>
                    <h1>Continents</h1>
                    <StyledTableContainer component={ Paper }>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCellHead align="center">Code</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Name</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Num of Countries</StyledTableCellHead>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { continentData.map(continent => (
                                    <TableRow key={ continent.code }>
                                        <TableCell align="center">{ continent.code }</TableCell>
                                        <TableCell align="center"><Link to={ { pathname: continent.code, state: { continentCountries: continent.countries, continentName: continent.name } } }>{ continent.name }</Link></TableCell>
                                        <TableCell align="center">{ continent.countries.length }</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                    <Switch>
                        <Route path="/:countryCode" children={ <Country /> } />
                    </Switch>
                </Fragment >
            </Router>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default Continent
