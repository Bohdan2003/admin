import { api } from "../api";

export const editItemForInfiniteScroll = (name, res) => {
    return api.util.updateQueryData(
        name, 
        undefined, 
        (draftPosts) => {
            let draftPostsClone = {...draftPosts};
            draftPostsClone.results = draftPosts.results.map(item =>{ 
                if(item.id != res.id) {
                    return item
                } else {
                    return res
                }
            })
            return draftPostsClone
        }
    )
}

export const editItem = (name, res) => {
    return api.util.updateQueryData(
        name, 
        undefined, 
        draftPosts => {
            console.log(draftPosts);
            return draftPosts.map(item => { 
                if(item.id != res.id) {
                        return item
                    } else {
                        return res
                    }
                }
            )
        }
    )
}

export const deleteItemForInfiniteScroll = (name, id) => {
    return api.util.updateQueryData(
        name, 
        undefined, 
        (draftPosts) => {
            let draftPostsClone = {...draftPosts};
            draftPostsClone.results = draftPosts.results.filter( item => 
                item.id != id 
            )
            return draftPostsClone
        }
    )
}

export const deleteItem = (name, id) => {
    return api.util.updateQueryData(
        name, 
        undefined, 
        (draftPosts) => draftPosts.filter(item => 
            item.id != id
        )
    )
}

export const addItem = (name, res) => {
    console.log(res);
    return api.util.updateQueryData(
        name, 
        undefined, 
        (draftPosts) => [res, ...draftPosts]
    )
}