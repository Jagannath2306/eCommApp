module.exports = {
    components: {
        schemas: {
            InsertProductMasterStatus: {
                type: "object",
                required: ['name'],
                properties: {
                    name: { type: "string" }
                }
            },
            UpdateProductMasterStatus: {
                type: "object",
                required: ['id', 'name'],
                properties: {
                    id: { type: "string" },
                    name: { type: "string" }
                }
            },
            GetAllProductMasterStatus: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "number" },
                    page: { type: "number" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            GetProductMasterStatusById: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            },
            DeleteProductMasterStatus: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

