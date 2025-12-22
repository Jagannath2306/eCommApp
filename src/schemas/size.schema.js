module.exports = {
    components: {
        schemas: {
            InsertSize: {
                type: "object",
                required: ['name'],
                properties: {
                    name: { type: "string" }
                }
            },
            UpdateSize: {
                type: "object",
                required: ['id', 'name'],
                properties: {
                    id: { type: "string" },
                    name: { type: "string" }
                }
            },
            GetAllSizes: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "string" },
                    page: { type: "string" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            DeleteSize: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

