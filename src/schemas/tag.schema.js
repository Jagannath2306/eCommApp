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
                    pageSize: {
                        type: "number",
                        default: 10
                    },
                    page: {
                        type: "number",
                        default: 1
                    },
                    sortCol: {
                        type: "string",
                    },
                    sort: {
                        type: "string",
                        default: "asc",
                    }
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

