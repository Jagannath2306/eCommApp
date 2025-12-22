module.exports = {
    components: {
        schemas: {
            InsertUserType: {
                type: "object",
                required: ['name'],
                properties: {
                    name: { type: "string" }
                }
            },
            UpdateUserType: {
                type: "object",
                required: ['id', 'name'],
                properties: {
                    id: { type: "string" },
                    name: { type: "string" }
                }
            },
            GetAllUserType: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "string" },
                    page: { type: "string" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            DeleteUserType : {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

