export const getFetchHeader = (method = 'GET', body) => {
    if(body)
        body = JSON.stringify(body)
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body
    }
}