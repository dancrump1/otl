import { gql } from "graphql-request";

export const NavQuery = gql`
{
  navigationNodes(level: 1) {
    ... on header_Node {
      id
      title
      nodeUri
      navName
      children {
        nodeUri
        title
        id
        newWindow
        url
      }
    }
    ... on footer_Node {
      id
      title
      level
      nodeUri
      navName
      newWindow
      url
    }
  }
}
`