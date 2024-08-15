export const typeDefs = `#graphql
type Games {
id: ID!,
title: String!,
platform:[String!]!
reviews:[Reviews!]

}

type Reviews{
    id:ID!,
    rating:Int!,
    content:String!
    game:Games!
    author:Authors!
    game_id:ID!
}
type Authors{
    id:ID!
    name:String!
    verified:Boolean!
    reviews:[Reviews!]
}

type Query{
    reviews:[Reviews]
    review(id:ID!): Reviews
    games:[Games]
    game(id:ID!):Games
    author(id:ID!):Authors
    authors:[Authors]

}
type Mutation{
    addGame(game: AddGameInput!):Games
    deleteGame(id:ID!):[Games]
    updateGame(id: ID!, edits: EditGameInput!):Games

}

input AddGameInput{
    title: String!,
    platform:[String!]!
}
input EditGameInput{
    title: String,
    platform:[String!]
}


`;
