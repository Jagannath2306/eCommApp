module.exports = {
    components: {
        schemas: {
            InsertPaymentType: {
                type: "object",
                required: ['name'],
                properties: {
                    name: { type: "string" }
                }
            },
            UpdatePaymentType: {
                type: "object",
                required: ['id', 'name'],
                properties: {
                    id: { type: "string" },
                    name: { type: "string" }
                }
            },
            GetAllPaymentTypes: {
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
            GetPaymentTypeById: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            },
            DeletePaymentType: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}

