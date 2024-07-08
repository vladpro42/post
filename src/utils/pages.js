const getPageCount = (totalCount, limitPage) => {
    return Math.ceil(totalCount / limitPage)
}

export { getPageCount }