export type LinkType = {
    description:string
    id:string
    postedBy:PostedByType
    votes:VoteType[]
    __typename:string
    url:string
}

export type PostedByType = {
    id:string
    name:string
    __typename:string
}
export type VoteType = {
    id:string
    user:UserType
    __typename:string
}

export type  UserType = {
    id:string
    name:string
}

export enum Sort {
    asc,
    desc
}

export type LinkOrderByInput = {
    description: Sort
    url: Sort
    createdAt: Sort
}

export type ParamsType ={
    filter:string,
    take: number,
    skip: number,
    orderBy:{
        description: string,
    }
}