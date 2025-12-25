module.exports = {
    components: {
        schemas: {
            InsertColor: {
                type: "object",
                required: ['name', 'code'],
                properties: {
                    name: { type: "string" },
                    code: { type: "string" }
                }
            },
            UpdateColor: {
                type: "object",
                required: ['id', 'name', 'code'],
                properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    code: { type: "string" }
                }
            },
            GetAllColors: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                   pageSize: { type: "number" },
                    page: { type: "number" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            DeleteColor: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

