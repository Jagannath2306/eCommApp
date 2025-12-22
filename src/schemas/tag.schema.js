module.exports = {
    components: {
        schemas: {
            InsertTag: {
                type: "object",
                required: ['name'],
                properties: {
                    name: { type: "string" }
                }
            },
            UpdateTag: {
                type: "object",
                required: ['id', 'name'],
                properties: {
                    id: { type: "string" },
                    name: { type: "string" }
                }
            },
            GetAllTags: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "string" },
                    page: { type: "string" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            DeleteTag: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

