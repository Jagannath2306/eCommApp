module.exports = {
    components: {
        schemas: {
            GetAllBrandLogos: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "string" },
                    page: { type: "string" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            DeleteBrandLogo: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

