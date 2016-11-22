/**
 * Created by zhou on 10/23/16.
 */
import Action, { resource } from '../../actions'

// logic for fetching articles from the dummy server
export function fetchArticles() {
    return (dispatch, getState) => {
        resource('GET', 'articles')
        .then((response) => {
            const articles = response.articles.reduce((o,v) => {
                o[v._id] = v
                return o
            }, {})
            dispatch({ type: Action.UPDATE_ARTICLES, articles})

            const avatars = getState().articles.avatars
            const authors = new Set(response.articles.reduce((o, article) => {
                article.comments.map((c) => c.author).forEach((author) => o.push(author))
                return o
            }, []).filter((author) => !avatars[author]))
            if (authors.size > 0) {
                resource('GET', `avatars/${[...authors].join(',')}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        avatars[s.username] = s.avatar
                    })
                    dispatch({ type: Action.UPDATE_AVATARS, avatars })
                })
            }
        })
    }
}


/*Note that our POST /article endpoint will only be accepting text at the current moment. 
I.e., no picture uploads. Therefore the frontend application needs to be modified to not send formData.
For example, if we already had a method addArticle then we would rename it addArticleWithImage and make a new addArticle.
This way we can easily switch back to the formData upload for the final assignment when image uploading is 
enabled on the backend.*/
// export function uploadArticle(message, file) {
//     return (dispatch) => {
//         const fd = new window.FormData()
//         fd.append('text', message)
//         fd.append('image', file)
//         resource('POST', 'article', fd, false)
//         .then((response) => {
//             const article = response.articles[0]
//             dispatch({ type: Action.ADD_ARTICLE, article})
//         })
//     }
// }
export function uploadArticle(message, file) {
    return (dispatch) => {
        const payload = {text:message}
        console.log("[uploadArticle] payload: " + payload)
        resource('POST', 'article', payload)
        .then((response) => {
            const article = response.articles[0]
            dispatch({ type: Action.ADD_ARTICLE, article})
        })
    }
}

export function editArticle(articleId, message, commentId) {
    return (dispatch) => {
        const payload = { text: message }
        if (commentId) payload.commentId = commentId
        resource('PUT', `articles/${articleId}`, payload)
        .then((response) => {
            const article = response.articles[0]
            dispatch({ type: Action.EDIT_ARTICLE, article })
        })
    }
}

export function searchKeyword(keyword) {
    return { type: Action.SEARCH_KEYWORD, keyword }
}
