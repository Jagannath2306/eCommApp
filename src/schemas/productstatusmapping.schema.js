module.exports = {
    components: {
        schemas: {
            InsertProductStatusMapping: {
                type: "object",
                required: ['productId', 'statusId'],
                properties: {
                    productId: { type: "string" },
                    statusId: { type: "string" }
                }
            },
            UpdateProductStatusMapping: {
                type: "object",
                required: ['id', 'productId', 'statusId'],
                properties: {
                    id: { type: "string" },
                    productId: { type: "string" },
                    statusId: { type: "string" }
                }
            },
            GetAllProductStatusMapping: {
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
            GetProductStatusMappingById: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            },
            DeleteProductStatusMapping: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

