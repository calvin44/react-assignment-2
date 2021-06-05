import { gql } from '@apollo/client'

export const LOAD_DATA = gql`
    query{
        continents {
        code
        name
        countries {
            code
            name
            native
            capital
            currency
            languages {
                name
            }
        }
        }
    }   
`